# Typography Pairing Guide

## Principles of Font Pairing

1. **Contrast, not conflict**: Pair fonts that are clearly different — not similar enough to look like a mistake.
2. **One expressive + one neutral**: One font carries personality; the other carries readability.
3. **Shared proportions**: Fonts that share similar x-height and proportions look harmonious together.
4. **Maximum 3 typefaces**: 1 display/heading + 1 body + 1 mono (for code). Any more creates visual noise.
5. **Test at actual sizes**: A pair that looks beautiful at 64px may clash at 16px.

---

## Font Pairing Categories

### Category 1: Serif Display + Sans Body
**Character**: Classic, trustworthy, editorial, premium.
**Best for**: News, publishing, finance, luxury, legal, healthcare.

| Heading (Serif) | Body (Sans) | Vibe |
|---|---|---|
| Playfair Display | Inter | Editorial, premium |
| Lora | Source Sans 3 | Warm, readable, trustworthy |
| Merriweather | Open Sans | Traditional, accessible |
| DM Serif Display | DM Sans | Modern editorial |
| Cormorant Garamond | Nunito Sans | Elegant, luxury |
| EB Garamond | Lato | Academic, timeless |
| Libre Baskerville | Montserrat | Bold contrast, classic |
| Fraunces | Manrope | Playful sophistication |

---

### Category 2: Sans Heading + Sans Body
**Character**: Modern, clean, tech, SaaS, neutral, scalable.
**Best for**: SaaS, dashboards, productivity tools, tech startups.

