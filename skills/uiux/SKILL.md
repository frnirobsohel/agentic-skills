---
name: uiux-agentic-skills
description: >-
  Designs, audits, and improves production UI/UX for websites, dashboards, SaaS, and mobile apps.
  Use when the user mentions ui, ux, redesign, dashboard, accessibility, landing page, dark mode,
  spacing, color system, typography, figma, design tokens, forms, or navigation.
version: 1.0.0
metadata:
  category: UI/UX
  priority: High
triggers:
  keywords:
    - ui
    - ux
    - redesign
    - dashboard
    - website
    - landing page
    - mobile app
    - accessibility
    - design system
    - design tokens
    - improve ui
    - brand
    - color system
    - typography
    - touch ux
    - empty state
    - dark mode
    - spacing
    - theme
    - figma
    - component library
    - usability
    - forms
    - navigation
    - audit report
    - ui review
    - component spec
    - component specification
    - design brief
    - copy sheet
---

# UI/UX Production Playbook

## Mission
Always think like a senior product designer, UX strategist, design system architect, and frontend experience specialist. Never optimize only for aesthetics. Optimize for user success, business goals, brand trust, accessibility, performance, scalability, simplicity, consistency, conversion, and maintainability.

## Priority Table

| Priority | Category | Impact | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|----------|----------|--------|------------------------|------------------------|
| 1 | Visual & Functional Accessibility (Design-time) | CRITICAL | Contrast 4.5:1, Alt text reqs, Focus indicator visual designs | Removing focus rings from design files, low contrast text |
| 2 | Touch & Interaction | CRITICAL | Min 44×44pt (iOS) / 48×48dp (Android) | Hover-only interactions |
| 3 | Performance | HIGH | WebP/AVIF images, Lazy loading, CLS < 0.1 | Layout thrashing |
| 4 | Style & Brand | HIGH | Consistency, SVG icons, Dark mode variant | Emoji as icons |
| 5 | Layout & Responsive | HIGH | Mobile-first breakpoints, 4px/8dp scale | Fixed px widths |
| 6 | Typography & Color | MEDIUM | Base 16px body, Semantic color tokens | Gray-on-gray, Text < 12px |

---

## Modular Reference Files (CRITICAL: READ THESE)

Load **only** the files needed for the current task. Do NOT load all references.

### Core (pick 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/layout-spacing.md` | Breakpoints, padding, responsive layout, z-index |
| `references/colors-typography.md` | **Default for color/type rules** — contrast, tokens, dark mode, font scale |
| `references/interaction-motion.md` | Touch targets, loading states, animations |
| `references/forms-navigation.md` | Forms, errors, search, sidebars, onboarding |
| `references/process-audits.md` | UI reviews, heuristic evals, accessibility audits |
| `templates/ui-review-report.md.template` | Conducting formal UI/UX reviews and heuristic audits |
| `templates/component-spec.md.template` | Defining variant and accessibility specs for design system components |
| `templates/design-brief.md.template` | Creating page/flow UX design briefs |

### Extended (load only when task explicitly needs it)

| File | Load when | Skip when |
| :--- | :--- | :--- |
| `references/design-tokens.md` | Color palette generation (HSL scale) and design token architecture (primitives → semantic) | Quick CSS variable tweaks |
| `references/typography-pairing.md` | Choosing font pairs for a new brand | Adjusting existing type scale |
| `references/figma-practices.md` | Figma workflow, components, handoff | Pure code/CSS tasks |
| `references/uiux-toolkit.md` | Tool/library recommendations needed | Implementation tasks |
| `references/competitive-analysis.md` | Competitor UX teardown requested | — |
| `references/industry-ux.md` | Vertical-specific patterns (SaaS, e-commerce) | — |
| `references/ai-assisted-design.md` | AI design tool workflows | — |

### Never auto-load (reference library only)

`references/books.md`, `references/online-resources.md` — learning catalogs; load only if user asks for study resources.

Full index: `references/README.md`

---

## Pre-Flight Checklist
- [ ] Have you loaded the correct `references/*.md` file for this task?
- [ ] Is the contrast ratio at least 4.5:1 for text?
- [ ] Are touch targets at least 44x44pt on mobile?
- [ ] Are states (hover, focus, disabled, loading) accounted for?
- [ ] Is there a clear, single primary action on the screen?
