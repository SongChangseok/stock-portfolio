# Stock Portfolio Performance Optimization

Analyze and optimize React components and hooks for better performance in the Stock Portfolio Manager application.

## Context

This is a React 19 + TypeScript application with localStorage-based state management. The app handles stock portfolio data visualization and CRUD operations with a focus on smooth user experience.

## Analysis Focus Areas

### 1. Component Rendering Optimization

- Identify unnecessary re-renders using React DevTools
- Apply React.memo strategically to prevent cascade re-renders
- Optimize component prop drilling and state structure
- Review component composition patterns

### 2. Hook Performance

- Analyze custom hooks for expensive operations
- Implement proper useMemo/useCallback patterns
- Optimize localStorage read/write operations
- Review state update patterns for efficiency

### 3. Data Processing

- Optimize portfolio calculations and aggregations
- Implement efficient data transformation pipelines
- Review array operations for large datasets
- Optimize chart data preparation for Recharts

### 4. Bundle Size Analysis

- Identify heavy dependencies and alternatives
- Implement proper code splitting strategies
- Optimize import patterns for tree-shaking
- Review TailwindCSS purging configuration

## Optimization Strategies

### Component Memoization

```typescript
// Apply strategic memoization
const ExpensiveComponent = React.memo<Props>(({ data, onUpdate }) => {
  const processedData = useMemo(() =>
    expensiveCalculation(data), [data]
  );

  const handleUpdate = useCallback((newData) => {
    onUpdate(newData);
  }, [onUpdate]);

  return <div>{/* component JSX */}</div>;
});
```

### State Optimization

- Use state normalization for complex data structures
- Implement proper state slicing to minimize updates
- Apply optimistic updates for better UX
- Use state reducers for complex state logic

### localStorage Performance

- Implement debounced writes to localStorage
- Use compression for large data sets
- Implement proper error boundaries for storage failures
- Cache frequently accessed data in memory

## Performance Measurement

### Metrics to Track

- Component render count and duration
- localStorage operation timing
- Bundle size and load time
- User interaction response time
- Memory usage patterns

### Tools and Techniques

- React DevTools Profiler for render analysis
- Chrome DevTools Performance tab
- Lighthouse audits for web vitals
- Bundle analyzer for dependency analysis
- Custom performance hooks for monitoring

## Code Review Checklist

### Component Level

- [ ] Props are properly memoized when needed
- [ ] Event handlers use useCallback appropriately
- [ ] Expensive calculations use useMemo
- [ ] Component composition prevents prop drilling
- [ ] Conditional rendering is optimized

### Hook Level

- [ ] Custom hooks avoid unnecessary dependencies
- [ ] State updates are batched when possible
- [ ] Side effects are properly cleaned up
- [ ] localStorage operations are debounced
- [ ] Error boundaries handle failures gracefully

### Data Level

- [ ] Array operations are optimized for size
- [ ] Object destructuring doesn't cause re-renders
- [ ] Data transformations are memoized
- [ ] Chart data is efficiently prepared
- [ ] Sorting and filtering are performant

## Specific Optimizations

### Portfolio Calculations

- Memoize total portfolio value calculations
- Optimize percentage calculations for chart data
- Implement efficient stock lookup by symbol
- Cache computed values with proper invalidation

### Chart Performance

- Optimize Recharts data structure
- Implement virtualization for large datasets
- Use proper chart update strategies
- Minimize chart re-renders on data changes

### Form Performance

- Debounce validation operations
- Optimize controlled input patterns
- Implement proper error state management
- Use efficient form state updates

Generate specific, actionable optimization recommendations with code examples that can be immediately implemented.
