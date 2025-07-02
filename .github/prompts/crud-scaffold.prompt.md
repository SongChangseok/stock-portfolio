# Stock Portfolio CRUD Component Scaffolding

Generate a complete CRUD component set for the Stock Portfolio Manager following the project's architecture and conventions.

## Context

This is a React 19 + TypeScript + TailwindCSS stock portfolio management app. Components should follow the established patterns and integrate with the existing localStorage-based state management.

## Required Output

Create the following files with proper TypeScript typing and dark theme styling:

### 1. Form Component (`~/components/portfolio/StockForm.tsx`)

- Controlled form with validation for adding/editing stocks
- Fields: symbol (uppercase), name, shares (number), avgPrice (currency)
- Real-time validation with error states
- Responsive design with mobile-first approach
- Dark theme with proper focus states

### 2. List Component (`~/components/portfolio/StockList.tsx`)

- Display stocks in a responsive grid/table
- Show calculated values and percentages
- Include edit/delete actions with confirmation
- Empty state with call-to-action
- Proper loading states

### 3. Detail Modal (`~/components/portfolio/StockDetailModal.tsx`)

- Full stock information display
- Edit mode toggle
- Chart integration (if applicable)
- Accessible modal with proper keyboard navigation

### 4. Custom Hook (`~/hooks/useStockCrud.ts`)

- CRUD operations with localStorage persistence
- Optimistic updates with error handling
- Validation helpers
- Type-safe operations

## Technical Requirements

- Follow the project's TypeScript strict mode conventions
- Use established TailwindCSS classes and design tokens
- Implement proper error boundaries and loading states
- Include accessibility attributes (ARIA labels, roles)
- Use Lucide React icons consistently
- Apply proper form validation patterns
- Ensure mobile responsiveness (375px-1024px+)

## Design Specifications

- Dark theme: slate-900 background, slate-800 surfaces
- Primary colors: blue-500, emerald-500
- 8px spacing grid, 8px/12px border radius
- Smooth transitions (200ms ease-in-out)
- Consistent hover and focus states
- Proper typography hierarchy

## Code Style

- Use React.FC<Props> typing
- Named exports only
- Explicit interface definitions
- useMemo/useCallback for performance
- JSDoc for complex functions
- Error handling with user-friendly messages

Generate production-ready code that can be immediately integrated into the existing project structure.
