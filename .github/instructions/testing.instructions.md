---
description: 테스트 작성을 위한 지침 및 패턴
applyTo: '**/*.test.{ts,tsx}'
---

# Testing Best Practices Instructions

## Testing Philosophy

- Test behavior, not implementation details
- Focus on user interactions and outcomes
- Write tests that give confidence in code changes
- Prefer integration tests over unit tests when possible

## React Testing Library Patterns

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StockForm } from '../StockForm';

// Test component behavior
describe('StockForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit valid form data', async () => {
    const user = userEvent.setup();
    render(<StockForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Use semantic queries
    await user.type(screen.getByLabelText(/stock symbol/i), 'AAPL');
    await user.type(screen.getByLabelText(/company name/i), 'Apple Inc.');
    await user.type(screen.getByLabelText(/shares/i), '10');
    await user.type(screen.getByLabelText(/average price/i), '150');

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: '10',
        avgPrice: '150',
      });
    });
  });
});
```

## Hook Testing Patterns

```typescript
import { renderHook, act } from '@testing-library/react';
import { usePortfolio } from '../usePortfolio';

describe('usePortfolio', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add stock correctly', () => {
    const { result } = renderHook(() => usePortfolio());

    act(() => {
      result.current.addStock({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 10,
        avgPrice: 150,
        totalValue: 1500,
        color: '#3B82F6',
      });
    });

    expect(result.current.stocks).toHaveLength(1);
    expect(result.current.stocks[0].symbol).toBe('AAPL');
  });

  it('should persist data to localStorage', () => {
    const { result } = renderHook(() => usePortfolio());

    act(() => {
      result.current.addStock({
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 10,
        avgPrice: 150,
        totalValue: 1500,
        color: '#3B82F6',
      });
    });

    const storedData = JSON.parse(localStorage.getItem('stocks') || '[]');
    expect(storedData).toHaveLength(1);
  });
});
```

## Mock Patterns

```typescript
// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock custom hooks
jest.mock('../hooks/usePortfolio', () => ({
  usePortfolio: jest.fn(() => ({
    stocks: [],
    addStock: jest.fn(),
    updateStock: jest.fn(),
    deleteStock: jest.fn(),
    isLoading: false,
    error: null,
  })),
}));
```

## Test Utilities

```typescript
// Custom render function with providers
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## Integration Test Patterns

```typescript
// Full user workflow test
describe('Portfolio Management Integration', () => {
  it('should complete full CRUD workflow', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initial empty state
    expect(screen.getByText(/no stocks yet/i)).toBeInTheDocument();

    // Add stock
    await user.click(screen.getByRole('button', { name: /add stock/i }));
    await user.type(screen.getByLabelText(/symbol/i), 'AAPL');
    await user.type(screen.getByLabelText(/name/i), 'Apple Inc.');
    await user.type(screen.getByLabelText(/shares/i), '10');
    await user.type(screen.getByLabelText(/price/i), '150');
    await user.click(screen.getByRole('button', { name: /save/i }));

    // Verify stock appears
    await waitFor(() => {
      expect(screen.getByText('AAPL')).toBeInTheDocument();
    });

    // Test chart rendering
    expect(screen.getByRole('img', { name: /portfolio chart/i })).toBeInTheDocument();

    // Edit stock
    await user.click(screen.getByLabelText(/edit/i));
    await user.clear(screen.getByLabelText(/shares/i));
    await user.type(screen.getByLabelText(/shares/i), '20');
    await user.click(screen.getByRole('button', { name: /save/i }));

    // Verify changes
    await waitFor(() => {
      expect(screen.getByText('20')).toBeInTheDocument();
    });

    // Delete stock
    await user.click(screen.getByLabelText(/delete/i));
    await user.click(screen.getByRole('button', { name: /confirm/i }));

    // Verify deletion
    await waitFor(() => {
      expect(screen.getByText(/no stocks yet/i)).toBeInTheDocument();
    });
  });
});
```

## Error Testing

```typescript
describe('Error Handling', () => {
  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw error
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
    mockSetItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const { result } = renderHook(() => usePortfolio());

    act(() => {
      result.current.addStock(mockStock);
    });

    expect(result.current.error).toContain('Storage quota exceeded');

    mockSetItem.mockRestore();
  });

  it('should show validation errors', async () => {
    const user = userEvent.setup();
    render(<StockForm onSubmit={jest.fn()} onCancel={jest.fn()} />);

    // Submit empty form
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/symbol is required/i)).toBeInTheDocument();
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });
});
```

## Performance Testing

```typescript
import { renderHook } from '@testing-library/react';
import { performance } from 'perf_hooks';

describe('Performance', () => {
  it('should calculate portfolio summary efficiently', () => {
    const largeStockArray = Array.from({ length: 1000 }, (_, i) => ({
      id: `stock-${i}`,
      symbol: `SYM${i}`,
      name: `Company ${i}`,
      shares: 10,
      avgPrice: 100,
      totalValue: 1000,
      color: '#3B82F6',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const { result } = renderHook(() => usePortfolio());

    const start = performance.now();

    act(() => {
      result.current.calculateSummary(largeStockArray);
    });

    const end = performance.now();

    // Should complete in under 100ms
    expect(end - start).toBeLessThan(100);
  });
});
```

## Test Data Factories

```typescript
// Test data helpers
export const createMockStock = (overrides: Partial<Stock> = {}): Stock => ({
  id: 'test-id',
  symbol: 'AAPL',
  name: 'Apple Inc.',
  shares: 10,
  avgPrice: 150,
  totalValue: 1500,
  color: '#3B82F6',
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
  ...overrides,
});

export const createMockStocks = (count: number): Stock[] =>
  Array.from({ length: count }, (_, i) =>
    createMockStock({
      id: `stock-${i}`,
      symbol: `SYM${i}`,
      name: `Company ${i}`,
    }),
  );
```

## Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<StockForm onSubmit={jest.fn()} onCancel={jest.fn()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Visual Regression Testing (Optional)

```typescript
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('Visual Regression', () => {
  it('should match portfolio chart snapshot', () => {
    render(<PortfolioChart data={mockChartData} />);

    const chartElement = screen.getByRole('img', { name: /portfolio chart/i });
    expect(chartElement).toMatchImageSnapshot();
  });
});
```

## Test Organization

- Group related tests in describe blocks
- Use descriptive test names that explain the expected behavior
- Follow AAA pattern: Arrange, Act, Assert
- Clean up after each test (clear localStorage, reset mocks)
- Use beforeEach/afterEach for common setup/teardown
