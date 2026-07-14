# Figma Best Practices

## File and Project Organization

### File Naming Convention
```
[Product]_[Feature/Page]_[Version]
Examples:
  EJP_Dashboard_v2
  EJP_AuthFlow_v1
  EJP_DesignSystem_v3
```

### Page Naming in Figma File
```
📐 Cover                  ← Thumbnail and metadata
🧱 Components             ← All reusable components
🎨 Tokens / Variables     ← Color, type, spacing tokens
📱 Mobile Designs         ← Mobile-first designs
💻 Desktop Designs        ← Desktop designs
🔄 Flows / Prototypes     ← User flow diagrams
📝 Specs / Handoff        ← Developer specs
🗑 Archive                ← Old versions (don't delete)
```

### Layer Naming Rules
- Use descriptive, semantic names — never "Frame 234" or "Group 12".
- Pattern: `[type]/[variant]` — e.g., `btn/primary`, `card/product`, `icon/search`.
- Group related layers with clear hierarchy.
- Name every frame, even if it's temporary — unnamed frames cause chaos.

---

## Auto Layout Mastery

### When to Use Auto Layout
- **Always.** Every single frame should be Auto Layout unless it's a complex illustration.
- Auto Layout = responsive by default. Fixed frames = broken at every other screen size.

### Auto Layout Rules
- **Padding**: Use the 4px grid. Padding values must be multiples of 4 (8, 12, 16, 24, 32, etc.).
- **Gap**: Use consistent gap values from your spacing scale. Never use arbitrary pixel values.
- **Fill container**: For elements that should stretch to parent width.
- **Hug contents**: For elements that should shrink to fit their content.
- **Fixed width**: Only for specific dimension requirements (icons, avatars, badges).

### Nesting Auto Layout
```
Page Frame (Auto Layout: Vertical, Gap: 48)
├── Header (Auto Layout: Horizontal, Gap: 16, Padding: 16 24)
│   ├── Logo (Fixed: 120×32)
│   ├── Nav (Auto Layout: Horizontal, Gap: 24, Fill)
│   └── Actions (Auto Layout: Horizontal, Gap: 8)
├── Hero Section (Auto Layout: Vertical, Gap: 24, Padding: 64 24)
│   ├── Heading (Fill Container)
│   ├── Subheading (Fill Container, max-width: 640)
│   └── CTA Group (Auto Layout: Horizontal, Gap: 12)
└── Content Section (Auto Layout: Vertical, Gap: 32)
```

### Auto Layout Tips
- Use **Absolute Position** sparingly — only for overlays, badges, and floating elements.
- Set **min-width** and **max-width** constraints for responsive text containers.
- Use **Wrap** for grids and tag clouds.
- Align items to **Packed** (default) for centered layouts; **Space between** for justified layouts.

---

## Component Architecture

### Component Naming Convention
Use `/` to create a category hierarchy:
```
Button/Primary/Default
Button/Primary/Hover
Button/Primary/Disabled
Button/Secondary/Default
Input/Text/Default
Input/Text/Focus
Input/Text/Error
Card/Product/Default
Card/Product/Loading (Skeleton)
Icon/Navigation/Home
Icon/Navigation/Search
```

### Component Properties
Every component should expose:
- **Variant** (Style): Primary, Secondary, Ghost, Outline, Destructive.
- **Size**: sm, md, lg.
- **State**: Default, Hover, Active, Focus, Disabled, Loading, Error, Success.
- **Boolean properties**: showIcon, showBadge, isLoading.
- **Text properties**: label, placeholder, helperText.
- **Instance swap**: iconLeft, iconRight (swap any icon).

### Component States Checklist
Every interactive component must have these states designed:
- [ ] Default — resting state
- [ ] Hover — cursor over (desktop)
- [ ] Active / Pressed — mouse down or tap
- [ ] Focus — keyboard focus ring (critical for accessibility)
- [ ] Disabled — cannot interact (reduced opacity 0.38-0.5)
- [ ] Loading — in progress (spinner or skeleton)
- [ ] Error — validation error (red border + message)
- [ ] Success — action completed (green border + message)
- [ ] Read-only — can see but not edit
- [ ] Selected — chosen item in a group
- [ ] Empty — no content yet

### Detach Prevention
- Never detach a component to make a one-off change. Override properties instead.
- If you need a variation not supported by properties, add a new variant to the source component.
- Mark components that should NOT be detached with a "🔒" prefix in the name.

---

## Variables and Tokens in Figma

