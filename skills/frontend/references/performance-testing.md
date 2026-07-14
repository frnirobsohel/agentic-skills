# Performance, Testing & Reliability

Performance is not an afterthought; it is an architectural requirement.

## Optimizing INP (Interaction to Next Paint)
INP measures how responsive the page is to user input. The main thread must never be blocked for long periods.
- **Yield to Main Thread**: If a component does heavy client-side processing (e.g., parsing a large array, generating a complex canvas), break the task up.
- **Code Snippet: Yielding**
```tsx
// Modern yielding using scheduler (if available) or setTimeout fallback
function yieldToMain() {
  if ('scheduler' in window && 'yield' in scheduler) {
    return scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function processLargeArray(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    // Yield every 50 items to keep the UI responsive
    if (i % 50 === 0) await yieldToMain(); 
  }
}
```

## Optimizing LCP (Largest Contentful Paint)
LCP is usually an image or a large text block.
- Always use `next/image` with the `priority` prop for the LCP image.
- Avoid lazy-loading the LCP image.
- Preconnect to critical domains (e.g., CDN, API).

## Optimizing CLS (Cumulative Layout Shift)
- **Aspect Ratio**: Always define `width` and `height` on images or use CSS `aspect-ratio` to reserve space before the image loads.
- **Dynamic Content**: If a component fetches data client-side, the skeleton loader MUST be exactly the same size as the final rendered component.

## Testing Strategy

Do not write tests blindly. Target specific confidence layers:
1. **Unit Tests (Vitest)**: Test pure functions, Zod schemas, complex reducers, and utility functions. (Fast, high coverage).
2. **Component Tests (React Testing Library)**: Test interactive components. **Rule:** Test by behavior, not implementation. Find elements by their accessible roles (`getByRole('button', { name: /submit/i })`), not by test IDs or class names.
3. **End-to-End Tests (Playwright)**: Test critical user flows (Login, Checkout, Signup) in a real browser environment. (Slow, high confidence).

## CI/CD, DevOps & Observability
- **Bundle Size**: Enforce strict bundle size limits in CI. Fail the build if the main bundle exceeds 150KB (gzipped).
- **Error Boundaries**: Wrap every major route/feature in a React Error Boundary. Display a fallback UI with a "Try Again" button.
- **Sentry / Datadog**: Capture all unhandled exceptions, Promise rejections, and React Hydration errors.
