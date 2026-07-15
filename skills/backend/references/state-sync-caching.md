# State Synchronization & Caching

This module details how to synchronize client-side application states with backend databases, design caching layers, and implement optimistic updates.

---

## ⚡ Core Philosophy
Modern web applications should feel instantaneous. By leveraging caching strategies like Stale-While-Revalidate (SWR) and performing Optimistic Updates, we minimize perceived latency and provide smooth experiences.

---

## 🛠️ Best Practices

### 1. Query Key Architecture (TanStack Query / SWR)
- **Hierarchical keys**: Group caching keys by namespace and specific identifiers:
  - List of users: `['users', 'list', { active: true }]`
  - Single user: `['users', 'detail', userId]`
- **Invalidate selectively**: After running a mutation (e.g., updating a user's details), invalidate specific query keys to trigger background updates:
  ```javascript
  // Invalidate specific user cache and refetch list
  queryClient.invalidateQueries({ queryKey: ['users', 'detail', userId] });
  queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
  ```

### 2. Optimistic UI Updates
When a user updates a resource (e.g., liking a post), do not wait for the backend response to update the UI. Render the success state immediately, perform the backend mutation, and rollback if a failure occurs:

```javascript
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // 1. Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    
    // 2. Snapshot the current state
    const previousTodos = queryClient.getQueryData(['todos']);
    
    // 3. Optimistically update client-side cache
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
    
    // 4. Return context containing snapshot for rollback
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    // 5. Rollback to snapshot on failure
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  onSettled: () => {
    // 6. Invalidate to sync final state with server
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});
```

### 3. Server-Driven UI States
The backend must send standard indicators so the frontend can render appropriate layouts:
- **Empty States**: If a query returns no records, return a success status code (`200 OK`) with an empty array `[]` (never `null` or a `404 Not Found` error). An empty array allows the frontend to easily display a beautiful "Empty State" component rather than crashing or showing a loading spinner forever.
- **Skeletons vs. Spinners**: Avoid loading spinners for large layouts. Skeletons matching the structural layout of the expected data should be rendered to keep Cumulative Layout Shift (CLS) under 0.1.

---

## 🚫 Anti-Patterns to Avoid
- ❌ **Ignoring Mutation Statuses**: Submitting a form and leaving the user in limbo with no visual loading feedback. Disables submit buttons, show loaders on mutations.
- ❌ **Polling Without Backoff**: Constantly requesting backend resources in a `setInterval` loop. Use Exponential Backoff or WebSockets instead.
- ❌ **Over-caching Mutable Data**: Setting infinite cache times on highly volatile records without setting up explicit validation hooks or mutation invalidation triggers.
