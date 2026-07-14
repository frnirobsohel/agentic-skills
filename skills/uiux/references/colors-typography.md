# Colors, Typography & Brand Identity

## STRICT Color Rules

- **NEVER use raw hex values in components.** Always use CSS custom properties or Tailwind tokens.
- **NEVER rely on color alone to convey meaning.** Always pair with an icon, label, or pattern.
- **Text contrast: minimum 4.5:1 for body text, 3:1 for large text and UI components (WCAG AA).** Use a contrast checker before shipping.
- Semantic colors (success, warning, error, info) MUST be defined independently from brand colors.

### Required Color Token Set (Every project must define all of these)

```css
/* globals.css */
:root {
  --color-primary: oklch(55% 0.2 250);
  --color-primary-foreground: oklch(98% 0 0);
  --color-secondary: oklch(70% 0.1 200);
  --color-accent: oklch(80% 0.15 180);
  --color-success: oklch(60% 0.2 150);
  --color-warning: oklch(75% 0.18 85);
  --color-error: oklch(55% 0.22 30);
  --color-info: oklch(60% 0.18 240);
  --color-surface: oklch(98% 0 0);
  --color-background: oklch(96% 0 0);
  --color-border: oklch(85% 0 0);
}
```

### Dark Mode Rules (Mandatory)
- **NEVER use pure `#000000` as the dark mode base.** Use `oklch(10% 0 0)` or equivalent.
- Use a layered elevation model: `base < card < modal < tooltip`.
- Desaturate brand colors by 10-15% in dark mode — they appear too bright on dark backgrounds.

## STRICT Typography Rules

| Role | Size | Weight | Line Height |
|---|---|---|---|
| Display / Hero | 48px+ | 700 (Bold) | 1.1-1.2 |
| H1 | 32px | 700 | 1.2 |
| H2 | 24px | 600 | 1.25 |
| H3 | 20px | 600 | 1.3 |
| H4 | 18px | 600 | 1.35 |
| Body | 16px | 400 | 1.5-1.75 |
| Small / Caption | 14px | 400 | 1.5 |
| **MINIMUM** | **12px** | — | — |

- **NEVER use font sizes below 12px.** 16px is the minimum for body text on mobile (prevents iOS auto-zoom).
- **NEVER use more than 2 typefaces** in a single product.
- Use `font-display: swap` to prevent invisible text during font load (FOIT).
- Use tabular (monospace) figures for prices, data tables, and timers.

## Brand Identity Rules (Mandatory)

- A user MUST be able to identify your product from any single screen without seeing the logo.
- **NEVER stretch, rotate, or recolor the logo.**
- Primary brand color MUST meet 4.5:1 contrast when used on text.
- Icon style MUST be consistent: never mix outline and filled icons in the same interface.
- Define brand voice (e.g., "confident and clear") and apply it to button labels, errors, and empty states.
