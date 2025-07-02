# Prompt Files for Stock Portfolio Manager

This directory contains specialized `.prompt.md` files for VS Code Copilot that provide context-aware assistance for common development tasks in the Stock Portfolio Manager project.

## Available Prompts

### 🏗️ Component Development

- **[crud-scaffold.prompt.md](./crud-scaffold.prompt.md)** - Generate complete CRUD component sets with forms, lists, and modals
- **[design-system.prompt.md](./design-system.prompt.md)** - Create consistent UI components following the project's design system

### 🧪 Testing & Quality

- **[test-generation.prompt.md](./test-generation.prompt.md)** - Generate comprehensive tests for components and hooks
- **[code-review.prompt.md](./code-review.prompt.md)** - Thorough code review with quality and performance focus

### ⚡ Performance & Architecture

- **[performance-optimization.prompt.md](./performance-optimization.prompt.md)** - Analyze and optimize React components and hooks
- **[data-management.prompt.md](./data-management.prompt.md)** - Design efficient data flow and state management patterns

### 🔧 Maintenance & Development

- **[code-refactoring.prompt.md](./code-refactoring.prompt.md)** - Refactor existing code for better maintainability
- **[debugging-troubleshooting.prompt.md](./debugging-troubleshooting.prompt.md)** - Debug issues and implement solutions

## How to Use

### In VS Code Copilot Chat

1. Open VS Code Copilot Chat (Ctrl+Shift+I or Cmd+Shift+I)
2. Use the `@workspace` mention to include workspace context
3. Reference a prompt file using: `#file:.github/prompts/[prompt-name].prompt.md`

Example:

```
@workspace #file:.github/prompts/crud-scaffold.prompt.md

Generate a StockForm component for adding new stocks to the portfolio
```

### For Specific Tasks

Each prompt file is designed for specific development scenarios:

- **New Feature Development**: Start with `crud-scaffold.prompt.md` or `design-system.prompt.md`
- **Code Quality**: Use `code-review.prompt.md` or `test-generation.prompt.md`
- **Performance Issues**: Apply `performance-optimization.prompt.md`
- **Maintenance**: Leverage `code-refactoring.prompt.md`
- **Debugging**: Reference `debugging-troubleshooting.prompt.md`

## Project Context

All prompts are tailored for:

- **Framework**: React 19 + TypeScript 5.8
- **Styling**: TailwindCSS 4.1 with dark theme
- **Routing**: React Router 7.5
- **Charts**: Recharts 3.0
- **Storage**: Browser localStorage only
- **Testing**: React Testing Library + Jest

## Best Practices

1. **Be Specific**: Provide clear context about what you want to generate or improve
2. **Include Examples**: Reference existing components or patterns when relevant
3. **Specify Constraints**: Mention performance, accessibility, or design requirements
4. **Iterative Refinement**: Use prompts multiple times to refine and improve code

## Contributing

When adding new prompt files:

1. Follow the established structure and format
2. Include comprehensive context and requirements
3. Provide concrete examples and code patterns
4. Test prompts with real scenarios
5. Update this README with new prompt descriptions

## Related Documentation

- [Project Requirements](../docs/PRD.md)
- [Technical Specifications](../docs/TECHNICAL_SPEC.md)
- [Development Guide](../docs/DEVELOPMENT_GUIDE.md)
- [Copilot Instructions](../copilot-instructions.md)
