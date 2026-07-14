# Coding Standards & Naming Conventions (Always-On Core File)

This file applies to **TypeScript/React code tasks**. Skip for plain HTML/CSS-only work.

---

## 1. File & Folder Naming (Mandatory)

| Type | Convention | Example |
|---|---|---|
| Directories | `lowercase-kebab-case` | `user-profile/`, `auth-modal/` |
| Component files | `PascalCase.tsx` | `UserProfile.tsx`, `AuthModal.tsx` |
| Hook files | `camelCase.ts` | `useUserData.ts`, `useAuthState.ts` |
| Server Actions | `camelCase.ts` | `createUser.ts`, `deletePost.ts` |
| Utility files | `camelCase.ts` | `formatDate.ts`, `cn.ts` |
| Test files | `ComponentName.test.tsx` | `UserProfile.test.tsx` |
| Type files | `camelCase.types.ts` | `user.types.ts` |

## 2. Component & Variable Naming (Mandatory)

- **Component names**: `PascalCase` — `UserProfileCard`, `AuthModal`, `DashboardLayout`
- **Component props interface**: `<ComponentName>Props` — `UserProfileCardProps`, `AuthModalProps`
- **Event handlers**: ALWAYS prefix with `handle` — `handleClick`, `handleSubmit`, `handleDeleteUser`
- **Boolean variables**: ALWAYS prefix with `is`, `has`, or `can` — `isLoading`, `hasError`, `canSubmit`, `isOpen`
- **Custom hooks**: ALWAYS prefix with `use` — `useUserData`, `useAuthState`
- **Server Actions**: Use verb-noun format — `createUser`, `updatePost`, `deleteComment`
- **Constants**: `SCREAMING_SNAKE_CASE` — `MAX_FILE_SIZE`, `API_BASE_URL`

## 3. TypeScript Rules (Mandatory)

- **NEVER use `any`**. Use `unknown` if the type is truly dynamic, then narrow it.
- **Use `interface` for object props and shapes**, `type` for unions, intersections, and primitives.
- **Never use default exports** for React components — always named exports.
- **Define props with an explicit interface above the component**, not inline.

```tsx
// ✅ CORRECT
interface UserCardProps {
  userId: string;
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function UserCard({ userId, isLoading, onDelete }: UserCardProps) { ... }

// ❌ WRONG
export default function UserCard({ userId, isLoading }: { userId: string; isLoading: boolean }) { ... }
```

## 4. Import Order (Mandatory)

Imports must always be in this order (Biome/ESLint will enforce this):
1. React / Next.js imports
2. Third-party library imports
3. Internal absolute imports (`@/components/...`)
4. Relative imports (`./Button`)
5. Type-only imports (`type { UserProps }`)

## 5. Component Structure Order (Mandatory)

Every component file MUST follow this structure in order:
1. Imports
2. Types / Interfaces
3. Constants (if any)
4. The component function
5. Helper sub-components (if any, below the main component)

## 6. CSS & Styling Rules (Mandatory)

- **Use Tailwind CSS exclusively**. Never write custom CSS in a `.css` file for component styling.
- **Never use inline `style` prop** (e.g., `style={{ color: 'red' }}`). Use Tailwind or CSS variables.
- **Use the `cn()` utility** for all conditional class merging. Never use string concatenation.
- **Use `cva()` for component variants**. Never duplicate Tailwind classes across multiple `if/else` branches.

## 7. Error Handling Rules (Mandatory)

- Every `async` function must be wrapped in `try/catch`.
- Server Actions must return `{ success: true, data }` or `{ error: string }`.
- Never use `console.error` in production code. Use a proper logger (e.g., Sentry).
- Every route page must have a sibling `error.tsx` that catches and displays errors gracefully.

## 8. Code Quality Rules (Mandatory)

- **Use early returns** (guard clauses) to reduce nesting. Never use `else` after a `return`.
- **Max 400 lines per file**. If a component exceeds this, extract logic into a custom hook or split it.
- **Max 3 levels of nesting** in JSX. Extract deeply nested sections into sub-components.
- **Never hardcode strings** that appear in the UI. Use constants or i18n keys.
