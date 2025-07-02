# Stock Portfolio Debugging & Troubleshooting

Comprehensive debugging strategies and troubleshooting solutions for the Stock Portfolio Manager application.

## Context

This is a React 19 + TypeScript application with localStorage-based state management. Debugging should cover runtime errors, performance issues, data corruption, and user experience problems.

## Debugging Categories

### 🐛 Runtime Error Analysis

#### React Component Errors

```typescript
// Error boundary implementation
class StockPortfolioErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
    // Send to error tracking service in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-50 mb-4">
              Something went wrong
            </h1>
            <p className="text-slate-400 mb-6">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### Hook Dependency Issues

- Analyze useEffect dependency arrays for missing dependencies
- Check for stale closures in event handlers
- Identify infinite re-render loops
- Debug custom hook state updates

#### TypeScript Runtime Errors

- Runtime type validation failures
- JSON parsing errors from localStorage
- API response type mismatches (if applicable)
- Prop type violations in components

### 💾 Data Persistence Issues

#### localStorage Problems

```typescript
// Debugging localStorage operations
const debugLocalStorage = () => {
  const storageInfo = {
    quota: navigator?.storage?.estimate
      ? await navigator.storage.estimate()
      : null,
    available: localStorage.length,
    keys: Object.keys(localStorage),
    totalSize: JSON.stringify(localStorage).length,
  };

  console.table(storageInfo);

  // Test storage availability
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    console.log('✅ localStorage is working');
  } catch (error) {
    console.error('❌ localStorage is not available:', error);
  }
};
```

#### Data Corruption Detection

```typescript
// Validate portfolio data integrity
const validatePortfolioData = (data: unknown): data is Portfolio => {
  if (!data || typeof data !== 'object') return false;

  const portfolio = data as Portfolio;

  // Check required fields
  if (!portfolio.id || !portfolio.name || !Array.isArray(portfolio.stocks)) {
    console.error('Portfolio missing required fields:', portfolio);
    return false;
  }

  // Validate each stock
  const invalidStocks = portfolio.stocks.filter(
    (stock) =>
      !stock.id || !stock.symbol || stock.shares <= 0 || stock.avgPrice <= 0,
  );

  if (invalidStocks.length > 0) {
    console.error('Invalid stocks found:', invalidStocks);
    return false;
  }

  return true;
};
```

### 🎨 UI/UX Debugging

#### Responsive Design Issues

```typescript
// Debug responsive breakpoints
const useBreakpointDebugger = () => {
  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint('mobile');
      else if (width < 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Development only breakpoint indicator
  return process.env.NODE_ENV === 'development' ? (
    <div className="fixed top-0 right-0 z-50 bg-red-500 text-white px-2 py-1 text-xs">
      {breakpoint} ({window.innerWidth}px)
    </div>
  ) : null;
};
```

#### Dark Theme Inconsistencies

- Check for light theme class leakage
- Verify TailwindCSS dark: variant usage
- Debug CSS specificity conflicts
- Validate color contrast ratios

#### Performance Profiling

```typescript
// Component render performance tracking
const useRenderProfiler = (componentName: string) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    lastRenderTime.current = now;

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${componentName} render #${renderCount.current} (+${timeSinceLastRender}ms)`,
      );
    }
  });

  return { renderCount: renderCount.current };
};
```

## Debugging Tools & Techniques

### React Developer Tools

- Component props and state inspection
- Profiler for performance analysis
- Hook debugging and state tracing
- Component tree visualization

### Browser DevTools

- Network tab for asset loading
- Application tab for localStorage inspection
- Console for error logging and debugging
- Performance tab for runtime analysis

### Custom Debug Utilities

```typescript
// Debug logger with categories
const logger = {
  portfolio: (message: string, data?: any) =>
    console.log(`🏦 [Portfolio] ${message}`, data),

  storage: (message: string, data?: any) =>
    console.log(`💾 [Storage] ${message}`, data),

  performance: (message: string, data?: any) =>
    console.log(`⚡ [Performance] ${message}`, data),

  ui: (message: string, data?: any) => console.log(`🎨 [UI] ${message}`, data),
};
```

## Common Issues & Solutions

### Issue: Stock Data Not Persisting

**Symptoms**: Changes to stocks are lost on page refresh
**Debug Steps**:

1. Check localStorage in DevTools Application tab
2. Verify data is being serialized correctly
3. Check for storage quota exceeded errors
4. Validate JSON.stringify/parse operations

**Solution Example**:

```typescript
const debugStorageOperation = async (operation: string, data: any) => {
  try {
    logger.storage(`Attempting ${operation}`, data);

    if (operation === 'save') {
      const serialized = JSON.stringify(data);
      logger.storage(`Serialized size: ${serialized.length} bytes`);
      localStorage.setItem('portfolio', serialized);
      logger.storage('✅ Save successful');
    }
  } catch (error) {
    logger.storage(`❌ ${operation} failed:`, error);
    throw error;
  }
};
```

### Issue: Component Not Re-rendering

**Symptoms**: UI doesn't update after state changes
**Debug Steps**:

1. Check if state is being mutated directly
2. Verify useState/useReducer usage
3. Check React.memo dependencies
4. Analyze useEffect dependency arrays

**Solution Example**:

```typescript
// Debug state updates
const useDebugState = <T>(initialState: T, name: string) => {
  const [state, setState] = useState(initialState);

  const debugSetState = useCallback(
    (newState: T | ((prev: T) => T)) => {
      logger.ui(`State update for ${name}:`, { from: state, to: newState });
      setState(newState);
    },
    [state, name],
  );

  return [state, debugSetState] as const;
};
```

### Issue: Performance Degradation

**Symptoms**: Slow rendering, laggy interactions
**Debug Steps**:

1. Use React Profiler to identify slow components
2. Check for unnecessary re-renders
3. Analyze bundle size and loading performance
4. Monitor memory usage for leaks

**Solution Example**:

```typescript
// Performance monitoring hook
const usePerformanceMonitor = () => {
  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 16) {
            // >16ms = potential frame drop
            logger.performance(`Slow operation detected:`, entry);
          }
        }
      });

      observer.observe({ entryTypes: ['measure', 'navigation'] });
      return () => observer.disconnect();
    }
  }, []);
};
```

## Production Debugging

### Error Tracking Setup

```typescript
// Production error handler
const setupErrorTracking = () => {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Send to error tracking service
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Send to error tracking service
  });
};
```

### User Feedback Integration

```typescript
// Debug info for user reports
const generateDebugReport = () => {
  return {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    portfolioData: localStorage.getItem('portfolio') ? 'present' : 'missing',
    storageQuota: navigator?.storage?.estimate ? 'supported' : 'not supported',
    reactVersion: React.version,
    errors: [], // Collect from error boundary
  };
};
```

## Debugging Checklist

### Before Debugging

- [ ] Reproduce the issue consistently
- [ ] Check browser console for errors
- [ ] Verify environment (dev/prod)
- [ ] Check data integrity in localStorage
- [ ] Review recent code changes

### During Debugging

- [ ] Add strategic console.log statements
- [ ] Use React DevTools profiler
- [ ] Monitor network activity
- [ ] Check component re-render patterns
- [ ] Validate data flow through hooks

### After Fixing

- [ ] Add tests to prevent regression
- [ ] Document the issue and solution
- [ ] Update error handling if needed
- [ ] Consider preventive measures
- [ ] Clean up debug code

Generate specific debugging strategies and solutions for the identified issue, including code examples, logging strategies, and preventive measures.
