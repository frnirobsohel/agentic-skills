# High-Authority Online Resources — UI/UX Reference

> **Context budget:** Reference library only. Do NOT auto-load during design or coding tasks.

This file contains the most authoritative online sources for UI/UX design.
These are the sources cited by designers, researchers, and engineers at Google, Apple, Meta, and Airbnb.

---

## 1. Nielsen Norman Group (nngroup.com)
**Authority**: #1 UX research organization worldwide. Founded by Jakob Nielsen and Don Norman.
**URL**: https://www.nngroup.com
**Use for**: Evidence-based UX research, usability studies, enterprise UX, accessibility.

### Must-Read Articles
- 10 Usability Heuristics: https://www.nngroup.com/articles/ten-usability-heuristics/
- F-Pattern Reading: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- How Users Read on the Web: https://www.nngroup.com/articles/how-users-read-on-the-web/
- Modal vs Non-Modal Dialogs: https://www.nngroup.com/articles/modal-nonmodal-dialog/
- Accordion on Desktop: https://www.nngroup.com/articles/accordions-complex-content/
- Hamburger Menu Usability: https://www.nngroup.com/articles/hamburger-menus/
- Progressive Disclosure: https://www.nngroup.com/articles/progressive-disclosure/
- Error Message Guidelines: https://www.nngroup.com/articles/error-message-guidelines/
- Mobile UX: https://www.nngroup.com/reports/mobile-website-and-application-usability/

### Key NNg Findings (Evidence-Based Rules)
- Users read only 20-28% of words on a web page on an average visit.
- F-pattern scanning: users read the first few lines fully, then skim the left edge.
- 5 users reveal 85% of usability problems in qualitative testing.
- Error messages: 4 rules — visible, use plain language, precise (not vague), constructive (what to do next).
- Navigation: "You are here" indicators reduce navigation errors by 50%.
- 1 primary CTA per page performs better than multiple competing CTAs.

---

## 2. Apple Human Interface Guidelines (HIG)
**Authority**: The design system for all Apple platforms (iOS, macOS, watchOS, visionOS).
**URL**: https://developer.apple.com/design/human-interface-guidelines/
**Use for**: iOS app design, macOS app design, native interactions, Apple design patterns.

### Key Principles from Apple HIG
- **Clarity**: Text must be legible at every size. Icons must be precise and clear. Adornments are appropriate and purposeful.
- **Deference**: The UI helps people understand and interact with content without competing with it.
- **Depth**: Visual layers and realistic motion convey hierarchy, impart vitality, and facilitate understanding.
- **Consistency**: Implement familiar standards and paradigms by using system-provided elements.
- **Direct manipulation**: People expect to directly interact with objects on screen.
- **Feedback**: Every interaction must have acknowledgement. Never leave users wondering if their action worked.
- **Metaphors**: Use established real-world metaphors (trash, clipboard, desktop) to flatten learning curves.
- Touch targets: Minimum 44×44 points on iOS.
- Gestures: Swipe back, pull-to-refresh, and long-press are platform standards — never override or conflict.
- Bottom sheet: Use for contextual options without fully navigating away.
- Tab bar: Maximum 5 items. Always icon + label. Never use for less than 2 items.

---

## 3. Material Design 3 (Google)
**Authority**: Google's open-source design system used in Android, Google apps, and web products.
**URL**: https://m3.material.io
**Use for**: Android app design, Google-ecosystem products, component patterns, motion system.

### Key Material Design 3 Principles
- **Dynamic Color**: Use device wallpaper to generate a harmonious 5-tone color scheme (primary, secondary, tertiary, error, neutral).
- **Expressiveness**: M3 embraces personality and brand expression, not just functional neutrality.
- **Adaptive layouts**: Canonical layouts for compact (phone), medium (tablet), expanded (desktop).
- **Elevation model**: Uses tonal overlay (not shadow alone) to express elevation in dark mode.
- Touch target: Minimum 48×48dp, with 8dp between targets.
- Typography scale: Display, Headline, Title, Body, Label — each with Large/Medium/Small variants.
- State layers: Hover (8% overlay), pressed (12%), focused (12%), dragged (16%) — applied as a tonal overlay.
- Spacing: 4dp incremental grid for all spacing values.
- Motion: Emphasis curves, standard curves, deceleration curves, acceleration curves — each for specific state transitions.

---

