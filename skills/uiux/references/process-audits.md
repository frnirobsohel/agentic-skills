# Process, Audits & Reviews

## UX Review & Audit Workflow
Before approving a design or code PR, review systematically:
1. Identify the root cause of friction or confusion.
2. Validate against UX principles, accessibility, consistency, and performance.
3. Check for Contrast (WCAG AA), clear Navigation, Keyboard Support, and Semantic HTML.

## Design Debt & Refactoring
- Inconsistent component usage: the same UI element built differently in 5 places.
- Do not attempt a full redesign in one sprint — incremental migration is safer.
- Create a migration plan: define the canonical component, then replace instances one area at a time.

## User Testing & Validation
- Test key flows with interactive prototypes before development.
- Measure behavior with analytics and test with real users in the live product.
- Use Nielsen's 10 heuristics for expert reviews (Visibility of system status, User control, Error prevention, etc.).
