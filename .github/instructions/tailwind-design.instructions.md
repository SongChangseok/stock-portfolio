---
description: TailwindCSS 다크 테마 디자인 시스템 적용 지침
applyTo: '**/*.tsx'
---

# TailwindCSS Dark Theme & Design System Instructions

## Dark Theme Color Palette

- **Background**: `bg-slate-900` (primary), `bg-slate-800` (secondary surfaces)
- **Text**: `text-slate-50` (primary), `text-slate-400` (secondary), `text-slate-300` (muted)
- **Primary**: `bg-blue-500`, `text-blue-500`, `border-blue-500` (#3B82F6)
- **Secondary**: `bg-emerald-500`, `text-emerald-500` (#10B981)
- **Success**: `bg-green-500`, `text-green-500`
- **Warning**: `bg-amber-500`, `text-amber-500`
- **Error**: `bg-red-500`, `text-red-500`

## Spacing & Layout System

- Use 8px grid system: `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px)
- Consistent gap spacing: `gap-2`, `gap-4`, `gap-6`, `gap-8`
- Border radius: `rounded-lg` (8px) for cards, `rounded-xl` (12px) for modals
- Shadows: `shadow-lg` for cards, `shadow-xl` for modals, `shadow-2xl` for overlays

## Responsive Design Breakpoints

- Mobile-first approach: base styles for mobile (375px+)
- Tablet: `md:` prefix (768px+)
- Desktop: `lg:` prefix (1024px+)
- Large desktop: `xl:` prefix (1280px+)

## Component Design Patterns

### Card Components

```tsx
<div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
  <h3 className="text-slate-50 text-lg font-semibold mb-4">Card Title</h3>
  <p className="text-slate-400">Card content</p>
</div>
```

### Button Variants

```tsx
// Primary button
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
  Primary Action
</button>

// Secondary button
<button className="bg-slate-700 hover:bg-slate-600 text-slate-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
  Secondary Action
</button>

// Danger button
<button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
  Delete
</button>
```

### Form Inputs

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-slate-300">
    Stock Symbol
  </label>
  <input
    type="text"
    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-50 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
    placeholder="e.g., AAPL"
  />
</div>
```

## Interactive States

- **Hover**: Add `hover:` prefix with slightly lighter/darker variants
- **Focus**: Use `focus:border-blue-500 focus:ring-1 focus:ring-blue-500`
- **Active**: Use `active:` prefix for button pressed states
- **Disabled**: Use `disabled:opacity-50 disabled:cursor-not-allowed`

## Transitions & Animations

- Standard transition: `transition-colors duration-200 ease-in-out`
- Hover effects: `hover:scale-105 transition-transform duration-200`
- Loading states: `animate-pulse` or `animate-spin`
- Modal animations: `transition-opacity duration-300`

## Layout Utilities

### Grid Layouts

```tsx
// Portfolio grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>

// Dashboard layout
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">{/* Main content */}</div>
  <div className="lg:col-span-1">{/* Sidebar */}</div>
</div>
```

### Flexbox Patterns

```tsx
// Header with navigation
<header className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
  <h1 className="text-xl font-bold text-slate-50">Portfolio Manager</h1>
  <nav className="flex items-center space-x-4">
    {/* Navigation items */}
  </nav>
</header>

// Card with actions
<div className="flex items-center justify-between p-4">
  <div className="flex-1">
    <h3 className="font-semibold text-slate-50">Stock Name</h3>
    <p className="text-slate-400">Details</p>
  </div>
  <div className="flex items-center space-x-2">
    {/* Action buttons */}
  </div>
</div>
```

## Typography Scale

- **Headings**: `text-2xl font-bold` (h1), `text-xl font-semibold` (h2), `text-lg font-semibold` (h3)
- **Body**: `text-base` (regular), `text-sm` (small), `text-xs` (tiny)
- **Font weights**: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)

## Chart Integration Colors

```tsx
// Consistent color palette for Recharts
const CHART_COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#06B6D4', // cyan-500
  '#84CC16', // lime-500
  '#F97316', // orange-500
];
```

## Modal & Overlay Patterns

```tsx
// Modal backdrop
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 w-full max-w-md">
    <div className="p-6">
      <h2 className="text-xl font-semibold text-slate-50 mb-4">Modal Title</h2>
      {/* Modal content */}
    </div>
  </div>
</div>
```

## Loading & Empty States

```tsx
// Loading skeleton
<div className="animate-pulse">
  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-slate-700 rounded w-1/2"></div>
</div>

// Empty state
<div className="text-center py-12">
  <div className="text-slate-400 text-4xl mb-4">📈</div>
  <h3 className="text-lg font-semibold text-slate-300 mb-2">No stocks yet</h3>
  <p className="text-slate-400 mb-6">Add your first stock to get started</p>
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
    Add Stock
  </button>
</div>
```

## Utility Class Organization

- Group related classes: `bg-slate-800 text-slate-50 border border-slate-700`
- Layout first: `flex items-center justify-between`
- Then spacing: `p-4 m-2 gap-4`
- Then colors: `bg-blue-500 text-white`
- Finally states: `hover:bg-blue-600 focus:ring-2`

## Custom CSS Variables (when needed)

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --spacing-unit: 0.5rem; /* 8px */
}
```

Remember: Always prioritize utility classes over custom CSS. Only use custom CSS for complex animations or when Tailwind utilities are insufficient.
