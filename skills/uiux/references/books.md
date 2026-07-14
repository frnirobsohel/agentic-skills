# UI/UX Expert Books — Key Principles Reference

> **Context budget:** Reference library only. Do NOT auto-load during design or coding tasks.

This file distills the most actionable principles from the highest-authority UI/UX books.
When making design decisions, cite the source book to justify the choice.

---

## 1. Don't Make Me Think (Steve Krug, 2000/2014)
**Authority**: The definitive bible of web usability.
**URL**: https://sensible.com/dont-make-me-think/

### Core Principles
- **Self-evident design**: Every page should be self-explanatory. If it requires thinking, redesign it.
- **Users scan, they don't read**: Write for scanning — use headers, bullets, short paragraphs. Users read roughly 25% of text on a page.
- **Satisficing**: Users don't find the best option; they take the first reasonable one. Design for the first reasonable path, not the optimal one.
- **Navigation clarity**: Users need to know — Where am I? Where can I go? What's here?
- **Billboard design**: Important things should be immediately obvious. Don't rely on users exploring to find critical information.
- **Omit needless words**: Remove half the words on every page, then remove half of what remains.
- **Happy talk**: Remove all text that exists to sound friendly but delivers no information ("Welcome to our site!").
- **Don't reinvent the wheel**: Users come with expectations from other sites. Deviate only when the benefit clearly outweighs the learning cost. (Jakob's Law)
- **Back button is the most-used navigation**: Never break it. Never trap users in a dead end.
- **Breadcrumbs**: Use them for deep hierarchies. Show the full path, make the current page non-clickable.
- **Trunk test**: A user dropped into any page should instantly answer: What site is this? What page am I on? What are the major sections? What are my options?
- **Usability testing**: 3-5 users reveal 85% of major problems. Test early, test often, test cheap.

---

## 2. The Design of Everyday Things (Don Norman, 1988/2013)
**Authority**: Foundational theory of human-centered design.
**URL**: https://jnd.org/the-design-of-everyday-things-revised-and-expanded-edition/

