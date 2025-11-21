# Testing Guide

## Overview

This project uses **Vitest** for unit and integration testing, providing fast and modern testing capabilities.

## Running Tests

### Run all tests once

```bash
npm run test
```

### Run tests in watch mode (for development)

```bash
npm run test:watch
```

### Run tests with UI

```bash
npm run test:ui
```

### Type checking

```bash
npm run type-check
```

## Test Structure

- **Unit Tests**: Located next to the files they test (e.g., `utils.test.ts`)
- **Setup**: Global test setup in `src/test/setup.ts`
- **Configuration**: `vitest.config.ts`

## Writing Tests

Example test file:

```typescript
import { expect, test, describe } from 'vitest'
import { myFunction } from './myFile'

describe('myFunction', () => {
  test('should do something', () => {
    const result = myFunction('input')
    expect(result).toBe('expected output')
  })
})
```

## CI/CD Integration

Tests run automatically on:

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

The CI pipeline runs:

1. ESLint checks
2. TypeScript type checking
3. All tests
4. Build verification
