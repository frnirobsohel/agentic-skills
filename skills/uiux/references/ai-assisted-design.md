# AI-Assisted Design Guide

## Overview
AI tools have fundamentally changed how UI/UX design and implementation works. This guide covers how to use the most powerful AI tools effectively for design work.

---

## 1. v0.dev (Vercel)
**What it does**: Generates production-ready React UI components from text prompts or screenshots.
**URL**: https://v0.dev
**Best for**: Rapid component generation, dashboard scaffolding, landing page sections.

### Effective Prompting for v0
```
✅ Good prompt structure:
"Create a [component type] for [product type] with [specific features].
Style: [design system/aesthetic]. Colors: [specific colors or palette].
Include: [states: loading, empty, error]. Tech: [React + Tailwind / shadcn/ui]."

Example:
"Create a pricing table for a SaaS product with 3 tiers (Free, Pro, Enterprise).
Include a monthly/annual toggle. Highlight the Pro tier. Style: modern, clean,
dark mode. Colors: indigo primary. Include hover states. Use Tailwind CSS + shadcn/ui."

❌ Bad prompt:
"Make a nice pricing page"
```

### v0 Workflow
1. Generate initial component with a detailed prompt.
2. Iterate with follow-up prompts: "Make the CTA button larger", "Add a skeleton loading state", "Make it responsive".
3. Copy the generated code and refine in your editor.
4. Never use v0 output as-is in production — always review for accessibility and token usage.

### v0 Limitations
- Does not understand your design system tokens by default — add token usage manually.
- May generate inaccessible markup (missing aria labels, wrong heading hierarchy).
- Animations may not respect prefers-reduced-motion.

---

## 2. Cursor (AI Code Editor)
**What it does**: AI-powered code editor with inline AI completion, chat, and code generation.
**URL**: https://cursor.sh
**Best for**: Refactoring existing UI, implementing designs from Figma, fixing accessibility issues.

### UI/UX Prompting in Cursor

**For component refactoring:**
```
"Refactor this button component to:
1. Use CSS custom property tokens (--color-action-primary) instead of hardcoded colors
2. Add all interaction states (hover, active, focus, disabled, loading)
3. Ensure minimum 44px height touch target
4. Add aria-label support for icon-only variant
5. Support prefers-reduced-motion"
```

**For accessibility audit:**
```
"Audit this form component for WCAG 2.2 AA compliance:
1. Check all labels are properly associated with inputs
2. Verify error messages use aria-describedby
3. Ensure focus order is logical
4. Add aria-live for dynamic error messages
5. Verify color contrast meets 4.5:1"
```

**For dark mode:**
```
"Add dark mode to this component using the [data-theme='dark'] selector.
Use the existing CSS custom property tokens from tokens/semantic.css.
Do not add new colors — use only the defined semantic tokens."
```

### Cursor Rules for UI/UX (.cursorrules)
Add to your project's `.cursorrules` file:
```
# UI/UX Rules
- Always use CSS custom property tokens for colors, not raw hex values
- Minimum touch target: 44px height for all interactive elements
- All interactive elements need hover, focus, active, and disabled states
- Form fields: always associated label, error message with aria-describedby
- Images: always include alt attribute (empty for decorative)
- Animations: always include prefers-reduced-motion media query
- Semantic HTML: buttons for actions, links for navigation — never reverse
- WCAG: all text meets 4.5:1 contrast, large text meets 3:1
```

---

## 3. Figma AI Features
**URL**: https://figma.com
**Best for**: Design generation, component renaming, content replacement, auto-layout suggestions.

### Figma AI Effective Use
- **First Draft**: Generate a layout from a prompt. Always treat as a starting point, never final.
- **Rename Layers**: Use AI to rename messy imported layers to semantic names.
- **Content Replacement**: Replace Lorem Ipsum with realistic dummy data.
- **Auto Layout**: Ask AI to apply Auto Layout to selected frames.
- **Accessibility Check**: Use Figma's built-in accessibility checker plugin.

### Figma Plugins for AI Design
| Plugin | Use |
|---|---|
| Magician | AI copy and image generation in Figma |
| Tokens Studio | Design token management + sync with codebase |
| Stark | Accessibility checker (contrast, flow, alt text) |
| A11y - Focus Orderer | Set and visualize keyboard focus order |
| Autoflow | Generate user flow diagrams |
| FramerX / Framer AI | Prototype to code with AI |

