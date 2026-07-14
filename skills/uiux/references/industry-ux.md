# Industry-Specific UX Patterns

## Why Industry Context Matters

Generic UX principles apply everywhere, but each industry has unique user expectations, regulatory constraints, trust requirements, and mental models. Applying the right industry-specific patterns builds instant credibility and trust with users who are domain experts.

---

## 1. Fintech and Banking UX

### User Mindset
- High anxiety, high stakes. Users are dealing with their money.
- Trust is the primary UX metric.
- Security expectations are extremely high.
- Users expect precision — round numbers and vague amounts are alarming.

### Trust Signals (Critical)
- Display bank-grade security indicators (256-bit encryption, FDIC insured, PCI DSS).
- Use real institution names and logos in partnerships.
- Show exact amounts with full decimal precision ($1,247.83, not $1,247).
- Display last-4 digits of card/account prominently for verification.
- Timestamps on all transactions (exact time, timezone, reference ID).

### Transaction UX
- Never display "processing" without a reference number. Give users proof.
- Show transaction history with searchable, filterable, exportable logs.
- Pending vs. settled states must be visually distinct.
- Negative amounts: use red color AND a minus sign AND parentheses for maximum clarity.
- Currency: always show the currency code (USD, EUR) alongside the symbol.

### Form UX in Fintech
- Credit card input: format in real time (1234 5678 9012 3456). Show card type icon live.
- Routing/account number: show digit groups, mask all but last 4 after entry.
- Never auto-fill payment fields without explicit user action.
- Require re-authentication for large transfers (>$10,000 or threshold-based).

### Error States
- Payment failures: always show exactly why (insufficient funds, card declined, wrong CVV).
- Never give a vague "payment failed" message. Users need to take action.
- Provide a direct support contact on every error screen.

### Dashboard Conventions
- Primary metric always above the fold: total balance or portfolio value.
- % change and absolute change, side by side (+$1,240 | +3.2%).
- Use sparklines or micro-charts for trend indicators in account rows.
- Color code portfolio performance: green up, red down — AND use labels.

### Accessibility Requirements
- Screen reader support is legally required in many financial products (ADA, Section 508).
- All charts must have table equivalents or ARIA data tables.
- Never color-code profit/loss as the only indicator — always label.

---

## 2. Healthcare and Medical UX

### User Mindset
- Vulnerable users (patients) or time-pressured experts (doctors, nurses).
- Errors can have life-or-death consequences.
- Privacy is a legal requirement (HIPAA in US, GDPR in EU).
- Trust is the primary metric; aesthetics are secondary.

### Critical Safety Rules
- Never truncate medication names, dosages, or allergy information.
- Use standardized medical abbreviations only where the audience is clinical staff.
- For patient-facing interfaces: plain language, reading level ≤8th grade (Flesch-Kincaid).
- High-risk actions (delete record, administer medication) require double confirmation.
- All critical data fields must show units clearly (mg, ml, mmHg, bpm).

### Patient-Facing UX
- Large, readable typography (minimum 18px body for aging populations).
- High contrast — many patients have vision impairments.
- Simple, linear flows — avoid complex branching decision trees.
- Appointment scheduling: show concrete times, not relative ("Today at 2:30 PM", not "in 4 hours").
- Medication reminders: show drug name, dose, frequency, and time clearly.

### Clinical Staff UX
- Information density is acceptable — clinicians are experts who need data fast.
- Critical alerts must be impossible to miss: distinct color, sound, screen takeover.
- Patient data must be scannable in 3 seconds or less on a ward round.
- Search must handle medical terminology, brand names, and generic names interchangeably.
- Audit trails are required: every action logged with timestamp, user, and change details.

### Privacy UX
- Data access must be role-based and visually indicated (which role is viewing).
- Masking: show initials and date of birth, not full name, in list views.
- Session timeout: 15 minutes inactivity in clinical settings (HIPAA requirement).
- Clear and explicit data sharing consent — cannot be implied or bundled.

---

## 3. Education and EdTech UX

### User Mindset
- Students: motivation varies widely, attention spans short, fear of failure.
- Teachers: time-constrained, need administrative efficiency.
- Parents: want progress visibility, not complexity.

### Learner Experience
- Progress is the most motivating visual element. Always show it.
- Gamification: badges, streaks, progress bars, and completion celebrations increase retention.
- Never show a failing grade without also showing a path to improvement.
- Multi-attempt tolerance: allow re-takes with encouragement, not shame.
- Chunking: break content into 5-10 minute micro-lessons.
- Offline support is critical — students learn in low-connectivity environments.

### Content Presentation
- Use 80/20 rule for text: 20% text, 80% visual examples, diagrams, video.
- Highlight key terms and definitions — never bury them in prose.
- Interactive examples outperform static explanations by 60%+ retention.
- Reading level: match to the learner age. Use Hemingway App to check.

