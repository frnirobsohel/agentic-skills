# Layout & Visual Design System

## STRICT Spacing Rules

- **Every spacing value MUST be a multiple of 4px.** Arbitrary values like `17px`, `11px`, or `3rem` are FORBIDDEN.
- **NEVER use `100vh` on mobile.** Always use `min-h-dvh` to account for browser chrome.
- **Max desktop content width: `max-w-6xl` (1152px) or `max-w-7xl` (1280px).** Never wider.
- **z-index scale is locked: 0 / 10 / 20 / 40 / 100 / 1000.** NEVER use an arbitrary z-index.
- Fixed navbars MUST add equivalent bottom padding to the page content beneath them.

## Responsive Breakpoints (Exact Values — Non-Negotiable)

| Breakpoint | Width | Tailwind |
|---|---|---|
| Mobile | 375px | (default) |
| Tablet | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Wide | 1440px | `xl:` |

- **ALWAYS design mobile-first.** Write base styles for 375px, then add `md:`, `lg:` overrides.
- **NEVER set `user-scalable=no`.** This is a WCAG violation.
- Line length: 35-60 characters on mobile, 60-75 on desktop.

## Visual Hierarchy Rules

- **Each screen must have exactly ONE primary CTA.** If you have two, demote one to secondary/ghost variant.
- Content must follow F-pattern or Z-pattern scanning flow.
- Use whitespace as an intentional grouping tool — not empty space.

## Design Token Architecture (3-Tier Model — Mandatory)

| Tier | Name | Example |
|---|---|---|
| Tier 1 | Global (Primitive) | `color.blue.500 = #3B82F6` |
| Tier 2 | Alias (Semantic) | `color.action.primary = color.blue.500` |
| Tier 3 | Component | `button.primary.background = color.action.primary` |

- **NEVER use raw hex values in components.** Always reference Tier 2 or Tier 3 tokens.
- Naming convention: `[category].[variant].[property].[state]` — e.g., `color.primary.background.hover`

## Component States (All Must Be Designed — No Exceptions)

Every interactive component MUST have all of these states designed and implemented:
`default` → `hover` → `active` → `focus` → `disabled` → `loading` → `error` → `empty`

If any state is missing, the component is **incomplete**.
