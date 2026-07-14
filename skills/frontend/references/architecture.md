# Advanced Architecture & Folder Structure

## Monorepo Architecture (Turborepo / Nx)
When building applications at scale, monolithic frontend repositories become difficult to maintain. Always default to a Monorepo setup using Turborepo or Nx for any project larger than a single app.

**Key Monorepo Principles:**
- **App/Package Split**: Keep applications (Next.js, Vite) in `apps/` and shareable modules in `packages/`.
- **Internal Packages**: Create internal packages for `ui` (components), `config` (ESLint, TS, Biome), and `core` (shared business logic).
- **Strict Boundaries**: Apps should depend on packages, but packages should rarely depend on apps.

**Standard Turborepo Structure:**
```text
/apps
  /web           (Next.js App)
  /docs          (Astro/Vite Docs)
  /admin         (Vite SPA)
/packages
  /ui            (Shared React Components - Tailwind, Radix)
  /core          (Shared TS types, Zod schemas, utility functions)
  /config        (Shared TypeScript, Biome, Tailwind configurations)
```

## Feature-Sliced Design (FSD) for React Apps
Within a specific application (e.g., `apps/web`), avoid grouping files strictly by type (e.g., all hooks together, all components together). Instead, group by feature or domain.

**Recommended App Structure:**
```text
/src
  /app           (Routing, layout, global providers)
  /features      (Domain-specific logic: /auth, /billing, /products)
    /auth
      /components (Login form, signup modal)
      /hooks      (useAuth)
      /api        (Auth fetch requests)
      /store      (Auth Zustand slice)
  /shared        (Cross-domain utilities, generic UI components)
    /ui          (Buttons, Modals, Inputs)
    /lib         (Date formatters, generic fetchers)
```

## React 19 & RSC Boundaries
With React 19 and Next.js App Router, the boundary between the server and the client is the most critical architectural decision.

- **Default to Server**: Every component should be a Server Component by default. Only add `"use client"` when necessary.
- **Push Client Boundaries to the Leaves**: Do not put `"use client"` at the top of the layout. Put it only on the specific interactive elements.
- **Pass Data, Not Components**: When crossing from Server to Client, pass plain serialized data as props. You can pass Server Components as `children` into Client Components.

**Example of the Composition Pattern:**
```tsx
// ServerComponent.tsx
import ClientWrapper from './ClientWrapper';
import HeavyServerLogic from './HeavyServerLogic';

export default function Page() {
  return (
    // ClientWrapper has "use client", but HeavyServerLogic remains on the server!
    <ClientWrapper>
      <HeavyServerLogic />
    </ClientWrapper>
  );
}
```

## Server Actions
Use Server Actions for all data mutations instead of building manual API endpoints. 

**Rules for Server Actions:**
- Always define them in a separate file with `"use server"` at the top for clarity.
- Always validate inputs using Zod inside the action before processing.
- Handle try/catch and return standardized object responses `{ error?: string, success?: boolean, data?: any }`.

```tsx
// actions/user.ts
"use server"
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({ name: z.string().min(2) });

export async function updateUser(formData: FormData) {
  const result = schema.safeParse({ name: formData.get("name") });
  if (!result.success) return { error: "Invalid input" };
  
  try {
    await db.user.update(result.data);
    revalidatePath("/profile");
    return { success: true };
  } catch (e) {
    return { error: "Database failure" };
  }
}
```
