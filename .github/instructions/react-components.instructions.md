---
description: React 컴포넌트 개발을 위한 특별 지침
applyTo: '**/*.tsx'
---

# React Component Development Instructions

## Component Architecture

- Always use React.FC<Props> with explicit TypeScript interfaces
- Follow the atomic design pattern: atoms → molecules → organisms
- Implement proper prop drilling prevention with custom hooks
- Use React.memo for components that receive frequently changing props

## State Management in Components

- Prefer useState for local component state
- Use useReducer for complex state logic with multiple actions
- Implement custom hooks to share stateful logic between components
- Always use functional state updates when state depends on previous value

## Event Handling

- Use useCallback for all event handlers to prevent unnecessary re-renders
- Implement proper event type definitions (React.MouseEvent, React.FormEvent)
- Handle async operations with proper loading states
- Always include error handling for user actions

## Component Performance

- Memoize expensive calculations with useMemo
- Split large components into smaller, focused components
- Use React.lazy for components that are conditionally rendered
- Implement proper key props for dynamic lists

## Accessibility (a11y)

- Include proper ARIA labels and roles
- Ensure keyboard navigation support
- Provide screen reader-friendly content
- Use semantic HTML elements when possible

## Error Boundaries

- Wrap route components with error boundaries
- Implement graceful error fallbacks
- Log errors appropriately for debugging
- Provide user-friendly error messages

## Component Testing Patterns

- Test user interactions rather than implementation details
- Use React Testing Library best practices
- Mock external dependencies and custom hooks
- Test edge cases and error scenarios

## Stock Portfolio Specific Guidelines

- All components should support dark theme variations
- Implement responsive design for mobile-first approach
- Use consistent spacing and typography from the design system
- Handle empty states gracefully (no stocks, loading states)
- Include proper validation feedback for form components

## Example Component Structure

```typescript
interface StockItemProps {
  stock: Stock;
  onEdit: (stock: Stock) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
}

export const StockItem: React.FC<StockItemProps> = memo(({
  stock,
  onEdit,
  onDelete,
  isSelected = false,
}) => {
  const handleEdit = useCallback(() => {
    onEdit(stock);
  }, [stock, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(stock.id);
  }, [stock.id, onDelete]);

  return (
    <div className={cn(
      "p-4 rounded-lg border transition-colors",
      isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
    )}>
      {/* Component content */}
    </div>
  );
});
```
