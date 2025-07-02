# Stock Portfolio Component Design System

Create consistent, reusable UI components following the Stock Portfolio Manager's design system and accessibility standards.

## Context

This is a dark-themed React 19 + TypeScript application using TailwindCSS 4.1.4. Components should be atomic, accessible, and follow the established design tokens and patterns.

## Design System Specifications

### Color Palette

- **Primary**: blue-500 (#3B82F6), blue-600 hover
- **Secondary**: emerald-500 (#10B981), emerald-600 hover
- **Success**: emerald-500, Warning: amber-500, Error: red-500
- **Background**: slate-900, Surfaces: slate-800
- **Text**: slate-50 (primary), slate-400 (secondary), slate-600 (muted)
- **Borders**: slate-700, Focus: blue-500

### Typography Scale

- **Heading 1**: text-3xl font-bold text-slate-50
- **Heading 2**: text-2xl font-semibold text-slate-50
- **Heading 3**: text-xl font-medium text-slate-50
- **Body**: text-base text-slate-50
- **Caption**: text-sm text-slate-400
- **Label**: text-sm font-medium text-slate-400

### Spacing & Layout

- **Base unit**: 4px (space-1)
- **Grid system**: 8px intervals (space-2, space-4, space-6, space-8)
- **Container max-width**: max-w-7xl
- **Border radius**: rounded-lg (8px), rounded-xl (12px)
- **Shadows**: shadow-lg, shadow-xl for elevated surfaces

## Component Requirements

### 1. Button Component (`~/components/ui/Button.tsx`)

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### 2. Input Component (`~/components/ui/Input.tsx`)

```typescript
interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}
```

### 3. Card Component (`~/components/ui/Card.tsx`)

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}
```

### 4. Modal Component (`~/components/ui/Modal.tsx`)

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### 5. Badge Component (`~/components/ui/Badge.tsx`)

```typescript
interface BadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}
```

## Accessibility Requirements

### ARIA Implementation

- Proper role attributes for interactive elements
- aria-label and aria-describedby for form inputs
- aria-expanded and aria-haspopup for dropdowns
- aria-live regions for dynamic content updates

### Keyboard Navigation

- Tab order follows logical content flow
- Enter and Space key support for buttons
- Escape key closes modals and dropdowns
- Arrow keys for list navigation

### Focus Management

- Visible focus indicators with proper contrast
- Focus trapping in modals
- Focus restoration after modal close
- Skip links for keyboard users

### Screen Reader Support

- Meaningful text alternatives for icons
- Proper heading hierarchy
- Form label associations
- Status announcements for state changes

## Technical Implementation

### Component Structure

```typescript
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-slate-800 text-slate-50 hover:bg-slate-700",
        // ... other variants
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Responsive Design

- Mobile-first approach (375px-768px)
- Tablet optimization (768px-1024px)
- Desktop enhancement (1024px+)
- Touch-friendly hit targets (44px minimum)

### Animation & Transitions

- 200ms ease-in-out for interactive states
- 300ms for page transitions
- Scale transforms for button feedback
- Smooth loading and error state transitions

## Testing Requirements

### Visual Testing

- Test all component variants and states
- Verify responsive behavior across breakpoints
- Check dark theme consistency
- Validate focus and hover states

### Accessibility Testing

- Screen reader compatibility
- Keyboard navigation flows
- Color contrast validation
- ARIA attribute verification

### Component API Testing

- Prop validation and TypeScript compliance
- Event handler functionality
- Default value behavior
- Error state handling

## Documentation Standards

### Storybook Integration

- Create stories for all component variants
- Document props and usage examples
- Include accessibility notes
- Show responsive behavior

### Code Documentation

- JSDoc comments for public APIs
- Usage examples in component files
- Prop descriptions and constraints
- Migration guides for breaking changes

Generate production-ready, accessible components that can serve as the foundation for the entire application's UI system.