### Core Principles
- **Affordances**: Design should make it obvious how to interact with it. A button should look pressable.
- **Signifiers**: Clear signals of where actions can be taken ("Click here", arrow icons, underlined links).
- **Feedback**: Every action must produce an immediate, clear response. Silence after a click is a design failure.
- **Conceptual model**: The interface must match the user's mental model of how it works, not the engineer's.
- **Mapping**: Controls should be spatially arranged to match what they control. (Volume up = swipe up)
- **Constraints**: Limit possible actions at each step to prevent errors (disable unavailable options, don't hide them).
- **Discoverability**: Users should be able to figure out all possible actions by looking at the interface.
- **Human error is design failure**: When users make mistakes, the design failed — not the user.
- **7 Stages of Action**: Goal → Plan → Specify → Perform → Perceive → Interpret → Compare. Design must support each stage.
- **Gulf of Execution**: The gap between what users want to do and what the interface lets them do. Minimize it.
- **Gulf of Evaluation**: The gap between what happened and what users expected to happen. Minimize it.
- **Forcing functions**: Prevent incorrect actions through design (confirm dialog before destructive action, disabled state for unavailable options).

---

## 3. Refactoring UI (Adam Wathan & Steve Schoger, 2018)
**Authority**: The most practical, actionable UI design book. Written by the creators of Tailwind CSS.
**URL**: https://refactoringui.com

### Core Principles
- **Start with too much whitespace**: Add spacing generously first, then reduce. Never start cramped.
- **Hierarchy with font weight and color, not size alone**: Use weight (bold vs regular) and color (dark vs muted) before jumping to large font sizes.
- **Use fewer font sizes**: Limit to 3-5 distinct sizes. Resolve hierarchy issues with weight and color instead.
- **Limit color palette**: Most interfaces need fewer than 5 colors total. Don't add a new color — reuse existing ones differently.
- **Grays need color**: Pure gray (#808080) looks off. Add a hint of the primary brand color to grays for harmony.
- **Accessible doesn't mean ugly**: Contrast requirements are a floor, not a ceiling. Well-designed accessible UI can be beautiful.
- **Use HSL color space**: HSL lets you reason about colors intuitively (hue, saturation, lightness). Avoid raw hex for design decisions.
- **Don't use color as the only differentiator**: Always pair color with label, icon, or position.
- **Offset shadows work better**: Use two shadows — one large/blurry for ambient, one small/sharp for direct light.
- **Even spacing doesn't look even**: Space between different-sized elements must be optically adjusted, not mathematically equal.
- **Design in grayscale first**: Add color last. If the hierarchy doesn't work without color, fix the structure first.
- **Use borders sparingly**: Background color differences, shadows, and spacing create separation without visual noise.
- **Empty states are design opportunities**: A great empty state is a welcome mat. A bad one is a blank wall.
- **Reduce decisions**: Every design decision you leave unmade is a decision that gets made inconsistently. Document your system.
- **Superfluous UI**: Remove elements that don't earn their space. If removing it changes nothing, it was noise.

---

## 4. Laws of UX (Jon Yablonski, 2020)
**Authority**: Best synthesis of psychology + interface design. lawsofux.com is cited globally.
**URL**: https://lawsofux.com | https://www.oreilly.com/library/view/laws-of-ux/9781492055303/

### The Laws

**Fitts's Law**
The time to acquire a target is a function of the distance to and size of the target.
- Make interactive targets large enough and close enough to where the user is.
- Place frequently used actions in corners or edges (infinite acquisition zone — Fitts's Law corollary).
- Keep related actions close together. The further apart, the more friction.

**Hick's Law**
Decision time increases with the number and complexity of choices.
- Limit navigation items to 5-7 primary options.
- Use progressive disclosure to hide advanced options until needed.
- Highlight the recommended option to reduce decision load.
- Break complex processes into smaller, sequential steps.

**Jakob's Law**
Users spend most of their time on other sites and apps. They expect yours to work like the ones they already know.
- Follow established conventions: hamburger menus, blue underlined links, cart icon in top right, logo links to home.
- Only deviate from convention when the benefit to users clearly outweighs the learning cost.
- Leverage existing mental models. Don't fight them.

**Miller's Law**
The average person can hold 7 (±2) items in working memory at one time.
- Chunk related information into groups of 5-9.
- Don't present more than 7 navigation items without grouping.
- Break long forms into logical sections. 
- Use visual grouping to reduce cognitive load.

**Doherty Threshold**
Productivity increases when a system responds in under 400ms — fast enough that neither human nor computer has to wait.
- Target response time under 400ms for all interactive feedback.
- For operations that take longer: use skeleton screens or progress indicators immediately.
- Optimistic UI updates feel faster because they respond instantly.

**Aesthetic-Usability Effect**
Users perceive aesthetically pleasing design as more usable, even if it isn't.
- Beautiful design creates goodwill. Invest in visual quality.
- Users will tolerate minor usability issues more on beautiful products.
- However, aesthetics cannot compensate for fundamental usability failures.

**Peak-End Rule**
People judge an experience based on its peak moment and its ending — not the average.
- Design great endings: confirmation screens, success states, completion celebrations.
- Design for key peak moments: first use, first success, aha moment.
- A bad ending (failed payment, confusing error) poisons the memory of the entire experience.

**Von Restorff Effect (Isolation Effect)**
When multiple similar objects are present, the one that differs most is most memorable.
- Make the primary CTA stand out from all secondary actions (color, size, fill vs. outline).
- Use visual distinctiveness intentionally — not randomly.
- Avoid making too many things "stand out" — isolation only works when most elements are similar.

**Zeigarnik Effect**
People remember uncompleted tasks better than completed ones.
- Progress indicators and checklists keep users engaged and returning.
- Incomplete onboarding checklists are powerful retention tools.
- Saving state and showing "Resume" for interrupted tasks reduces drop-off.

**Serial Position Effect**
People best remember the first and last items in a sequence.
- Place the most important navigation items first or last.
- The middle of a list is the most forgettable position.
- In storytelling and presentations: strong opening, strong close.

**Goal-Gradient Effect**
People accelerate effort as they get closer to a goal.
- Show progress: "3 of 5 steps complete" motivates faster completion than no indication.
- In multi-step flows, show remaining steps decreasing — this increases momentum.
- Loyalty programs: partially-filled progress bars get more engagement.

**Tesler's Law (Conservation of Complexity)**
Every application has an inherent amount of complexity that cannot be removed — only transferred.
- Complexity must live somewhere: in the product or on the user.
- The designer's job is to absorb complexity so the user doesn't have to.
- Simplifying the interface often means making the backend more complex. That's the right trade.

**Occam's Razor**
The simplest solution tends to be the correct one.
- When two designs solve the problem equally, choose the simpler one.
- Add features and elements only when they solve a real, validated problem.
- Complexity compounds. Simplicity scales.

**Pareto Principle (80/20 Rule)**
80% of effects come from 20% of causes.
- Identify the 20% of features your users use 80% of the time and make those exceptional.
- Don't spread design effort evenly — concentrate on high-impact areas.

**Postel's Law (Robustness Principle)**
Be liberal in what you accept from users, be conservative in what you send.
- Accept varied formats (phone numbers with or without dashes, URLs with or without https://).
- Format inputs gracefully rather than rejecting them.
- Clear, precise, structured feedback to the user.

**Common Region (Gestalt)**
Elements placed within the same enclosed region are perceived as grouped.
- Use cards, panels, and borders to group related content.
- Background color changes create regions even without explicit borders.

**Law of Proximity (Gestalt)**
Objects near each other are perceived as related.
- Label placement: label must be closest to its field, not equidistant between two fields.
- Related actions cluster together. Destructive actions should be isolated.

**Law of Similarity (Gestalt)**
Elements that appear visually similar are perceived as having a similar function.
- Consistent button styles across the product signal equal importance.
- Mixing filled and outline buttons for the same action level creates confusion.

---

## 5. Hooked: How to Build Habit-Forming Products (Nir Eyal, 2014)
**Authority**: The definitive framework for engagement and user retention.
**URL**: https://www.nirandfar.com/hooked/

### The Hook Model
**Trigger → Action → Variable Reward → Investment**

- **External triggers**: Notifications, emails, ads — bring users back.
- **Internal triggers**: Emotions, habits, pain points — the most powerful triggers. Design for the internal trigger (boredom → check feed, anxiety → check email).
- **Action**: The simplest behavior done in anticipation of a reward (scroll, tap, search). Reduce friction to zero.
- **Variable reward**: Rewards that are unpredictable increase engagement. Three types: tribe (social validation), hunt (information/resources), self (mastery/completion).
- **Investment**: When users put something in (data, time, social capital), they value the product more and return.

### Ethical Application
- Use for onboarding, retention, and re-engagement — not manipulation.
- The Manipulation Matrix: if you would use the product yourself and it genuinely helps users, it is ethical. If not, it is exploitation.

---

## 6. Lean UX (Jeff Gothelf & Josh Seiden, 2013/2021)
**Authority**: The standard for agile, hypothesis-driven UX in product teams.
**URL**: https://www.jeffgothelf.com/lean-ux-book/

### Core Principles
- **Outcome over output**: Measure success by behavior change (user does X more), not features shipped.
- **Assumptions**: Every design decision is an assumption. Make assumptions explicit, then test them.
- **Hypothesis format**: "We believe that [doing this] for [these users] will achieve [this outcome]. We will know we are right when [we see this measurable signal]."
- **MVPs for learning**: Build the minimum needed to test the most important assumption — not the minimum viable product.
- **Cross-functional collaboration**: Design with the whole team (dev, product, design) — not for them.
- **Continuous discovery**: User research is not a phase. It is a continuous activity woven into every sprint.
- **Small batches**: Reduce the size of work to reduce risk and increase learning speed.
- **Anti-pattern — "Big Design Up Front"**: Never finalize an entire design before any validation.

---

## 7. Atomic Design (Brad Frost, 2016)
**Authority**: The definitive framework for design systems and component architecture.
**URL**: https://atomicdesign.bradfrost.com

### The Atomic Design Hierarchy
- **Atoms**: The basic building blocks — buttons, inputs, labels, icons. Cannot be broken down further.
- **Molecules**: Simple combinations of atoms — a search field (label + input + button).
- **Organisms**: Complex, reusable interface sections — a navbar, a product card, a comment thread.
- **Templates**: Page-level layouts with real content structure but placeholder content.
- **Pages**: Specific instances of templates with real content.

### Application Rules
- Build atoms first, then compose upward. Never build a page then extract components.
- Each level should be composable: molecules from atoms, organisms from molecules.
- Document each level. Atoms without documentation are not part of a design system — they are just components.
- Design systems live in perpetuity. Plan for maintenance, versioning, and deprecation from day one.

---

## 8. 100 Things Every Designer Needs to Know About People (Susan Weinschenk, 2011)
**Authority**: Best psychology-of-UX reference for applied cognitive science.
**URL**: https://www.humanfactors.com/books/100things.asp

### Key Psychological Principles for UI
- **People see what they expect to see**: Deviation from convention causes confusion. Users pre-process familiar patterns.
- **Attention is limited**: Users can only focus on one primary task. Secondary tasks must not compete.
- **7-second memory**: Visual working memory holds only 3-4 items simultaneously (updated from Miller's 7).
- **People make errors**: Design to prevent errors (constraints, confirmation), tolerate errors (undo, recovery), and help users understand errors (clear messaging).
- **Stories trump data**: Users remember experiences and stories more than facts and statistics.
- **Social validation is powerful**: Showing what others do ("1,200 people bought this today") influences decisions.
- **Progressive disclosure**: Show only what is needed for the current step. Reveal complexity gradually.
- **People are motivated by progress**: Show completion percentages and milestones to sustain effort.
- **Dopamine and unpredictability**: Variable rewards (like social media feeds) are more engaging than fixed rewards.
- **Unconscious processing**: Users form impressions in milliseconds. The first visual impression is formed before conscious thought.

---

## 9. Sprint (Jake Knapp, Google Ventures, 2016)
**Authority**: The GV Design Sprint is used by Google, Slack, Airbnb, and hundreds of startups.
**URL**: https://www.thesprintbook.com

### Design Sprint Principles (Applied to UX)
- **5-day structure**: Map → Sketch → Decide → Prototype → Test. Compress months of work into one week.
- **Prototype for testing, not for shipping**: A realistic-looking prototype can be built in one day. It doesn't need to work.
- **Test with 5 users**: You will identify the most critical patterns in 5 interviews. Schedule no more.
- **Long-term goals first**: Start every design by asking "Where do we want to be in 5 years?" Then work backwards.
- **Crazy 8s**: Sketch 8 distinct variations in 8 minutes. Forces divergent thinking before converging on a solution.
- **The decider**: Every design discussion needs a single decision-maker. Design by committee produces mediocrity.
- **Note-and-vote**: Silent idea generation and voting beats open discussion for idea quality.

---

## 10. Continuous Discovery Habits (Teresa Torres, 2021)
**Authority**: The definitive modern framework for product discovery and user research.
**URL**: https://www.producttalk.org/2021/05/continuous-discovery-habits/

### Core Framework
- **Opportunity Solution Trees**: Map the connection from business outcome → user opportunity → solution → experiment.
- **Weekly user interviews**: Commit to interviewing at least one user per week, every week. Not quarterly. Weekly.
- **Assumptions mapping**: Before building anything, list all assumptions. Test the riskiest ones first.
- **Prioritize by opportunity, not by solution**: Fall in love with the problem, not your solution.
- **Desirability, Viability, Feasibility**: Every solution must pass all three tests before building.
- **Auto-pilot interviews**: Have 5-10 recurring interview participants who you speak with regularly.

---

## Quick Reference: Which Book for Which Situation

| Situation | Go-To Book |
|---|---|
| Interface is confusing / hard to navigate | Don't Make Me Think (Krug) |
| Users keep making errors | Design of Everyday Things (Norman) |
| UI looks unprofessional / wrong hierarchy | Refactoring UI (Wathan & Schoger) |
| Justifying a design decision with psychology | Laws of UX (Yablonski) |
| Low retention / users not returning | Hooked (Nir Eyal) |
| Working in an agile / startup team | Lean UX (Gothelf & Seiden) |
| Building a component / design system | Atomic Design (Brad Frost) |
| Rapid prototyping and user testing | Sprint (Jake Knapp, GV) |
| Continuous user research practice | Continuous Discovery Habits (Torres) |
| Understanding human psychology in UI | 100 Things (Weinschenk) |
