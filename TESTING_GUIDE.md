# Testing Guide - Akademyx Programme Webpage

## 🧪 Testing Overview

This project includes multiple testing strategies:

1. **End-to-End (E2E) Tests** - Playwright
2. **Unit Tests** - Vitest
3. **Manual Testing** - User acceptance testing

## 🎭 End-to-End Testing with Playwright

### Running E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/app.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Debug tests
npx playwright test --debug
```

### Viewing Test Reports

```bash
# Generate and view HTML report
npx playwright show-report
```

### Current E2E Tests

Located in `tests/app.spec.ts`:

1. **Home Page Test**
   - Verifies page loads correctly
   - Checks for main heading
   - Validates title

2. **Application Form Test**
   - Checks form visibility
   - Validates form section

3. **Referral Page Test**
   - Verifies referral page loads
   - Checks for referral content

### Adding New E2E Tests

Create new test files in the `tests/` directory:

```typescript
import { test, expect } from '@playwright/test';

test('your test name', async ({ page }) => {
  // Navigate to page
  await page.goto('/your-route');
  
  // Perform actions
  await page.click('button');
  await page.fill('input[name="email"]', 'test@example.com');
  
  // Make assertions
  await expect(page.getByText('Success')).toBeVisible();
});
```

## 🧩 Unit Testing with Vitest

### Running Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test -- --coverage
```

### Creating Unit Tests

Create test files next to your components with `.test.ts` or `.test.tsx` extension:

```typescript
// Example: src/components/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

## 📋 Manual Testing Checklist

### 1. Landing Page

- [ ] Page loads without errors
- [ ] Hero section displays correctly
- [ ] All 4 courses are visible
- [ ] Animations work smoothly
- [ ] WhatsApp button appears
- [ ] Responsive design works on mobile
- [ ] Navigation links work

### 2. Application Form

- [ ] Form is visible
- [ ] All fields are present
- [ ] Validation works correctly
- [ ] Error messages display properly
- [ ] Success message appears on submission
- [ ] Form resets after submission
- [ ] Referral code field works (optional)

### 3. Referral System

- [ ] Referral page loads
- [ ] Institution form works
- [ ] Individual form works
- [ ] Referral code generation works
- [ ] Commission calculation is correct
- [ ] Banking details are saved

### 4. Authentication

- [ ] Login redirects to WorkOS
- [ ] Callback handles authentication
- [ ] User session persists
- [ ] Logout works correctly
- [ ] Protected routes are secured
- [ ] User data displays correctly

### 5. WhatsApp Integration

- [ ] WhatsApp button is visible
- [ ] Clicking opens WhatsApp
- [ ] Pre-filled message is correct
- [ ] Phone number is correct (+2349025152818)

### 6. Performance

- [ ] Page loads in < 3 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] Smooth animations
- [ ] No layout shifts

### 7. Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast is sufficient
- [ ] Focus indicators are visible
- [ ] Alt text on images

## 🔍 Testing Authentication Flow

### Manual Test Steps

1. **Login Flow**

   ```
   1. Navigate to protected route (e.g., /dashboard)
   2. Should redirect to WorkOS login
   3. Enter credentials
   4. Should redirect back to application
   5. User should be authenticated
   ```

2. **Session Persistence**

   ```
   1. Login successfully
   2. Refresh the page
   3. User should still be authenticated
   4. Navigate to different pages
   5. Session should persist
   ```

3. **Logout Flow**

   ```
   1. Click logout button
   2. Should clear session
   3. Should redirect to home page
   4. Protected routes should be inaccessible
   ```

## 🧪 Testing Convex Integration

### Testing Database Operations

```typescript
// Example test for Convex mutations
import { test, expect } from 'vitest';
import { convexTest } from 'convex-test';
import { api } from '../convex/_generated/api';

test('creates application', async () => {
  const t = convexTest();
  
  const applicationId = await t.mutation(api.crud.createApplication, {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    // ... other fields
  });
  
  expect(applicationId).toBeDefined();
  
  const application = await t.query(api.crud.getApplication, {
    id: applicationId,
  });
  
  expect(application.firstName).toBe('John');
});
```

## 📊 Performance Testing

### Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse audit
lighthouse http://localhost:3000 --view

# Run with specific categories
lighthouse http://localhost:3000 \
  --only-categories=performance,accessibility,best-practices,seo \
  --view
```

### Performance Metrics to Monitor

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## 🐛 Debugging Tests

### Playwright Debugging

```bash
# Run with debugger
npx playwright test --debug

# Run with trace
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

### Vitest Debugging

```bash
# Run specific test in debug mode
npm run test -- --reporter=verbose

# Use debugger in VS Code
# Add breakpoint in test file
# Run "Debug Test" from VS Code
```

## 🔄 Continuous Integration Testing

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npx playwright test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## 📝 Test Coverage Goals

- **Unit Tests**: > 80% coverage
- **E2E Tests**: Cover all critical user flows
- **Integration Tests**: Test all API routes

### Checking Coverage

```bash
# Run tests with coverage
npm run test -- --coverage

# View coverage report
open coverage/index.html
```

## 🎯 Testing Best Practices

1. **Write tests first** (TDD approach when possible)
2. **Test user behavior**, not implementation details
3. **Keep tests isolated** and independent
4. **Use descriptive test names**
5. **Mock external dependencies**
6. **Test edge cases** and error scenarios
7. **Keep tests fast** and focused
8. **Update tests** when features change

## 🚨 Common Testing Issues

### Issue: Tests fail in CI but pass locally

**Solution**:

- Check Node.js version consistency
- Ensure all dependencies are installed
- Check for timing issues (add waits)
- Review environment variables

### Issue: Playwright tests are flaky

**Solution**:

- Use `waitFor` instead of fixed timeouts
- Increase timeout for slow operations
- Use `test.retry()` for flaky tests
- Check for race conditions

### Issue: Convex tests fail

**Solution**:

- Ensure Convex dev server is running
- Check environment variables
- Verify schema is up to date
- Clear Convex cache

## 📞 Support

For testing issues:

- Playwright docs: <https://playwright.dev>
- Vitest docs: <https://vitest.dev>
- Testing Library: <https://testing-library.com>

---

**Last Updated**: November 21, 2025
**Test Status**: ✅ All tests passing
