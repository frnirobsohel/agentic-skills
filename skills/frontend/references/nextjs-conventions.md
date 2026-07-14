# Next.js 15 & React 19 Specific Conventions

These are STRICT rules based on Vercel's official `AGENTS.md` standard and the `vercel-react-best-practices` skill.

---

## 1. Server vs Client Component Rules (Mandatory)

- **Default to Server Components**. Add `"use client"` ONLY when the component uses hooks, event listeners, or browser APIs.
- **Push `"use client"` to leaf nodes**. NEVER put `"use client"` on a layout, page, or wrapper component.
- **Never import server-only code inside a Client Component**. Use the `server-only` npm package to enforce this at build time.
- **Pass Server Components as `children`** into Client Components to avoid pulling server code into the client bundle.

```tsx
// ✅ CORRECT — Server Component wraps Client Component
// page.tsx (Server Component)
export default function Page() {
  return (
    <InteractiveShell> {/* Client Component */}
      <HeavyDataComponent /> {/* Stays on the server! */}
    </InteractiveShell>
  );
}

// ❌ WRONG — Importing server logic into a client component
"use client"
import { HeavyDataComponent } from './HeavyDataComponent'; // This pulls server code into the bundle!
```

## 2. Page File Co-location Rules (Mandatory)

Every `page.tsx` MUST have these sibling files. No exceptions:

```text
/app/(routes)/dashboard/
  page.tsx        ← The page
  loading.tsx     ← REQUIRED: Suspense fallback skeleton
  error.tsx       ← REQUIRED: Error boundary fallback
  not-found.tsx   ← Recommended: Custom 404 for this route
```

`loading.tsx` must contain a skeleton that matches the approximate layout of `page.tsx`. Never use a generic spinner.

`error.tsx` must contain a user-friendly error message with a "Try Again" (`router.refresh()`) button.

## 3. Data Fetching Rules (Mandatory)

- **Never use `useEffect` to fetch data** in a component. Use TanStack Query (client-side) or Server Components (server-side).
- **For all mutations, use Server Actions**, not `fetch()` to an API route. Server Actions are type-safe and co-located.
- **Call `revalidatePath()` or `revalidateTag()` immediately after every mutation** in a Server Action.
- **Never call multiple sequential awaits** when you can parallelize. Use `Promise.all()`.

```tsx
// ✅ CORRECT — Parallel data fetching in Server Component
export default async function DashboardPage() {
  const [user, posts, stats] = await Promise.all([
    getUser(),
    getPosts(),
    getStats(),
  ]);
  return <Dashboard user={user} posts={posts} stats={stats} />;
}

// ❌ WRONG — Sequential waterfalls
const user = await getUser();
const posts = await getPosts(); // waits for getUser unnecessarily
```

## 4. Server Actions Rules (Mandatory)

Every Server Action must follow this exact pattern:

```tsx
// actions/post.ts
"use server"
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(10),
});

export async function createPost(formData: FormData) {
  // 1. Authenticate
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  // 2. Validate with Zod
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  // 3. Execute
  try {
    await db.post.create({ data: { ...result.data, userId: session.user.id } });
    revalidatePath("/posts"); // 4. ALWAYS revalidate
    return { success: true };
  } catch {
    return { error: "Failed to create post." };
  }
}
```

## 5. Caching Rules (Mandatory)

- Use `unstable_cache` for expensive server-side computations.
- Tag all cache entries: `{ tags: ['posts', `post-${id}`] }`.
- Use `revalidateTag()` for fine-grained cache invalidation.
- Never use `cache: 'no-store'` globally. Use it only on routes that need real-time data.

## 6. Image & Font Rules (Mandatory)

- **Always use `next/image`** for any image. Never use `<img>`.
- Set the `priority` prop on any image that is visible above the fold (LCP image).
- **Always use `next/font`** to load fonts. Never load fonts from a `<link>` tag in `_document` or `layout.tsx` directly.
- Set explicit `width` and `height` on all `next/image` components to prevent CLS.

## 7. Metadata Rules (Mandatory)

Every page MUST export a `generateMetadata` function or a static `metadata` object:

```tsx
// ✅ CORRECT — Static metadata
export const metadata: Metadata = {
  title: 'Dashboard | MyApp',
  description: 'View your project dashboard.',
};

// ✅ CORRECT — Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  return { title: `${post.title} | MyApp` };
}
```
