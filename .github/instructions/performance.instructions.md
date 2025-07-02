---
description: 성능 최적화 및 모범 사례를 위한 지침
applyTo: '**/*.{ts,tsx}'
---

# Performance Optimization Instructions

## React Performance Patterns

### Memoization Strategy

```typescript
// Component memoization with custom comparison
export const StockListItem = memo(({ stock, onEdit, onDelete }: Props) => {
  return (
    <div className="stock-item">
      {/* Component content */}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.stock.id === nextProps.stock.id &&
    prevProps.stock.updatedAt === nextProps.stock.updatedAt
  );
});

// Expensive calculations memoization
const portfolioSummary = useMemo(() => {
  return calculatePortfolioSummary(stocks);
}, [stocks]);

// Callback memoization
const handleStockEdit = useCallback((stock: Stock) => {
  setEditingStock(stock);
  setShowEditModal(true);
}, []);
```

### State Updates Optimization

```typescript
// Batch state updates
const handleBulkStockUpdate = useCallback((updates: StockUpdate[]) => {
  setStocks((prevStocks) => {
    const updatedStocks = [...prevStocks];
    updates.forEach((update) => {
      const index = updatedStocks.findIndex((s) => s.id === update.id);
      if (index !== -1) {
        updatedStocks[index] = { ...updatedStocks[index], ...update.changes };
      }
    });
    return updatedStocks;
  });
}, []);

// Avoid object recreation in render
const stockListConfig = useMemo(
  () => ({
    sortBy: 'name',
    sortDirection: 'asc',
    pageSize: 20,
  }),
  [],
);
```

### Conditional Rendering Optimization

```typescript
// Early returns for loading/error states
if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage message={error} />;
}

if (stocks.length === 0) {
  return <EmptyState />;
}

// Conditional rendering with logical operators
return (
  <div>
    {hasData && <DataComponent data={data} />}
    {showChart && stocks.length > 0 && <PortfolioChart stocks={stocks} />}
  </div>
);
```

## Bundle Size Optimization

### Tree Shaking

```typescript
// ✅ Good: Named imports for tree shaking
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import { format } from 'date-fns';

// ❌ Bad: Full library imports
import * as LucideIcons from 'lucide-react';
import _ from 'lodash';

// ✅ Good: Specific lodash functions
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
```

### Code Splitting

```typescript
// Route-based code splitting
const HomePage = lazy(() => import('~/routes/home'));
const PortfolioPage = lazy(() => import('~/routes/portfolio'));

// Component-based code splitting
const PortfolioChart = lazy(
  () => import('~/components/portfolio/PortfolioChart'),
);
const StockForm = lazy(() => import('~/components/portfolio/StockForm'));

// Dynamic imports for features
const handleExportData = async () => {
  const { exportToCSV } = await import('~/utils/export');
  exportToCSV(portfolioData);
};
```

### Bundle Analysis

```typescript
// Vite bundle analyzer configuration
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@headlessui/react', 'lucide-react'],
          router: ['react-router'],
        },
      },
    },
  },
});
```

## Rendering Performance

### List Virtualization

```typescript
// Use react-window for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedStockList = ({ stocks }: Props) => {
  const Row = useCallback(({ index, style }: any) => (
    <div style={style}>
      <StockListItem stock={stocks[index]} />
    </div>
  ), [stocks]);

  return (
    <List
      height={400}
      itemCount={stocks.length}
      itemSize={80}
      itemData={stocks}
    >
      {Row}
    </List>
  );
};
```

### Image Optimization

```typescript
// Lazy loading images
const StockLogo = ({ symbol }: { symbol: string }) => {
  return (
    <img
      src={`/logos/${symbol}.png`}
      alt={`${symbol} logo`}
      loading="lazy"
      width={32}
      height={32}
      className="rounded"
    />
  );
};

// Responsive images
const ChartImage = ({ data }: Props) => {
  return (
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet="/charts/large.webp"
        type="image/webp"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/charts/medium.webp"
        type="image/webp"
      />
      <img
        src="/charts/small.jpg"
        alt="Portfolio chart"
        loading="lazy"
      />
    </picture>
  );
};
```

## Memory Management

### Cleanup Patterns

```typescript
// Effect cleanup
useEffect(() => {
  const controller = new AbortController();

  fetchData(controller.signal).then(setData);

  return () => {
    controller.abort();
  };
}, []);

// Timer cleanup
useEffect(() => {
  const interval = setInterval(updateChartData, 5000);

  return () => {
    clearInterval(interval);
  };
}, [updateChartData]);

// Event listener cleanup
useEffect(() => {
  const handleResize = debounce(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, 250);

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    handleResize.cancel();
  };
}, []);
```

