# Stock Portfolio Test Generation

Generate comprehensive tests for Stock Portfolio Manager components and hooks using React Testing Library and Jest.

## Context

This is a React 19 + TypeScript application with localStorage-based state management. Tests should cover user interactions, edge cases, and accessibility requirements.

## Required Output

Generate test files for the specified component/hook with the following coverage:

### Component Tests Structure

```typescript
// Example: StockForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StockForm } from './StockForm';
import type { Stock } from '~/types';

describe('StockForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // Test cases here
});
```

### Test Coverage Requirements

1. **User Interactions**
   - Form submission with valid data
   - Form validation errors and recovery
   - Cancel/reset functionality
   - Keyboard navigation and shortcuts

2. **Edge Cases**
   - Empty states and loading states
   - localStorage failures and recovery
   - Network simulation (if applicable)
   - Invalid data handling

3. **Accessibility**
   - Screen reader compatibility
   - Keyboard-only navigation
   - Focus management
   - ARIA attributes validation

4. **Performance**
   - Component memoization effectiveness
   - Large dataset handling
   - Memory leak prevention

### Hook Tests Structure

```typescript
// Example: usePortfolio.test.ts
import { renderHook, act } from '@testing-library/react';
import { usePortfolio } from './usePortfolio';

describe('usePortfolio', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test cases here
});
```

### Mock Patterns

- Mock localStorage operations with proper error scenarios
- Mock Recharts components for chart testing
- Mock file operations and external dependencies
- Use MSW for API mocking (if applicable)

## Technical Requirements

- Use React Testing Library best practices
- TypeScript strict mode for all test files
- Proper cleanup in beforeEach/afterEach
- Meaningful test descriptions and assertions
- Mock external dependencies appropriately
- Test both success and failure scenarios

## Test Organization

- Group related tests with `describe` blocks
- Use `it.each` for parameterized tests
- Include `beforeEach` setup for consistent state
- Separate unit, integration, and e2e concerns
- Follow AAA pattern (Arrange, Act, Assert)

## Accessibility Testing

- Include axe-core for automated a11y testing
- Test keyboard navigation flows
- Verify ARIA attributes and roles
- Test with screen reader scenarios
- Validate color contrast and focus indicators

Generate comprehensive, maintainable tests that ensure code quality and user experience reliability.
