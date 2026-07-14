# Competitive UX Analysis Framework

## Purpose
A systematic method to evaluate competitors' UX strengths and weaknesses, identify patterns, and discover opportunities for differentiation.

---

## Step 1: Select Competitors (3-5)

### Categories
- **Direct competitors**: Same product, same market (e.g., Notion vs. Coda).
- **Indirect competitors**: Different product, same user need (e.g., Notion vs. Google Docs + Trello).
- **Aspirational competitors**: Best-in-class UX from a different industry (e.g., Stripe's documentation as a model for any developer product).

### Selection Criteria
| Criterion | Why |
|---|---|
| Market leader | What is the established standard? |
| Fast-growing challenger | What innovations are disrupting the standard? |
| Best UX in category | What does excellence look like? |
| Worst UX in category | What mistakes should we avoid? |
| Adjacent category leader | What patterns can we borrow? |

---

## Step 2: Define Evaluation Dimensions

### Core Dimensions (Always Evaluate)

**1. First Impression (0-30 seconds)**
- How long to understand what the product does?
- Is the value proposition clear on the landing page?
- Visual quality: does it feel trustworthy and professional?
- CTA clarity: is the primary action obvious?

**2. Onboarding (First 5 minutes)**
- Time to first value (TTFV): how quickly does the user accomplish something meaningful?
- Number of steps before value delivery.
- Friction points: account creation, email verification, setup wizard length.
- Does the product demonstrate value before requesting commitment?

**3. Core Flow Efficiency**
- How many clicks/taps to complete the core action?
- Is the flow linear or does it branch unnecessarily?
- Can the user undo mistakes easily?
- Does it feel fast? (Perceived performance)

**4. Navigation and Information Architecture**
- Can you find any feature within 3 clicks?
- Is the navigation structure predictable?
- Search quality: results accuracy, autocomplete, zero results handling.
- Breadcrumbs, back navigation, deep linking.

**5. Visual Design Quality**
- Consistency: does every screen feel like the same product?
- Hierarchy: is the most important element on each page immediately obvious?
- Spacing: systematic or arbitrary?
- Typography: readable, hierarchical, consistent?
- Color: accessible, semantic, on-brand?

**6. Mobile Experience**
- Is it mobile-first or adapted from desktop?
- Touch targets: do they meet 44px minimum?
- Navigation: bottom nav, hamburger, or missing?
- Performance on mobile networks.

**7. Accessibility**
- Keyboard navigation: can you use the product without a mouse?
- Screen reader: does it announce meaningful information?
- Contrast: does text meet 4.5:1?
- Focus states: are they visible?

**8. Error Handling**
- What happens when things go wrong?
- Are error messages helpful and actionable?
- Empty states: do they guide the user forward?
- Offline handling (if applicable).

**9. Performance**
- LCP: how fast does the main content appear?
- CLS: does the page shift while loading?
- INP: how responsive are interactions?

**10. Unique Differentiators**
- What does this competitor do that nobody else does?
- What UX innovation makes them stand out?
- What would users miss most if they switched away?

---

## Step 3: Scoring System

### Scoring Scale
| Score | Meaning | Criteria |
|---|---|---|
| 5 | Exceptional | Best-in-class. Sets industry standard. |
| 4 | Good | Well executed. Minor improvements possible. |
| 3 | Adequate | Functional. Some noticeable issues. |
| 2 | Below standard | Significant problems. Users frustrated. |
| 1 | Poor | Broken or unusable. Users abandon. |

### Scoring Matrix

| Dimension | Weight | Our Product | Competitor 1 | Competitor 2 | Competitor 3 |
|---|---|---|---|---|---|
| First Impression | 10% | /5 | /5 | /5 | /5 |
| Onboarding | 15% | /5 | /5 | /5 | /5 |
| Core Flow | 20% | /5 | /5 | /5 | /5 |
| Navigation / IA | 10% | /5 | /5 | /5 | /5 |
| Visual Design | 10% | /5 | /5 | /5 | /5 |
| Mobile | 10% | /5 | /5 | /5 | /5 |
| Accessibility | 10% | /5 | /5 | /5 | /5 |
| Error Handling | 5% | /5 | /5 | /5 | /5 |
| Performance | 5% | /5 | /5 | /5 | /5 |
| Differentiators | 5% | /5 | /5 | /5 | /5 |
| **Weighted Total** | **100%** | **/5** | **/5** | **/5** | **/5** |

---

## Step 4: Screenshot Documentation

For each competitor, capture:
1. Landing page (above the fold)
2. Signup/login flow (each step)
3. Onboarding experience (each step)
4. Core feature — main screen
5. Core feature — key interaction
6. Empty state
7. Error state
8. Mobile version of #4 and #5
9. Settings/account page
10. Pricing page

Organize screenshots in a folder: `analysis/[competitor-name]/[dimension]/[screenshot].png`

---

## Step 5: Pattern Mining

### Questions to Answer
| Question | Purpose |
|---|---|
| What navigation pattern does every competitor use? | Identify conventions users expect. |
| What's the average onboarding step count? | Set a benchmark for friction. |
| What data do competitors show on the dashboard? | Understand user priority expectations. |
| How do competitors handle pricing display? | Learn conversion patterns. |
| What's the most common empty state pattern? | Identify best practices. |
| How many clicks for the core action? | Set an efficiency benchmark. |

### Pattern Categories
- **Universal patterns**: Every competitor does this → users expect it. Don't deviate.
- **Differentiating patterns**: Only one competitor does this → opportunity or gimmick?
- **Missing patterns**: No competitor does this → your unique opportunity.
- **Anti-patterns**: A competitor does this badly → learn what to avoid.

---

## Step 6: Opportunity Map

### Opportunity Prioritization Matrix

| Opportunity | User Impact | Effort | Competitor Status | Priority |
|---|---|---|---|---|
| [opportunity 1] | High/Med/Low | High/Med/Low | None do it / Some do it / All do it | 🔴🟠🟡🟢 |
| [opportunity 2] | ... | ... | ... | ... |

### Priority Rules
- **High impact + Low effort + No competitor does it** = 🔴 Do this immediately.
- **High impact + High effort + Competitors do it** = 🟠 Plan for next quarter.
- **Low impact + Any effort** = 🟢 Backlog or skip.

---

## Step 7: Report Structure

```markdown
# Competitive UX Analysis: [Product Category]

## Executive Summary
[3-5 bullet points: key findings, our position, top 3 opportunities]

## Competitors Analyzed
[Table of competitors with URLs and market position]

## Scoring Summary
[Weighted scoring matrix with overall rankings]

## Dimension Deep Dives
[For each of the 10 dimensions: findings, screenshots, patterns]

## Pattern Analysis
[Universal patterns, differentiators, gaps, anti-patterns]

## Opportunity Map
[Prioritized list of opportunities with impact/effort/competitor status]

## Recommendations
1. Immediate (this sprint): [actions]
2. Short-term (next month): [actions]
3. Long-term (next quarter): [actions]

## Appendix
[All screenshots organized by competitor and dimension]
```

---

## Tools for Competitive Analysis

| Tool | Use |
|---|---|
| BuiltWith / Wappalyzer | Identify competitor tech stack |
| SimilarWeb | Traffic estimates and audience overlap |
| Google PageSpeed Insights | Performance benchmarking |
| WAVE / axe | Accessibility evaluation |
| Hotjar / FullStory (own product) | Behavioral data for our product |
| Wayback Machine | Track competitor design evolution |
| Figma | Screenshot annotation and comparison |
| Notion / Google Sheets | Scoring matrix and documentation |