## 4. Baymard Institute (baymard.com)
**Authority**: The world's largest independent e-commerce UX research body. 50,000+ hours of research.
**URL**: https://baymard.com
**Use for**: E-commerce UX, checkout optimization, form design, search UX, product pages.

### Key Baymard Research Findings
- **69.99%** average cart abandonment rate across e-commerce.
- **Account creation** is the #1 reason users abandon checkout. Always offer guest checkout.
- **Inline validation** on checkout forms reduces errors by 22%.
- **Payment form**: Show the credit card type icon live as the user types the card number.
- **Address autocomplete** reduces checkout time by 20%.
- **Breadcrumb navigation** increases page-view depth by 10% in product catalogs.
- **Filters**: "In-page" filters (applied immediately) outperform "Apply" button filters.
- **Product images**: Users need 3-5 images from different angles minimum. 360° view increases conversion.
- **Search**: 72% of e-commerce sites fail at basic search — synonyms, plurals, and misspellings.
- **Mobile checkout**: 3 fields per screen maximum. Anything more increases abandonment.
- Free research: https://baymard.com/free

---

## 5. web.dev (Google Chrome Team)
**Authority**: Google's authoritative resource on web performance, accessibility, and modern web APIs.
**URL**: https://web.dev
**Use for**: Core Web Vitals, performance optimization, accessibility audits, Progressive Web Apps.

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5 seconds = Good. 2.5-4s = Needs Improvement. > 4s = Poor.
- **INP (Interaction to Next Paint)**: < 200ms = Good. 200-500ms = Needs Improvement. > 500ms = Poor.
- **CLS (Cumulative Layout Shift)**: < 0.1 = Good. 0.1-0.25 = Needs Improvement. > 0.25 = Poor.

### Performance Rules from web.dev
- Images should use WebP or AVIF. Declare explicit width/height.
- Use font-display: swap or optional to prevent FOIT.
- Lazy load below-the-fold images with loading="lazy".
- Use Content Security Policy headers.
- Preload critical resources (LCP image, primary font).
- Code-split by route to reduce initial bundle size.
- Use the Image component (Next.js) or <picture> for responsive images.

---

## 6. Inclusive Components (inclusive-components.design)
**Authority**: Heydon Pickering's authoritative guide to accessible component patterns.
**URL**: https://inclusive-components.design
**Use for**: Accessibility patterns for specific components (toggles, menus, tabs, cards, notifications).

### Key Accessible Component Patterns
- **Buttons vs Links**: Buttons = actions (submit, open modal). Links = navigation (go to page). Never reverse them.
- **Toggle switches**: Must have a visible label. State must be announced by screen readers ("Dark mode: on").
- **Tooltips**: Must be triggerable by keyboard focus, not just hover. Must not disappear when the cursor moves to the tooltip itself.
- **Menus**: Use aria-haspopup="true", aria-expanded, and arrow key navigation within the menu.
- **Tabs**: aria-role="tablist", aria-selected, keyboard navigation with arrow keys between tabs.
- **Notifications / Alerts**: Use aria-live="polite" for non-critical updates, aria-live="assertive" for critical alerts.
- **Cards**: The clickable card pattern: wrap the heading in a link and use CSS to extend the click area over the whole card — never wrap the entire card in an <a> tag.
- **Data Tables**: Always use <th> with scope attribute. Provide a caption. Consider sortable column headers with aria-sort.

---

## 7. Smashing Magazine (smashingmagazine.com)
**Authority**: The most-read independent design and development publication.
**URL**: https://www.smashingmagazine.com
**Use for**: Practical UI patterns, CSS techniques, UX case studies, accessibility.

### Most Referenced Articles
- CSS Grid Layout: https://www.smashingmagazine.com/2020/01/understanding-css-grid-container/
- Form Design Patterns (Adam Silver): https://www.smashingmagazine.com/2018/08/ux-html5-mobile-form-part-1/
- Designing for Accessibility: https://www.smashingmagazine.com/category/accessibility/
- Mobile UX Design: https://www.smashingmagazine.com/2017/03/ux-design-for-mobile/
- Inclusive Design Patterns (Heydon Pickering): https://www.smashingmagazine.com/2016/10/inclusive-design-patterns/

---

## 8. Laws of UX (lawsofux.com)
**Authority**: Jon Yablonski's curated collection of psychological principles for interface design.
**URL**: https://lawsofux.com
**Use for**: Justifying design decisions with behavioral psychology research.