### WeakMap Usage

```typescript
// Use WeakMap for component instances
const componentInstances = new WeakMap();

const useComponentInstance = (component: React.ComponentType) => {
  if (!componentInstances.has(component)) {
    componentInstances.set(component, new component());
  }
  return componentInstances.get(component);
};
```

## Data Processing Optimization

### Debouncing and Throttling

```typescript
// Search input debouncing
const useDebounceSearch = (searchTerm: string, delay: number) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return debouncedTerm;
};

// Scroll event throttling
const useThrottledScroll = (callback: () => void, delay: number) => {
  const throttledCallback = useCallback(throttle(callback, delay), [
    callback,
    delay,
  ]);

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
};
```

### Efficient Data Structures

```typescript
// Use Map for O(1) lookups
const stocksMap = useMemo(() => {
  return new Map(stocks.map((stock) => [stock.id, stock]));
}, [stocks]);

// Indexed data for fast filtering
const stocksBySymbol = useMemo(() => {
  return stocks.reduce(
    (acc, stock) => {
      acc[stock.symbol] = stock;
      return acc;
    },
    {} as Record<string, Stock>,
  );
}, [stocks]);

// Memoized calculations
const portfolioMetrics = useMemo(() => {
  const totalValue = stocks.reduce((sum, stock) => sum + stock.totalValue, 0);
  const totalShares = stocks.reduce((sum, stock) => sum + stock.shares, 0);

  return {
    totalValue,
    totalShares,
    averagePrice: totalValue / totalShares,
    stockCount: stocks.length,
  };
}, [stocks]);
```

## LocalStorage Performance

### Batched Storage Operations

```typescript
// Batch multiple storage operations
const useBatchedLocalStorage = () => {
  const [pendingUpdates, setPendingUpdates] = useState<Record<string, any>>({});

  const batchUpdate = useCallback((key: string, value: any) => {
    setPendingUpdates((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const flushUpdates = useCallback(() => {
    Object.entries(pendingUpdates).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    setPendingUpdates({});
  }, [pendingUpdates]);

  // Auto-flush after delay
  useEffect(() => {
    if (Object.keys(pendingUpdates).length > 0) {
      const timer = setTimeout(flushUpdates, 500);
      return () => clearTimeout(timer);
    }
  }, [pendingUpdates, flushUpdates]);

  return { batchUpdate, flushUpdates };
};
```

### Storage Compression

```typescript
// Compress large data before storage
const compressData = (data: any): string => {
  // Simple compression for demo - use proper compression in production
  return JSON.stringify(data).replace(/"/g, '');
};

const decompressData = (compressed: string): any => {
  // Decompress data
  return JSON.parse(compressed.replace(/([{,])(\w+):/g, '$1"$2":'));
};

const setCompressedItem = (key: string, data: any) => {
  const compressed = compressData(data);
  localStorage.setItem(key, compressed);
};
```

## Chart Performance

### Recharts Optimization

```typescript
// Memoized chart data
const chartData = useMemo(() => {
  return stocks.map(stock => ({
    name: stock.name,
    value: stock.totalValue,
    percentage: (stock.totalValue / totalValue) * 100,
    fill: stock.color,
  }));
}, [stocks, totalValue]);

// Optimized chart component
const PortfolioChart = memo(({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          animationBegin={0}
          animationDuration={800}
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
});
```

## Performance Monitoring

### Custom Performance Hooks

```typescript
const usePerformanceMonitor = (name: string) => {
  useEffect(() => {
    const start = performance.now();

    return () => {
      const end = performance.now();
      const duration = end - start;

      if (duration > 16) {
        // Log slow renders (>16ms)
        console.warn(
          `Slow render detected in ${name}: ${duration.toFixed(2)}ms`,
        );
      }
    };
  });
};

// Usage in components
const StockList = (props: Props) => {
  usePerformanceMonitor('StockList');
  // Component logic
};
```

### Bundle Size Monitoring

```typescript
// Track bundle size in development
if (process.env.NODE_ENV === 'development') {
  import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
    console.log('Bundle analyzer available');
  });
}

// Performance budget alerts
const PERFORMANCE_BUDGET = {
  maxBundleSize: 500 * 1024, // 500KB
  maxRenderTime: 16, // 16ms
  maxMemoryUsage: 50 * 1024 * 1024, // 50MB
};
```

Remember: Profile first, optimize second. Use browser dev tools to identify actual performance bottlenecks before applying optimizations.
