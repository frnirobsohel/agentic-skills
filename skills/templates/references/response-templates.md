# Response Format Templates

## When to Use These Templates

When responding to a UI/UX task, use the appropriate structured output template below.
These templates ensure consistency, completeness, and actionability in every response.

---

## Template 1: UI Review / Audit Report

Use when reviewing an existing interface for usability, accessibility, or visual quality.

```markdown
# UI Review: [Component/Page Name]

## Summary
- **Product**: [Product name and type]
- **Screen reviewed**: [Page or component]
- **Review scope**: [Usability | Accessibility | Visual | All]

## Findings

### 🔴 Critical (Must Fix Before Launch)
1. **[Issue title]**
   - Where: [exact location]
   - Problem: [what's wrong and why it matters]
   - Impact: [who is affected and how]
   - Fix: [specific actionable solution]
   - Reference: [cite book, heuristic, or standard]

### 🟠 High (Fix Soon)
1. **[Issue title]**
   - Where: ...
   - Problem: ...
   - Fix: ...

### 🟡 Medium (Improvement)
1. **[Issue title]**
   - Where: ...
   - Problem: ...
   - Fix: ...

### 🟢 Low (Polish)
1. **[Issue title]**
   - Where: ...
   - Fix: ...

## What's Working Well ✅
- [Pattern or element that is correctly implemented]

## Recommended Next Steps
1. [First priority action]
2. [Second priority action]
3. [Third priority action]
```

---

## Template 2: Component Specification

Use when defining a new component for a design system.

```markdown
# Component Spec: [Component Name]

## Purpose
[One sentence: what this component does and when to use it.]

## Variants

| Variant | Description | Use Case |
|---|---|---|
| Primary | [description] | [when to use] |
| Secondary | [description] | [when to use] |
| Ghost | [description] | [when to use] |
| Destructive | [description] | [when to use] |

## Sizes

| Size | Height | Font Size | Padding | Use Case |
|---|---|---|---|---|
| sm | 32px | 14px | 8px 12px | Dense UIs, tables |
| md | 40px | 14px | 10px 16px | Default |
| lg | 48px | 16px | 12px 20px | Hero CTAs, mobile primary |

## States

| State | Visual Change | Trigger |
|---|---|---|
| Default | [describe] | Resting |
| Hover | [describe] | Mouse over (desktop) |
| Active/Pressed | [describe] | Mouse down / tap |
| Focus | [describe, include focus ring spec] | Keyboard Tab |
| Disabled | opacity 0.5, cursor not-allowed | [condition] |
| Loading | spinner + disabled, label hidden or changed | Async action |
| Error | [describe] | Validation failure |
| Success | [describe] | Completed action |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | 'primary' | 'secondary' | 'ghost' | 'destructive' | 'primary' | Visual variant |
| size | 'sm' | 'md' | 'lg' | 'md' | Component size |
| disabled | boolean | false | Disable interaction |
| loading | boolean | false | Show loading state |
| icon | ReactNode | undefined | Icon element (left position) |
| onClick | () => void | undefined | Click handler |

## Accessibility Requirements
- [ ] Role: `button` (native `<button>` element preferred)
- [ ] Keyboard: Enter and Space activate the button
- [ ] Focus: visible focus ring (2px solid, offset 2px)
- [ ] Disabled: `aria-disabled="true"` (not just `disabled` attribute)
- [ ] Loading: `aria-busy="true"`, announce "Loading" to screen reader
- [ ] Icon-only: requires `aria-label` with descriptive text
- [ ] Destructive: consider `aria-label` clarifying the destructive action

## Design Tokens Used

| Property | Token | Value |
|---|---|---|
| Background | --color-action-primary | blue-600 |
| Text | --color-action-primary-text | #FFFFFF |
| Border radius | --btn-radius | 8px |
| Padding | --btn-padding-x / --btn-padding-y | 16px / 10px |
| Font weight | --font-weight-semibold | 600 |
| Transition | --duration-short | 200ms |
| Min height | --btn-min-size | 44px (touch target) |

## Usage Guidelines

### ✅ Do
- Use primary variant for the single most important action on the page.
- Use descriptive, action-oriented labels ("Save changes", "Delete project").
- Use loading state during async operations.

### ❌ Don't
- Don't use more than one primary button per section.
- Don't use vague labels ("OK", "Yes", "Submit").
- Don't disable without explaining why (use tooltip on disabled state).
- Don't use a button when a link is more appropriate (navigation = link, action = button).
```

---

## Template 3: Design System Audit

Use when auditing an existing design system for completeness, consistency, and quality.

```markdown
# Design System Audit: [System Name]

## Audit Date: [YYYY-MM-DD]
## Audited by: [Name/AI]

## Token Coverage

| Category | Defined | Missing |
|---|---|---|
| Color primitives | ✅ 50-950 scale | ❌ Missing amber scale |
| Semantic color tokens | ✅ Light mode | ❌ No dark mode tokens |
| Typography scale | ✅ 9 sizes | ❌ Missing display sizes |
| Spacing scale | ✅ 4px grid | ✅ Complete |
| Border radius | ✅ 5 values | ✅ Complete |
| Shadows | ⚠️ 3 values | ❌ Missing dark mode shadows |
| Z-index | ❌ Not defined | ❌ Arbitrary values in code |
| Motion | ❌ No duration tokens | ❌ No easing tokens |

## Component Coverage

| Component | Exists | All States | Responsive | A11y | Documented |
|---|---|---|---|---|---|
| Button | ✅ | ✅ | ✅ | ⚠️ Missing focus | ❌ No docs |
| Input | ✅ | ⚠️ No loading | ✅ | ❌ No label assoc. | ❌ |
| Card | ✅ | ❌ No skeleton | ⚠️ | ✅ | ❌ |
| Modal | ✅ | ✅ | ❌ | ❌ No focus trap | ❌ |
| Toast | ❌ | — | — | — | — |
| Tooltip | ❌ | — | — | — | — |
| ...  | ... | ... | ... | ... | ... |

## Top Priority Issues
1. [Highest impact issue with fix recommendation]
2. [Second highest issue]
3. [Third issue]

## Recommendations
- Immediate: [what to fix this sprint]
- Short-term: [next 2-4 weeks]
- Long-term: [quarter roadmap]
```