| Heading (Sans Bold) | Body (Sans Regular) | Vibe |
|---|---|---|
| Inter (800) | Inter (400) | Neutral, tech standard (Figma, Linear, Vercel) |
| Outfit (700) | Outfit (400) | Friendly, modern |
| Plus Jakarta Sans | Inter | Warm modern SaaS |
| Sora | Sora | Clean, Japanese-influenced |
| Geist (700) | Geist (400) | Minimal, performance (Vercel's font) |
| Satoshi (700) | Satoshi (400) | Contemporary, energetic |
| Cabinet Grotesk | Archivo | Bold, contemporary |
| Space Grotesk | Space Grotesk | Geometric, tech |
| Epilogue | Epilogue | Versatile, professional |
| Manrope (700) | Manrope (400) | Readable, balanced |

---

### Category 3: Display/Decorative + Neutral Body
**Character**: Strong personality, brand-forward, creative.
**Best for**: Landing pages, portfolio, creative agencies, startups.

| Heading (Display) | Body (Neutral) | Vibe |
|---|---|---|
| Clash Display | General Sans | Bold startup energy |
| Neue Haas Grotesk | Inter | Ultra-premium, editorial |
| General Sans (900) | General Sans (400) | Cohesive, strong brand |
| Chivo (900) | Chivo (400) | Dark, modern |
| Unbounded | DM Sans | Bold, geometric |
| Bebas Neue | Nunito | High-impact, sporty |
| Anton | Roboto | Strong contrast |
| Big Shoulders Display | Work Sans | Industrial, bold |

---

### Category 4: Geometric Sans + Humanist Sans
**Character**: Structured but warm, approachable professionalism.
**Best for**: HR tech, education, healthcare, consumer apps.

| Heading (Geometric) | Body (Humanist) | Vibe |
|---|---|---|
| Montserrat | Source Sans 3 | Professional, versatile |
| Nunito | Lato | Friendly, rounded |
| Quicksand | Open Sans | Soft, approachable |
| Poppins | Mulish | Warm, modern |
| Raleway | Open Sans | Elegant, flowing |

---

### Category 5: Mono for Code / Technical Products
For developer tools, APIs, CLI interfaces, or any technical product.

| Primary | Secondary | Mono |
|---|---|---|
| Inter | Inter | JetBrains Mono |
| Geist | Geist | Geist Mono |
| Fira Sans | Fira Sans | Fira Code |
| Source Sans 3 | Source Sans 3 | Source Code Pro |

---

## Industry-Specific Recommendations

| Industry | Recommended Pairing | Why |
|---|---|---|
| SaaS / Productivity | Inter + Inter | Neutral, highly readable, no distraction |
| Fintech | Lora + Inter | Trustworthy (serif) + legible (sans) |
| Healthcare | Merriweather + Open Sans | Authoritative, accessible |
| E-commerce | Playfair + Lato or Outfit + Inter | Depends on positioning (luxury vs. friendly) |
| Creative Agency | Clash Display + General Sans | Strong personality |
| Education | Poppins + Mulish | Warm, friendly, encouraging |
| News / Editorial | Playfair Display + Source Sans 3 | Classic editorial |
| Developer Tools | Geist + Geist Mono | Precise, technical |
| Gaming | Bebas Neue + Roboto | Energetic, strong |
| Luxury / Fashion | Cormorant + Montserrat | Refined contrast |
| Legal / Finance | EB Garamond + Lato | Traditional authority |
| Startup / Landing Page | Satoshi + Inter | Contemporary, energetic |

---

## Font Size Scale (Type Scale)

Use a consistent, limited type scale. Never invent new sizes on the fly.

### Standard Scale
```
--font-size-xs:   12px  / 0.75rem   → labels, badges, captions
--font-size-sm:   14px  / 0.875rem  → secondary text, table cells
--font-size-base: 16px  / 1rem      → body text (minimum for mobile)
--font-size-lg:   18px  / 1.125rem  → large body, intro paragraphs
--font-size-xl:   20px  / 1.25rem   → card titles, small headings
--font-size-2xl:  24px  / 1.5rem    → h3 equivalent
--font-size-3xl:  30px  / 1.875rem  → h2 equivalent
--font-size-4xl:  36px  / 2.25rem   → h1 equivalent
--font-size-5xl:  48px  / 3rem      → display / page heroes
--font-size-6xl:  60px  / 3.75rem   → large hero headings
--font-size-7xl:  72px  / 4.5rem    → editorial / campaign headings
```

### Line Height by Size
```
xs-sm:   1.5  (tight lines need more breathing room)
base-lg: 1.5-1.6
xl-2xl:  1.4-1.5
3xl-4xl: 1.2-1.35
5xl+:    1.0-1.15 (large display text needs tight leading)
```

### Font Weight Usage
```
900 / Black:     Ultra-bold display moments only
800 / ExtraBold: Strong headings
700 / Bold:      Headings, emphasized labels (default heading weight)
600 / SemiBold:  Subheadings, navigation items, button labels
500 / Medium:    Label text, emphasized body
400 / Regular:   Default body text
300 / Light:     Avoid for body text — fails contrast at small sizes
```

---

## Letter Spacing (Tracking)

```
Headings (large):  -0.02em to -0.04em  (tighter for display)
Body text:          0em to 0.01em      (never tight track body)
Uppercase labels:  +0.05em to +0.12em  (uppercase always needs tracking)
Captions:          0em to 0.02em
```

Never tighten tracking on body text. Never uppercase body text.

---

## Google Fonts Quick Load

```html
<!-- Inter + Playfair Display -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">

<!-- Outfit (single family, all weights) -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Always use `display=swap` to prevent FOIT (Flash of Invisible Text).
Preload critical fonts for LCP improvement:
```html
<link rel="preload" href="inter-var.woff2" as="font" type="font/woff2" crossorigin>
```

---

## Font Pairing Testing Checklist

- [ ] Pair works at 12px, 16px, 24px, 48px simultaneously
- [ ] Contrast between heading and body is obvious at a glance
- [ ] Fonts don't look like mistakes of each other (too similar)
- [ ] Body font is readable at small sizes (x-height, open apertures)
- [ ] Works in both light and dark mode
- [ ] Loads efficiently (subset, preload, display=swap)
- [ ] Heading font matches brand personality
- [ ] Body font prioritizes readability over personality

---

## Resources
- https://fonts.google.com — Free fonts, pairing suggestions
- https://fontpair.co — Curated Google Font pairings
- https://www.fontjoy.com — AI-generated font pairings
- https://typ.io — Fonts used on real websites
- https://fonts.adobe.com — Adobe Fonts (for paid plans)
- https://www.variable-fonts.com — Variable font explorer