### Variable Collections Setup
```
Collection: Primitives
├── Colors: blue-50 through blue-950, neutral-50 through neutral-950, ...
├── Spacing: space-1 (4), space-2 (8), space-3 (12), space-4 (16), ...
├── Radius: radius-sm (4), radius-md (8), radius-lg (12), ...
└── Typography: size-xs (12), size-sm (14), size-base (16), ...

Collection: Semantic (references Primitives)
├── Mode: Light
│   ├── bg/primary → neutral-50
│   ├── text/primary → neutral-900
│   ├── text/secondary → neutral-600
│   ├── action/primary → blue-600
│   ├── border/default → neutral-200
│   └── ...
└── Mode: Dark
    ├── bg/primary → #0F0F12
    ├── text/primary → neutral-100
    ├── action/primary → blue-400
    └── ...
```

### How to Apply Variables
- Apply color variables to fills, strokes, and text.
- Apply spacing variables to Auto Layout padding and gap.
- Apply radius variables to corner radius.
- NEVER use raw hex values in any design — always bind to a variable.

### Mode Switching
- Semantic collection should have "Light" and "Dark" modes.
- Apply mode at the **Frame** level — click a frame, change mode in the Variables panel.
- This instantly previews the design in dark mode without duplicating screens.

---

## Prototyping Best Practices

### Interaction Design
- Use **Smart Animate** for state transitions within a component (e.g., button default → hover).
- Use **Dissolve** for page transitions (300ms, ease in-out).
- Use **Slide In / Slide Out** for navigation direction (left for forward, right for back).
- Use **Overlay** for modals, bottom sheets, and dropdowns — position from center or bottom.

### Prototype Flow Rules
- Every screen should have a way to go back (back button, close icon, swipe).
- Dead ends are prototype failures — ensure every path has a next step.
- Add a "Reset" flow to return to the start for usability testing.
- Include loading states between transitions for realistic feel.

### Usability Test Prototype
- Use realistic content — never "Lorem ipsum" in a prototype being tested.
- Include error paths — not just the happy path.
- Build the minimum needed for the test scenario — don't prototype the entire app.

---

## Handoff to Developers

### Handoff Checklist
- [ ] All screens in pixel-perfect final state (no "WIP" screens in handoff).
- [ ] All component states designed (default, hover, focus, disabled, loading, error).
- [ ] Responsive variants shown (mobile, tablet, desktop at minimum).
- [ ] All spacing uses variables / tokens from the defined scale.
- [ ] All colors use variables / tokens.
- [ ] Edge cases noted (empty states, max characters, very long names, single item, many items).
- [ ] Interaction annotations: what happens on click, hover, swipe, keyboard nav.
- [ ] Animation specs: duration, easing, property.
- [ ] Accessibility notes: heading hierarchy, alt text descriptions, keyboard flow.
- [ ] Figma Dev Mode enabled for the section being handed off.

### Annotation Format
Add annotations as sticky notes or text blocks next to screens:
```
📝 Behavior: On submit, show inline validation.
   Error appears below each field on blur.
   On success, redirect to /dashboard with a toast.

⌨️ Keyboard: Tab order = email → password → remember → submit.
   Enter key submits form from any field.

♿ A11y: Form uses <fieldset> + <legend>.
   Error messages use aria-describedby.
   Focus moves to first errored field on submit failure.

📏 Breakpoints: 
   Mobile (<768): single column, full-width inputs.
   Desktop (≥768): centered card, max-w-md.
```

---

## Version Control in Figma

### Branching (Figma Organization/Enterprise)
- Create a branch for each feature or redesign.
- Name branches: `feature/checkout-redesign`, `fix/dark-mode-contrast`.
- Review branches in a design review before merging.
- Delete merged branches to keep the file clean.

### Manual Versioning (Free/Pro)
- Save named versions at milestones: "v1 — Initial design", "v2 — After user testing".
- Archive old designs in the 🗑 Archive page — don't delete them.
- Add a changelog on the Cover page noting what changed in each version.

---

## Figma Plugin Essentials

| Plugin | Purpose |
|---|---|
| Tokens Studio | Design tokens management, sync with codebase |
| Stark | Accessibility: contrast, focus order, alt text |
| Unsplash | Free stock photos directly in Figma |
| Content Reel | Realistic dummy data (names, emails, avatars) |
| Iconify | Access 100,000+ icons from any set |
| Autoflow | Generate user flow diagrams |
| A11y - Focus Orderer | Set and visualize keyboard focus order |
| Remove BG | Remove image backgrounds |
| Figma to Code | Generate CSS, Tailwind, or React from designs |
| Design Lint | Catch inconsistent styles and detached components |
