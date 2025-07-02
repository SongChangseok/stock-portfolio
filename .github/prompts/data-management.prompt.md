# Stock Portfolio Data Flow & State Management

Design and implement efficient data flow patterns and state management solutions for the Stock Portfolio Manager application.

## Context

This is a React 19 + TypeScript application using localStorage for persistence. Data management should be efficient, type-safe, and maintainable with clear separation of concerns.

## Data Architecture Requirements

### 1. Data Models & Types

```typescript
// Core domain types
interface Stock {
  id: string; // UUID v4
  symbol: string; // Uppercase ticker symbol
  name: string; // Company name
  shares: number; // Number of shares owned
  avgPrice: number; // Average purchase price
  totalValue: number; // Calculated: shares * avgPrice
  color: string; // Hex color for charts
  createdAt: Date;
  updatedAt: Date;
}

interface Portfolio {
  id: string;
  name: string;
  stocks: Stock[];
  totalValue: number; // Calculated from all stocks
  createdAt: Date;
  updatedAt: Date;
}

interface PortfolioSummary {
  totalValue: number;
  totalStocks: number;
  topPerformer: Stock | null;
  allocation: { symbol: string; percentage: number; value: number }[];
}
```

### 2. State Management Pattern

Create a comprehensive state management solution using React hooks and Context API:

```typescript
// Portfolio context with actions
interface PortfolioContextValue {
  // State
  portfolio: Portfolio | null;
  loading: boolean;
  error: string | null;

  // Actions
  addStock: (
    stock: Omit<Stock, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<void>;
  updateStock: (id: string, updates: Partial<Stock>) => Promise<void>;
  deleteStock: (id: string) => Promise<void>;
  loadPortfolio: () => Promise<void>;
  resetPortfolio: () => Promise<void>;

  // Computed values
  summary: PortfolioSummary;
  chartData: ChartDataPoint[];
}
```

### 3. Data Persistence Layer

Implement a robust localStorage abstraction with error handling:

```typescript
// Storage utilities with type safety
interface StorageAdapter<T> {
  load(): Promise<T | null>;
  save(data: T): Promise<void>;
  clear(): Promise<void>;
  exists(): boolean;
}

class PortfolioStorage implements StorageAdapter<Portfolio> {
  // Implementation with compression, validation, error handling
}
```

## Implementation Requirements

### Custom Hooks Architecture

1. **usePortfolio** - Main portfolio state management
2. **useStockValidation** - Input validation and business rules
3. **usePortfolioCalculations** - Computed values and summaries
4. **useLocalStorage** - Generic localStorage operations
5. **useAsyncOperation** - Loading states and error handling

### Data Flow Patterns

- Implement optimistic updates for better UX
- Use proper error recovery mechanisms
- Apply data normalization for complex state
- Implement proper loading and error states

### Performance Optimizations

- Memoize expensive calculations
- Debounce localStorage writes
- Implement data caching strategies
- Use proper dependency arrays in hooks

## Technical Specifications

### Error Handling Strategy

```typescript
// Centralized error handling
interface PortfolioError {
  code: 'STORAGE_FULL' | 'INVALID_DATA' | 'NETWORK_ERROR' | 'VALIDATION_ERROR';
  message: string;
  details?: Record<string, unknown>;
}

const useErrorHandler = () => {
  const handleError = useCallback((error: PortfolioError) => {
    // Log error, show user notification, trigger recovery
  }, []);

  return { handleError };
};
```

### Validation Layer

```typescript
// Schema validation for data integrity
const StockSchema = z.object({
  symbol: z
    .string()
    .min(1)
    .max(10)
    .regex(/^[A-Z]+$/),
  name: z.string().min(1).max(100),
  shares: z.number().positive().finite(),
  avgPrice: z.number().positive().finite(),
});

const useStockValidation = () => {
  const validateStock = useCallback((stock: Partial<Stock>) => {
    return StockSchema.safeParse(stock);
  }, []);

  return { validateStock };
};
```

### Computed Values

```typescript
// Efficient calculation patterns
const usePortfolioCalculations = (stocks: Stock[]) => {
  const totalValue = useMemo(
    () => stocks.reduce((sum, stock) => sum + stock.totalValue, 0),
    [stocks],
  );

  const allocation = useMemo(
    () =>
      stocks.map((stock) => ({
        symbol: stock.symbol,
        percentage: (stock.totalValue / totalValue) * 100,
        value: stock.totalValue,
      })),
    [stocks, totalValue],
  );

  const topPerformer = useMemo(
    () =>
      stocks.reduce(
        (top, stock) =>
          stock.totalValue > (top?.totalValue ?? 0) ? stock : top,
        null as Stock | null,
      ),
    [stocks],
  );

  return { totalValue, allocation, topPerformer };
};
```

## Data Synchronization

### localStorage Integration

- Implement atomic operations for data consistency
- Handle storage quota exceeded scenarios
- Provide data migration for schema changes
- Include data backup and restore functionality

### Optimistic Updates Pattern

```typescript
const useOptimisticUpdates = () => {
  const [optimisticStocks, setOptimisticStocks] = useState<Stock[]>([]);

  const updateStockOptimistically = useCallback(
    async (id: string, updates: Partial<Stock>) => {
      // Apply optimistic update
      setOptimisticStocks((prev) =>
        prev.map((stock) =>
          stock.id === id ? { ...stock, ...updates } : stock,
        ),
      );

      try {
        // Persist to storage
        await persistStockUpdate(id, updates);
      } catch (error) {
        // Revert optimistic update
        setOptimisticStocks((prev) => prev.filter((s) => s.id !== id));
        throw error;
      }
    },
    [],
  );

  return { optimisticStocks, updateStockOptimistically };
};
```

## Testing Strategy

### Data Layer Testing

- Unit tests for all custom hooks
- Integration tests for data flow
- Property-based testing for calculations
- Error scenario testing

### Mock Data Generation

```typescript
// Test utilities for consistent mock data
const createMockStock = (overrides?: Partial<Stock>): Stock => ({
  id: crypto.randomUUID(),
  symbol: 'AAPL',
  name: 'Apple Inc.',
  shares: 100,
  avgPrice: 150.0,
  totalValue: 15000.0,
  color: '#3B82F6',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const createMockPortfolio = (stockCount = 3): Portfolio => ({
  id: crypto.randomUUID(),
  name: 'Test Portfolio',
  stocks: Array.from({ length: stockCount }, () => createMockStock()),
  totalValue: 0, // Will be calculated
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

## Migration & Versioning

### Schema Evolution

- Implement data schema versioning
- Provide migration utilities for data updates
- Handle backward compatibility gracefully
- Include rollback mechanisms for failed migrations

### Data Import/Export

```typescript
// Portfolio data portability
interface PortfolioExport {
  version: string;
  exportedAt: Date;
  portfolio: Portfolio;
  metadata: {
    appVersion: string;
    userAgent: string;
  };
}

const useDataPortability = () => {
  const exportPortfolio = useCallback(async (): Promise<string> => {
    // Export portfolio data as JSON
  }, []);

  const importPortfolio = useCallback(async (data: string): Promise<void> => {
    // Import and validate portfolio data
  }, []);

  return { exportPortfolio, importPortfolio };
};
```

Generate a complete, production-ready data management system that handles all aspects of portfolio data from creation to persistence with proper error handling and type safety.