### Assessment UX
- Show question count and progress ("Question 3 of 10").
- Allow skipping and returning to questions.
- Time remaining: show as a countdown AND a progress bar.
- Immediate feedback on answers increases retention (Hattie & Timperley, 2007).
- Celebration animation on correct answer — subtle, not intrusive.

### Teacher/Admin Dashboard
- The teacher dashboard is fundamentally different from the student view.
- Teachers need class-level and individual-level progress at the same time.
- Bulk actions for grading, messaging, and assignments.
- Export everything to CSV — schools integrate with many systems.

---

## 4. Real Estate UX

### User Mindset
- The highest-stakes purchase decision most people make.
- Users spend months researching before converting.
- Trust, credibility, and detail are the conversion drivers.

### Property Listing UX
- Hero image: must be high-quality, 16:9, above the fold. Photo quality determines engagement.
- Key details above the fold: price, beds, baths, sqft, address. Never hide these.
- Virtual tours increase engagement by 300% — offer as primary CTA, not secondary.
- Map is mandatory: neighborhood context matters as much as the property.
- Price history and days on market: power users need this — don't hide it.

### Search and Filter UX
- Map search is the primary pattern: users prefer to search visually, not by text.
- Filter order by usage: Price → Size → Beds → Baths → Property Type → More.
- Draw-on-map search outperforms radius-based search.
- Save search with email alerts: this is the primary lead capture mechanism.
- Commute time filter: show travel time to a user-defined location.

### Trust Signals
- Agent photos, credentials, and review count near every listing.
- Verified listing badge (MLS-sourced, not user-submitted).
- Price history: shows market integrity.
- Neighborhood data: schools (ratings), walk score, crime index.

### Mobile UX (Critical)
- 70%+ of real estate searches are mobile. Mobile is the primary platform.
- Save/favorite must be one tap with no account required.
- Contact agent must be one tap (click-to-call, not form-only).
- Swipe through property photos like a social app.

---

## 5. SaaS B2B UX

### User Mindset
- Power users who want efficiency and control.
- Multiple stakeholders (admin, member, viewer roles).
- Evaluated rationally: ROI, integrations, compliance, support.
- Team-based workflows, not individual tasks.

### Onboarding for B2B
- The "aha moment" must happen in the first session, not week 2.
- Admin setup (workspace, team, integrations) before individual user flows.
- Invite team member early — B2B products need network effects within the org.
- Import existing data in the first session (CSV import, integrations).

### Multi-Tenant Architecture UX
- Workspace/org switcher always visible — top left, below logo.
- Clear indication of which workspace the user is in (name + avatar in header).
- Permissions: show clearly what each role can/cannot do.
- Billing: visible to admin only, behind a clear permission gate.

### Power User Patterns
- Keyboard shortcuts everywhere — document them (Cmd+K help panel).
- Bulk select + bulk actions in all list views.
- Saved views / custom filters that persist per user.
- Advanced search with boolean operators (for CRMs, project tools).
- Activity log / audit trail accessible to admins.

### Integration-Centric UX
- Integrations page: searchable, categorized (CRM, Productivity, Communication).
- Connection status clearly shown (connected, error, pending).
- Webhook and API key management in a dedicated section.
- OAuth flows: branded, minimal permissions requested, clear scope explanation.

---

## 6. E-Learning Platform (Video-First)

### Video Player UX
- Playback speed control (0.75x, 1x, 1.25x, 1.5x, 2x) — non-negotiable.
- Chapter markers and progress bar with hover previews.
- Auto-advance to next lesson (with 5-second cancel).
- Picture-in-picture support for note-taking alongside video.
- Transcript below video (clickable timestamps navigate the video).

### Content Library UX
- Filter by: topic, level, duration, instructor, format (video, quiz, project).
- "Continue learning" section prominent on dashboard.
- Completion certificates: downloadable, shareable to LinkedIn.

---

## Quick Reference: Industry UX Priority Matrix

| Industry | Primary UX Metric | #1 Trust Signal | Critical Failure |
|---|---|---|---|
| Fintech | Trust + Accuracy | Bank-grade security badges | Vague error on payment failure |
| Healthcare | Safety + Clarity | Data privacy (HIPAA visible) | Truncated medical info |
| Education | Progress + Engagement | Streak / achievement system | Showing failure without recovery |
| Real Estate | Detail + Credibility | High-quality photos + map | Hidden price history |
| SaaS B2B | Efficiency + Control | Role-based permissions | Confusing team/org switcher |
| E-commerce | Conversion + Trust | Real reviews + return policy | Hidden shipping costs at checkout |
