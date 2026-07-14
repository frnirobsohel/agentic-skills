# State Management Recipes

Frontend state is often mismanaged by throwing everything into Redux or Context. Classify state correctly:

## URL State (The Most Important UI State)
Filters, pagination, active tabs, and search queries **MUST** live in the URL. If a user refreshes the page or shares the link, they should see exactly what they were looking at.

**Recipe: Using `nuqs` (Next.js URL Query State)**
```tsx
"use client"
import { useQueryState } from 'nuqs';

export function SearchFilter() {
  // Syncs seamlessly with the URL: ?query=hello
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });

  return (
    <input 
      value={query} 
      onChange={(e) => setQuery(e.target.value)} 
      placeholder="Search..." 
    />
  );
}
```

## Server State (TanStack Query v5)
Use TanStack Query for all client-side data fetching. It handles caching, retries, polling, and background updates.

**Recipe: Standard Query Setup**
```tsx
import { useQuery } from '@tanstack/react-query';

export function useUserData(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## Global Client State (Zustand)
For shared UI state (like dark mode, sidebar open state, or a shopping cart), use Zustand. It avoids the boiler-plate of Redux and the re-render cascades of React Context.

**Recipe: Zustand Store with Persist**
```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    { name: 'ui-storage' }
  )
);
```
