# Interaction, Motion & Performance UX

## Touch & Mobile-First UX
- Minimum touch target: 44×44pt on iOS / 48×48dp on Android.
- Extend hit areas beyond visual bounds if the visual element is smaller than minimum.
- Minimum spacing between touch targets: 8px / 8dp.
- Provide visual press feedback within 100ms of tap (ripple / scale / highlight).
- Keep primary actions in the thumb-friendly zone: bottom third of the screen on mobile.

## Performance UX & Loading
- Skeleton screens: use for content-heavy loads where layout is known (>300ms wait).
- Spinners: use for short, indeterminate waits only.
- Optimistic UI: show immediate success state, roll back silently on failure with undo option.
- Reserve space for async content to prevent CLS. Target CLS < 0.1.

## Animation and Motion
- Duration: 150-300ms for micro-interactions; complex transitions ≤400ms.
- Use `transform` and `opacity` only — never animate `width`, `height`, `top`, `left`.
- Use ease-out for entering elements, ease-in for exiting elements.
- Exit animations should be 60-70% of enter duration.
- Animations must be interruptible — user tap or gesture cancels in-progress animation immediately.
- Always implement `prefers-reduced-motion` — replace animations with instant state or a fade.

## Delight & Micro-moments
- Delight must serve the user, not just the brand. Do not delay or obstruct tasks in the name of fun.
- Delight is most powerful at moments of completion, achievement, or transition.
- Use a subtle confetti burst or checkmark animation when a significant task is done (max 1200ms).