---

## 4. Claude / ChatGPT for UX Work

### Best Prompts for Design Decisions

**UX Copy Generation:**
```
"Write microcopy for a [component] in a [product type] product.
Brand voice: [adjectives: e.g., warm, direct, professional].
Situation: [user is doing X and sees Y].
Write: button label, helper text, success message, error message."
```

**Design Review:**
```
"Act as a senior UX designer. Review this UI description:
[describe the interface or paste the code]
Identify: usability issues, accessibility gaps, hierarchy problems,
missing states. Prioritize by severity (critical / high / medium / low)."
```

**Color System Generation:**
```
"Generate a complete color system in HSL for a [industry] product.
Brand color: [hex]. Required: 10-step scale, semantic tokens for
text, background, surface, border, action, and state colors.
Output as CSS custom properties."
```

**Component Specification:**
```
"Write a component specification for a [component name].
Include: purpose, variants (size, style), states (default, hover, focus,
active, disabled, error, loading), props, accessibility requirements,
and do/don't usage examples."
```

---

## 5. Midjourney / DALL-E for UI Assets

### Generating UI Mockups and Illustrations

**Dashboard mockup:**
```
Midjourney prompt:
"SaaS analytics dashboard UI, dark mode, data visualization, 
modern minimal design, glassmorphism cards, blue and purple accent colors,
professional, clean, --ar 16:9 --style raw"
```

**App illustration:**
```
"flat vector illustration, [scene description], 
[brand color] color palette, white background, 
minimal, modern, SVG style --ar 1:1 --style raw"
```

**Icon set style reference:**
```
"UI icon set, [style: outline/filled/duotone], consistent stroke weight 1.5px,
24x24 grid, minimal, professional, [color] --ar 1:1 --tile"
```

### AI Image → UI Integration Rules
- Always use AI images as placeholders during design phase, not final production assets.
- Replace AI images with properly licensed photos or illustrations before launch.
- Never use AI-generated faces in product UIs (ethical and legal risk).
- Generate AI images in the exact dimensions needed (no upscaling).

---

## 6. AI-Generated Code Quality Checklist

When using any AI tool to generate UI code, always verify:

### Accessibility (must check)
- [ ] Semantic HTML elements (button vs div, nav vs section, etc.)
- [ ] All images have alt attribute
- [ ] Form inputs have associated labels (not just placeholder)
- [ ] Error messages connected with aria-describedby
- [ ] Interactive elements have visible focus styles
- [ ] Color contrast meets 4.5:1 for all text
- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrow keys)

### Design System Consistency
- [ ] Uses token variables, not raw hex/px values
- [ ] Follows established spacing scale (multiples of 4)
- [ ] Uses defined border radius scale
- [ ] Typography uses defined font scale and weights

### Performance
- [ ] Images have explicit dimensions (prevents CLS)
- [ ] Animations use transform/opacity only
- [ ] Animations include prefers-reduced-motion
- [ ] No blocking render-critical resources

### Responsive
- [ ] Mobile-first media queries
- [ ] No fixed px widths that break on mobile
- [ ] Touch targets minimum 44px

---

## 7. Prompt Engineering Patterns for UI/UX

### The SPEC Pattern
```
S — Situation: What context is the user in?
P — Product: What kind of product is it?
E — Elements: What specific elements are needed?
C — Constraints: Style, tech stack, accessibility requirements.
```

Example:
```
S: A user is filling out a checkout form and has just submitted with errors.
P: E-commerce marketplace (fashion vertical, mid-market brand).
E: Form validation states — inline errors, field highlight, summary message.
C: Warm, brand-aligned style. React + CSS modules. WCAG AA. No libraries.
```

### The BEFORE/AFTER Pattern
```
"Here is my current [component/design]:
[paste code or describe design]

Problems: [list known issues]

Improve it to:
1. [specific improvement]
2. [specific improvement]
3. [specific improvement]

Constraints: [keep the same tech stack, maintain existing class names, etc.]"
```

### The AUDIT Pattern
```
"Conduct a [accessibility / UX / performance / design system] audit
of the following [component / page / flow]:

[paste code or describe design]

Output format:
- Issue: [description]
- Severity: [critical / high / medium / low]
- WCAG Reference: [if applicable]
- Fix: [specific recommendation]"
```
