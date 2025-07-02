# GitHub Issues for Stock Portfolio Manager

This directory contains GitHub issue templates that can be created using the GitHub CLI (`gh`).

## Prerequisites

1. Install GitHub CLI: https://cli.github.com/
2. Authenticate with GitHub: `gh auth login`
3. Make sure you're in the project repository

## Creating Issues

Each `.md` file in this directory contains an issue template with a corresponding `gh` command to create the issue.

To create all issues at once, run:

```bash
# Windows PowerShell
Get-ChildItem -Path ".\docs\issues\" -Filter "*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '(?s)<!-- gh create issue(.*?)-->') {
        $command = $matches[1].Trim()
        Write-Host "Creating issue: $($_.BaseName)"
        Invoke-Expression "gh issue create $command"
    }
}

# Linux/macOS
for file in docs/issues/*.md; do
    if grep -q "<!-- gh create issue" "$file"; then
        echo "Creating issue from: $(basename "$file")"
        command=$(grep -oP '<!-- gh create issue \K.*?(?= -->)' "$file")
        gh issue create $command
    fi
done
```

## Issue Categories

- **Setup & Infrastructure**: Project setup, dependencies, tooling
- **Core Features**: Stock CRUD, portfolio management, data persistence
- **UI/UX**: Components, design system, responsive design
- **Data & Charts**: Visualization, calculations, data management
- **Testing & Quality**: Unit tests, integration tests, accessibility
- **Performance & Optimization**: Code optimization, bundle analysis
- **Documentation**: Guides, API docs, user documentation

## Issue Labels

Make sure to create these labels in your GitHub repository:

- `epic` - Large feature sets
- `feature` - New functionality
- `bug` - Bug fixes
- `enhancement` - Improvements to existing features
- `documentation` - Documentation updates
- `testing` - Testing related tasks
- `performance` - Performance improvements
- `ui/ux` - User interface and experience
- `setup` - Project setup and configuration
- `priority-high` - High priority tasks
- `priority-medium` - Medium priority tasks
- `priority-low` - Low priority tasks
