# Design Token & Color Palette System

This guide outlines the implementation of design tokens and custom color palettes in a production-ready application.

---

## 1. Color Palette Generation (HSL Model)

HSL (Hue, Saturation, Lightness) is the standard for generating perceptually consistent color systems.

### Step 1: Base Brand Color
Start with a brand color in HSL format. Example: `#3B82F6` → HSL `214, 89%, 60%`.

### Step 2: 10-Step Scale (50–950)
Generate 10 tonal steps by adjusting lightness monotonically. Keep the Hue ($H$) constant. Reduce Saturation ($S$) slightly at extreme light/dark steps to prevent muddy tones.

| Step | Lightness Range | Usage | Example (Blue Scale) |
|---|---|---|---|
| 50 | 95-97% | Hover states on white, background tint | `hsl(214, 100%, 97%)` |
| 100 | 90-93% | Light background tint | `hsl(214, 95%, 93%)` |
| 200 | 80-85% | Borders, dividers, disabled backgrounds | `hsl(214, 90%, 85%)` |
| 300 | 65-72% | Placeholder text, disabled state | `hsl(214, 85%, 72%)` |
| 400 | 52-60% | Secondary text, dark mode primary actions | `hsl(214, 88%, 60%)` |
| 500 | 42-50% | **Core brand color (Midtone)** | `hsl(214, 89%, 52%)` |
| 600 | 33-42% | Primary interactive buttons & links | `hsl(214, 87%, 43%)` |
| 700 | 24-33% | Hover state for primary actions | `hsl(214, 84%, 34%)` |
| 800 | 15-24% | Dark mode surface text | `hsl(214, 80%, 24%)` |
| 900 | 8-15% | Darkest headings, high contrast text | `hsl(214, 74%, 15%)` |
| 950 | 3-8% | Near-black dark mode backgrounds | `hsl(214, 68%, 8%)` |

### Step 3: Brand-Tinted Neutrals
Never use pure gray (S=0%). Add the primary brand hue at low saturation (S: 5-15%) for color harmony.
- Example: `--neutral-50: hsl(214, 12%, 97%)` to `--neutral-950: hsl(214, 11%, 5%)`.

---

## 2. Design Token Architecture (CSS Custom Properties)

Use a 3-tier token architecture: **Primitives (Tier 1)** -> **Semantic (Tier 2)** -> **Component (Tier 3)**.

### primitives.css (Tier 1: Raw Values)
```css
:root {
  /* Color primitives */
  --blue-50: hsl(214, 100%, 97%);
  --blue-500: hsl(214, 89%, 52%);
  --blue-600: hsl(214, 87%, 43%);
  --neutral-50: hsl(214, 12%, 97%);
  --neutral-900: hsl(214, 10%, 10%);
  --neutral-950: hsl(214, 11%, 5%);
  --green-600: hsl(142, 71%, 35%);
  --red-600: hsl(0, 72%, 51%);

  /* Spacing */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px;

  /* Border Radius */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-full: 9999px;

  /* Typography */
  --font-size-sm: 0.875rem; --font-size-base: 1rem; --font-size-lg: 1.125rem;
  --font-weight-regular: 400; --font-weight-semibold: 600;

  /* Transitions & Shadows */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --duration-short: 200ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### semantic.css & dark.css (Tier 2: Purpose-Driven Aliases)
Semantic tokens define the purpose. Dark mode overrides semantic tokens while primitive scales remain constant.

```css
:root {
  /* Light Mode Semantics */
  --color-bg: var(--neutral-50);
  --color-surface: #FFFFFF;
  --color-text: var(--neutral-900);
  --color-text-secondary: var(--neutral-600);
  --color-border: var(--neutral-200);
  --color-action-primary: var(--blue-600);
  --color-action-primary-hover: var(--blue-700);
  --color-action-primary-text: #FFFFFF;
  --color-error: var(--red-600);
}

[data-theme="dark"] {
  /* Dark Mode Elevation Model (layered surfaces) */
  --color-bg: hsl(214, 14%, 8%);             /* Base background */
  --color-surface: hsl(214, 12%, 12%);       /* Card / Surface */
  --color-surface-raised: hsl(214, 11%, 16%);/* Modal / Elevated */
  
  /* Text & Border adjustments */
  --color-text: hsl(214, 15%, 94%);
  --color-text-secondary: hsl(214, 10%, 65%);
  --color-border: hsl(214, 10%, 20%);

  /* Dark mode brand adaptation: desaturate and lighten actions */
  --color-action-primary: var(--blue-400);   /* lighter shade for contrast */
  --color-action-primary-hover: var(--blue-300);
}
```

### components.css (Tier 3: Component Specific Tokens)
```css
:root {
  --btn-radius: var(--radius-md);
  --btn-padding-y: var(--space-2);
  --btn-padding-x: var(--space-4);
  --btn-font-weight: var(--font-weight-semibold);
  --btn-font-size: var(--font-size-sm);
  --btn-min-size: 44px; /* WCAG touch target */
}
```

---

## 3. Tailwind CSS & Style Dictionary Integration

### Tailwind CSS Mapping
Use CSS Custom Properties in your Tailwind config to dynamically support dark mode swapping.
```js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
        },
        border: 'var(--color-border)',
        action: 'var(--color-action-primary)',
      },
      borderRadius: {
        btn: 'var(--btn-radius)',
      },
    },
  },
}
```

### Style Dictionary (Multi-Platform Compilation)
Style Dictionary compiles single JSON sources into platform-specific configurations (Android XML, iOS Swift, CSS).
```json
{
  "color": {
    "blue": {
      "500": { "value": "hsl(214, 89%, 52%)", "type": "color" }
    },
    "action": {
      "primary": { "value": "{color.blue.500}", "type": "color" }
    }
  }
}
```

---

## 4. Figma Variables Workflow

1. **Collections**: Set up two collections: `Primitives` (raw color, space values) and `Semantic` (purpose values).
2. **Aliasing**: Map `Semantic` variables to `Primitives` variables. Never map semantic elements directly to hex values.
3. **Modes**: Define a "Light" and "Dark" mode in the `Semantic` collection.
4. **Handoff**: Use Figma Tokens Studio or Figma Variables API to export JSON tokens straight into Style Dictionary.

---

## 5. Contrast Verification & Checklist

Before shipping any color combination, run a WCAG accessibility contrast check:

| Target Component | WCAG Standard | Minimum Ratio |
|---|---|---|
| Body text on Background | AA | 4.5:1 |
| Headings / Large Text | AA | 3.0:1 |
| Interactive Icons / Borders | AA | 3.0:1 |

### Token Rules & Anti-Patterns
- **Do** use semantic tokens (`--color-action-primary`) in component styling instead of hardcoded hex or raw primitives.
- **Do** desaturate interactive brand colors by 10-15% on dark surfaces to reduce eye strain.
- **Don't** use pure black (`#000000`) or pure gray background shades without low-saturation brand hues.
- **Don't** use more than one primary CTA button color on a single viewport screen.