See `books.md` §4 for the complete list of laws and their design applications.

---

## 9. A List Apart (alistapart.com)
**Authority**: The original web design publication. Influential since 1997. Authors include Eric Meyer, Jeffrey Zeldman, and Jeremy Keith.
**URL**: https://alistapart.com
**Use for**: CSS architecture, content strategy, web standards, progressive enhancement.

### Key Articles
- Responsive Web Design (Ethan Marcotte, coined the term): https://alistapart.com/article/responsive-web-design/
- The Dao of Web Design: https://alistapart.com/article/dao/
- CSS Architecture: https://alistapart.com/article/css-architectures-refactor-your-css/

---

## 10. UX Collective (uxdesign.cc)
**Authority**: The largest independent UX publication on Medium. Curated by Fabricio Teixeira.
**URL**: https://uxdesign.cc
**Use for**: Contemporary UX practice, case studies, design system articles, career insights.

### Most Referenced Pieces
- The Ultimate Guide to Proper Use of Animation in UX: https://uxdesign.cc/the-ultimate-guide-to-proper-use-of-animation-in-ux-10bd98614fa9
- Empty States — the most overlooked aspect of UX: https://uxdesign.cc/empty-states-the-most-overlooked-aspect-of-ux-design-bdfced3e78a6
- Design System Article Series: https://uxdesign.cc/design-systems/home

---

## 11. Nielsen's 10 Usability Heuristics (Full Reference)
**Source**: Jakob Nielsen, Nielsen Norman Group, 1994 (updated 2020)
**URL**: https://www.nngroup.com/articles/ten-usability-heuristics/

| # | Heuristic | Application |
|---|---|---|
| 1 | Visibility of system status | Loading states, progress bars, active states, notifications |
| 2 | Match between system and real world | Plain language, real-world metaphors, user vocabulary |
| 3 | User control and freedom | Undo, redo, cancel, back, escape routes from every flow |
| 4 | Consistency and standards | Same terminology, same component behavior, same navigation everywhere |
| 5 | Error prevention | Confirmation dialogs, disabled states, input constraints, clear affordances |
| 6 | Recognition rather than recall | Show options, don't require memorization. Labels on icons. History. |
| 7 | Flexibility and efficiency of use | Keyboard shortcuts, bulk actions, saved searches, defaults |
| 8 | Aesthetic and minimalist design | Remove everything that doesn't support the primary goal |
| 9 | Help users recognize/diagnose/recover from errors | Plain language errors, specific cause, constructive solution |
| 10 | Help and documentation | Contextual help, tooltips, onboarding, searchable docs |

**Severity Rating Scale** (for heuristic evaluation):
- 0 = Not a usability problem
- 1 = Cosmetic — fix if time allows
- 2 = Minor — low priority
- 3 = Major — high priority to fix
- 4 = Usability catastrophe — must fix before launch

---

## 12. WCAG 2.2 Quick Reference
**Authority**: W3C Web Content Accessibility Guidelines. Legal requirement in many countries.
**URL**: https://www.w3.org/WAI/WCAG22/quickref/

### Level AA Requirements (Minimum for production)
- Color contrast: 4.5:1 for normal text, 3:1 for large text (>18px regular or >14px bold) and UI components.
- Keyboard accessible: All interactive elements must be keyboard-reachable and operable.
- Focus visible: Keyboard focus must be visible (2.4.11 — enhanced focus visible in WCAG 2.2).
- No keyboard trap: Users must be able to move focus out of any component.
- Error identification: Input errors must be clearly identified and described in text.
- Labels or instructions: Form inputs must have visible labels.
- Parsing: No duplicate IDs, no broken HTML structure.
- Resize text: Content must remain readable and operable at 200% browser zoom without loss of content.
- No timing restrictions: Content that times out must be adjustable or warn before expiring.
- user-scalable=no is a WCAG violation. Never use it.

---

## How to Use These References

When making a design decision, cite the source:
- "Users scan, not read — structure content for scanning (Krug, Don't Make Me Think)"
- "Bottom navigation max 5 items — recognition over recall (Apple HIG)"
- "Inline validation on blur, not keystroke (Baymard Institute research)"
- "Variable rewards increase engagement (Nir Eyal, Hooked)"
- "Exit animation should be 60-70% of enter duration (Material Design Motion)"

This grounds design decisions in evidence, not preference.
