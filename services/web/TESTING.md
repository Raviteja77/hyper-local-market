# Testing Guide

## Overview

This project uses **Vitest** for unit testing with **React Testing Library** for component testing. All atomic components have comprehensive test coverage.

## Running Tests

```bash
# Run tests once
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run with UI
npm run test:ui
```

## Test Configuration

Tests are configured in `vitest.config.ts`:

- **Test Environment**: jsdom (for DOM testing)
- **Test Pattern**: Only runs tests in `src/components/atoms/**/*.test.{ts,tsx}`
- **Setup**: `src/test/setup.ts` configures `@testing-library/jest-dom`
- **Coverage Provider**: v8 (faster than istanbul)

## Coverage Thresholds

The project enforces minimum coverage thresholds:

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

## Current Coverage (Atoms)

All atomic components have excellent test coverage:

- **Button**: 100% (all metrics)
- **Input**: 100% statements/functions, 95.65% branches
- **Badge**: 100% statements/functions, 88.88% branches
- **Spinner**: 100% (all metrics)
- **Avatar**: 91.66% statements, 85.71% branches, 75% functions
- **Icon**: 83.33% statements/functions, 80% branches
- **Typography**: 100% statements/functions, 83.33% branches

**Overall Coverage**: 95.52% statements, 91.2% branches, 92.3% functions

## Writing Tests

### Basic Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

it('calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Best Practices

1. **Test behavior, not implementation**: Focus on what the user sees and interacts with
2. **Use data-testid sparingly**: Prefer accessible queries (getByRole, getByLabelText)
3. **Keep tests simple**: One assertion per test when possible
4. **Mock dependencies**: Use vi.fn() for function mocks
5. **Clean up**: Tests automatically clean up between runs

## Coverage Reports

Coverage reports are generated in multiple formats:

- **HTML**: `coverage/index.html` (visual report)
- **LCOV**: `coverage/lcov.info` (for CI tools)
- **JSON**: `coverage/coverage-final.json` (machine-readable)
- **Text**: Console output (quick overview)

## Continuous Integration

Tests run automatically on:
- Pull request creation/update
- Push to main branches
- Pre-commit hooks (if configured)

## Troubleshooting

### Tests failing with import errors

Ensure all test files import from `vitest` and `@testing-library/react`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
```

### Coverage not updating

Clear coverage cache and re-run:

```bash
rm -rf coverage
npm run test:coverage
```

### Act warnings

These are deprecation warnings from React Testing Library and can be safely ignored. The library will be updated in future versions.