---

## Template 4: Competitive UX Analysis

Use when analyzing competitors to benchmark and identify opportunities.

```markdown
# Competitive UX Analysis: [Product Category]

## Competitors Analyzed
| # | Competitor | URL | Target Market |
|---|---|---|---|
| 1 | [Name] | [url] | [market] |
| 2 | [Name] | [url] | [market] |
| 3 | [Name] | [url] | [market] |

## Feature Comparison Matrix

| Feature | Our Product | Competitor 1 | Competitor 2 | Competitor 3 |
|---|---|---|---|---|
| [Feature 1] | ✅/❌/⚠️ | ✅/❌/⚠️ | ✅/❌/⚠️ | ✅/❌/⚠️ |
| [Feature 2] | ... | ... | ... | ... |

## UX Quality Comparison

| Dimension | Our Product | Competitor 1 | Competitor 2 | Winner |
|---|---|---|---|---|
| Onboarding (TTFV) | [time] | [time] | [time] | [who] |
| Navigation clarity | [score 1-5] | [score] | [score] | [who] |
| Visual hierarchy | [score 1-5] | [score] | [score] | [who] |
| Mobile experience | [score 1-5] | [score] | [score] | [who] |
| Accessibility | [score 1-5] | [score] | [score] | [who] |
| Performance (LCP) | [time] | [time] | [time] | [who] |

## Key Insights
1. **Pattern we should adopt**: [what competitors do better and why]
2. **Our unique advantage**: [what we do that no competitor matches]
3. **Market gap**: [unmet user need no competitor addresses]

## Recommendations
1. [Specific action to take based on analysis]
2. [Second action]
3. [Third action]
```

---

## Template 5: Page/Flow Design Brief

Use when starting a new page or flow design from scratch.

```markdown
# Design Brief: [Page/Flow Name]

## Context
- **Product**: [Product name]
- **User**: [Primary user persona]
- **Goal**: [What the user wants to accomplish]
- **Business goal**: [What the business wants from this page]
- **Success metric**: [How we measure success — e.g., conversion rate, task completion time]

## User Journey Position
- **Previous step**: [Where the user came from]
- **Current step**: [This page/flow]
- **Next step**: [Where the user goes after success]
- **Error path**: [Where the user goes if something fails]

## Content Priority (Information Hierarchy)
1. [Most important content/action — visible above the fold]
2. [Second priority]
3. [Third priority]
4. [Supporting content]

## Layout Proposal
[Describe the proposed layout structure]
- Header: [what it contains]
- Hero/Primary area: [primary content and CTA]
- Secondary area: [supporting content]
- Footer: [footer content]

## Component Requirements
| Component | Variant | Notes |
|---|---|---|
| [e.g., Hero] | [variant] | [specific requirements] |
| [e.g., Form] | [variant] | [field count, validation rules] |
| [e.g., CTA] | [variant] | [label, destination] |

## States to Design
- [ ] Default (populated)
- [ ] Empty state (first-time / no data)
- [ ] Loading state (skeleton)
- [ ] Error state (api failure)
- [ ] Success state (action completed)
- [ ] Mobile layout
- [ ] Dark mode (if applicable)

## Constraints
- Tech stack: [React, Next.js, etc.]
- Design system: [which tokens/components to use]
- Accessibility: [WCAG AA minimum]
- Performance: [LCP target]

## References
- [Link to similar page in competitor product]
- [Link to relevant design pattern]
- [Link to user research insight]
```

---

## Template 6: UX Copy Sheet

Use when writing all copy for a page or flow in one structured document.

```markdown
# UX Copy: [Page/Flow Name]

## Page Title
**H1**: [Page heading]
**Meta description**: [SEO description, 150-160 chars]

## Navigation Labels
| Item | Label | Notes |
|---|---|---|
| [nav item] | [label] | [if different from page title, explain why] |

## Primary Content
| Element | Copy | Notes |
|---|---|---|
| Heading | [text] | [tone, emphasis] |
| Subheading | [text] | |
| Body | [text] | |
| CTA (primary) | [button label] | [action-oriented verb] |
| CTA (secondary) | [button label] | |

## Form Labels
| Field | Label | Placeholder | Helper Text | Error Message |
|---|---|---|---|---|
| Email | Email address | john@example.com | We'll never share your email | Enter a valid email address |
| Password | Password | — | At least 8 characters | Password must be at least 8 characters |

## States
| State | Heading | Body | CTA |
|---|---|---|---|
| Empty | [text] | [text] | [button label] |
| Loading | — | — | — |
| Error | [text] | [text] | [button label] |
| Success | [text] | [text] | [button label] |

## Tooltip / Help Text
| Trigger | Copy |
|---|---|
| [element] | [tooltip text — max 1 sentence] |

## Brand Voice Check
- [ ] Tone matches brand voice: [e.g., confident, clear, warm]
- [ ] No jargon or technical terms for non-technical users
- [ ] Action verbs on all buttons
- [ ] Sentence case throughout
- [ ] No "click here" or "learn more" without context
```
