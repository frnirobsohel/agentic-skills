# Advanced Component Design (Tailwind + CVA)

## STRICT Rules

- **NEVER hardcode Tailwind classes inside `if/else` branches.** Use `cva()` for all component variants.
- **NEVER use `style={{ ... }}` inline styles.** Use Tailwind utility classes or CSS custom properties.
- **ALWAYS use the `cn()` utility** when merging conditional classes. Never concatenate strings.
- **NEVER import a raw shadcn/ui primitive directly into a feature component.** Wrap it first in `components/shared/`.
- **ALWAYS use `interface` to define component props**, named `<ComponentName>Props`.
- **NEVER create a component with more than 5 props.** If you need more, use composition or a dedicated config object.

## The Standard `cn` Utility

Every project must have this utility in `src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## CVA Component Pattern (For All Variant-Based Components)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
```

## Compound Components (For Complex UI Patterns)

Use for: Modals, Dropdowns, Selects, Accordions, Tabs.
**NEVER** pass more than 3 boolean props to control visibility/state. Use compound pattern instead.

```tsx
// ✅ CORRECT — Compound pattern
<DropdownMenu.Root>
  <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Profile</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>

// ❌ WRONG — Prop explosion
<Dropdown isOpen={true} showProfile={true} showSettings={false} onClose={...} />
```

## Modern CSS Rules (Mandatory)

### Container Queries
- **NEVER use viewport media queries (`@media`) for component-level responsive behavior.** Use `@container` instead.
- `@container` goes on the parent wrapper. Container variants (`@sm:`, `@md:`) go on children.

### View Transitions API
- **ALWAYS prefer the framework's native view transition implementation** (Next.js experimental flags) over a custom implementation.
- Wrap any manual DOM transition in a guard: `if (!document.startViewTransition) { callback(); return; }`.

### `:has()` Selector
- Use `:has()` to replace JavaScript-driven conditional styling where possible.
- Example: `.form:has(input:invalid) { border-color: red; }` — no JS state needed.
