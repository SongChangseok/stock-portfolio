# GitHub Copilot Instructions for Stock Portfolio Manager

## Project Overview

This is a **Stock Portfolio Manager** - a personal stock portfolio management web application built with React Router v7, TypeScript, TailwindCSS, and Recharts. The app focuses on simplicity, modern design, and local data storage for privacy.

## Core Technologies & Framework

- **Frontend**: React 19.1.0 + TypeScript 5.8.3
- **Routing**: React Router 7.5.3 (latest version with SSR support)
- **Styling**: TailwindCSS 4.1.4 (latest version)
- **Charts**: Recharts 3.0.2 for pie chart visualization
- **Icons**: Lucide React
- **UI Components**: Headless UI for accessible components
- **Build Tool**: Vite 6.3.3
- **Storage**: Browser LocalStorage only (no external APIs)

## Code Style & Standards

### TypeScript Guidelines

- Always use explicit type definitions and interfaces
- Prefer named exports over default exports
- Use strict TypeScript settings and avoid `any` type
- Define interfaces with PascalCase naming
- Use type-only imports: `import type { Stock } from '~/types'`

### React Patterns

- Use functional components with React.FC<Props> typing
- Implement custom hooks for state management (prefix with `use`)
- Apply memoization (useMemo, useCallback, memo) for performance
- Follow atomic design pattern for component structure
- Use React Suspense for lazy loading

### Component Structure

```typescript
// 1. Imports (ordered: React, external libraries, internal modules, types)
import React, { useState, useCallback } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '~/components/ui';
import type { Stock } from '~/types';

// 2. Types/Interfaces
interface ComponentProps {
  stocks: Stock[];
  onAdd: (stock: Stock) => void;
}

// 3. Component with explicit typing
export const StockComponent: React.FC<ComponentProps> = ({ stocks, onAdd }) => {
  // Component logic
};
```

### Naming Conventions

- **Components**: PascalCase (`StockForm`, `PortfolioChart`)
- **Hooks**: camelCase with `use` prefix (`usePortfolio`, `useLocalStorage`)
- **Types/Interfaces**: PascalCase (`Stock`, `Portfolio`, `ChartData`)
- **Constants**: SCREAMING_SNAKE_CASE (`STORAGE_KEYS`, `COLOR_PALETTE`)
- **Files**: PascalCase for components (`StockForm.tsx`)
- **Folders**: kebab-case (`portfolio-components`, `ui-elements`)

## Design System & UI

### Dark Theme Requirements

- Use dark color palette: slate-900 background, slate-800 surfaces
- Primary: blue-500 (#3B82F6), Secondary: emerald-500 (#10B981)
- Text: slate-50 primary, slate-400 secondary
- Apply consistent 8px spacing grid system
- Use subtle shadows and 8px/12px border radius

### TailwindCSS Usage

- Prefer utility classes over custom CSS
- Use responsive design breakpoints: mobile (375px-768px), tablet (768px-1024px), desktop (1024px+)
- Apply hover effects and smooth transitions (200ms ease-in-out)
- Use dark: variants for theme consistency

### Component Patterns

- Create reusable UI components in `~/components/ui/`
- Business logic components in `~/components/portfolio/`
- Use Headless UI for accessibility (modals, dropdowns)
- Implement loading states and empty states for better UX

## Data Management

### Type Definitions

```typescript
interface Stock {
  id: string; // UUID v4
  symbol: string; // Stock ticker (e.g., "AAPL")
  name: string; // Company name
  shares: number; // Number of shares
  avgPrice: number; // Average purchase price
  totalValue: number; // Calculated total value
  color: string; // Chart color (hex)
  createdAt: Date;
  updatedAt: Date;
}
```

### State Management

- Use custom hooks for data logic (`usePortfolio`, `useLocalStorage`)
- Apply React's built-in state management (useState, useReducer)
- Implement data persistence with localStorage
- Use immutable state updates with spread syntax

### LocalStorage Patterns

- Implement error handling for JSON parse/stringify
- Use typed localStorage utilities
- Apply data validation on load
- Handle storage quota exceeded scenarios

## Performance & Best Practices

### Optimization Techniques

- Use React.memo for component memoization
- Apply useMemo for expensive calculations
- Implement useCallback for event handlers
- Use lazy loading for route-based code splitting

### Error Handling

- Implement error boundaries for component crashes
- Use try-catch blocks for localStorage operations
- Provide user-friendly error messages
- Log errors for debugging in development

### Security Considerations

- Sanitize user inputs to prevent XSS
- Use strong typing to prevent injection
- Avoid external API calls (local-only application)
- Implement proper validation for all form inputs

## Testing Requirements

### Testing Strategy

- Write unit tests for custom hooks using React Testing Library
- Test components with user interaction scenarios
- Mock localStorage operations in tests
- Use TypeScript for test type safety

### Test Structure

```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle user interaction correctly', () => {
    // Test implementation
  });
});
```

## File Organization

### Project Structure

```
app/
├── components/
│   ├── ui/              # Reusable UI components
│   └── portfolio/       # Business logic components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Application constants
└── routes/             # Page routes
```

### Import Organization

- Group imports: React → External libraries → Internal modules → Types
- Use path aliases (`~/*` for app folder)
- Prefer named imports for tree-shaking
- Keep imports organized and clean

## Chart & Visualization

### Recharts Implementation

- Use PieChart component for portfolio visualization
- Apply responsive sizing for mobile/desktop
- Use consistent color palette from design system
- Implement proper data formatting for chart consumption
- Add tooltips and legends for better UX

### Data Visualization Best Practices

- Show percentage and absolute values
- Use accessible color contrasts
- Implement smooth animations (300ms duration)
- Handle empty state gracefully

## Form Handling

### Form Validation

- Use custom validation hooks with TypeScript
- Implement real-time validation feedback
- Show field-level error messages
- Apply proper input types and constraints

### Form Patterns

```typescript
const useForm = <T>(
  initialValues: T,
  validationSchema: ValidationSchema<T>,
) => {
  // Form logic with proper typing
};
```

## Development Workflow

### Git Commit Standards

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Write descriptive commit messages
- Keep commits atomic and focused
- Reference issue numbers when applicable

### Code Review Guidelines

- Ensure TypeScript compilation without errors
- Check for proper error handling
- Verify responsive design implementation
- Validate accessibility requirements
- Test localStorage functionality

## Documentation Standards

- Document complex business logic
- Use JSDoc for public functions
- Include type information in comments
- Provide usage examples for custom hooks
- Keep README updated with setup instructions

Remember: This is a privacy-focused application that stores all data locally. Never suggest external API integrations or server-side storage solutions. Focus on simplicity, performance, and user experience while maintaining strong type safety throughout the codebase.
