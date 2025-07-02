---
description: TypeScript 타입 정의 및 타입 안전성 확보를 위한 지침
applyTo: '**/*.ts'
---

# TypeScript Best Practices Instructions

## Type Definitions

- Always define explicit interfaces for component props, hook returns, and function parameters
- Use PascalCase for interfaces and types
- Prefer interfaces over types for object shapes
- Use union types for limited string/number values

## Strict Type Safety

- Never use `any` type - use `unknown` or proper type definitions instead
- Use type assertions sparingly and only when absolutely necessary
- Implement proper type guards for runtime type checking
- Use generic types for reusable components and hooks

## Import/Export Patterns

- Use type-only imports for types: `import type { Stock } from '~/types'`
- Prefer named exports over default exports for better tree-shaking
- Group imports: React → External libraries → Internal modules → Types
- Use path aliases consistently (`~/` for app folder)

## Error Handling Types

- Define specific error types for different error scenarios
- Use Result/Either patterns for functions that can fail
- Implement proper error boundaries with typed error states
- Always handle async operation errors with proper typing

## Data Model Types

```typescript
// Core business entities
interface Stock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  totalValue: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// Form data types (different from entity types)
interface StockFormData {
  symbol: string;
  name: string;
  shares: string; // Form inputs are strings
  avgPrice: string;
}

// API response types
interface StockOperationResult {
  success: boolean;
  data?: Stock;
  error?: string;
}
```

## Hook Type Patterns

```typescript
// Custom hook with proper return type
interface UsePortfolioReturn {
  stocks: Stock[];
  isLoading: boolean;
  error: string | null;
  addStock: (
    stock: Omit<Stock, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<void>;
  updateStock: (id: string, updates: Partial<Stock>) => Promise<void>;
  deleteStock: (id: string) => Promise<void>;
}

export const usePortfolio = (): UsePortfolioReturn => {
  // Implementation
};
```

## Utility Type Usage

- Use `Partial<T>` for optional updates
- Use `Omit<T, K>` to exclude specific properties
- Use `Pick<T, K>` to select specific properties
- Use `Record<K, V>` for key-value mappings

## Validation and Type Guards

```typescript
// Runtime type validation
const isValidStock = (data: unknown): data is Stock => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'symbol' in data &&
    'shares' in data &&
    typeof (data as any).shares === 'number'
  );
};

// Form validation with types
interface ValidationResult<T> {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
}

const validateStockForm = (
  data: StockFormData,
): ValidationResult<StockFormData> => {
  // Validation logic
};
```

## Generic Type Patterns

```typescript
// Generic hook for form handling
interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: <K extends keyof T>(field: K, value: T[K]) => void;
  isValid: boolean;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
): UseFormReturn<T> => {
  // Implementation
};
```

## localStorage Typing

```typescript
// Typed localStorage wrapper
interface StorageAPI {
  getItem<T>(key: string, defaultValue: T): T;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

// Storage keys as const assertions
const STORAGE_KEYS = {
  STOCKS: 'stocks',
  PREFERENCES: 'user_preferences',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
```

## Event Handler Types

```typescript
// Proper event handler typing
interface FormProps {
  onSubmit: (data: StockFormData) => void;
  onCancel: () => void;
  onChange: (field: keyof StockFormData, value: string) => void;
}

// Event handlers in components
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle submission
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  // Handle change
};
```

## Conditional Types and Mapped Types

```typescript
// Conditional types for different modes
type FormMode = 'create' | 'edit';

type FormProps<T extends FormMode> = T extends 'edit'
  ? { mode: T; initialData: Stock }
  : { mode: T };

// Mapped types for form validation
type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
};
```
