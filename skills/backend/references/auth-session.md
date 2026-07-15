# Authentication & Session Synchronization

This module defines standard practices for securing token lifecycles, authenticating requests, managing cookies, and syncing session states between frontend clients and backend APIs.

---

## ⚡ Core Philosophy
Security is paramount in fullstack applications. Authentication tokens must be stored securely, protected from XSS and CSRF attacks, and refreshed silently without causing session disruption or visual flickering.

---

## 🛠️ Best Practices

### 1. Token Storage & Security
- **Prefer Secure Cookies**: Store authentication tokens (both access and refresh tokens) in `httpOnly`, `Secure`, and `SameSite=Lax` (or `Strict`) cookies. This prevents JavaScript from accessing tokens, mitigating Cross-Site Scripting (XSS) vulnerabilities.
- **Avoid LocalStorage for Sensitive Data**: Do not store long-lived JSON Web Tokens (JWTs) in `localStorage` or `sessionStorage`, as these storages are vulnerable to XSS extraction.
- **CSRF Mitigations**: When using cookies for APIs, utilize anti-CSRF tokens or verify request origin headers (`Origin`, `Referer`) in mutating requests (POST, PUT, DELETE).

### 2. Silent JWT Refresh Loop
Implement an Axios or fetch interceptor that detects expired access tokens (`401 Unauthorized`) and automatically runs a refresh flow:

```javascript
// Example: Axios Interceptor for Silent Refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is 401 and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Request new access token using secure refresh cookie
        await apiClient.post('/api/auth/refresh');
        
        // Retry the original request with new session context
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid/expired -> log user out
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```

### 3. Preventing Auth State Flicker
- **Initial Session Verification**: When the frontend boots, it must verify the user's login state before mounting routes (e.g., executing a fast `/api/auth/me` call). Show a loading skeleton or landing screen during this check to prevent a flash of unauthenticated UI.
- **Synchronized Middleware**: Protect routes on the client side using router-level middleware (e.g., Next.js middleware, React Router loaders) for user experience, but **always** enforce access permissions on the backend API level. Never rely solely on client-side route guards.

---

## 🚫 Anti-Patterns to Avoid
- ❌ **Client-Only Permission Checks**: Relying on frontend flags (e.g., `user.role === 'admin'`) to protect sensitive actions. The backend must always re-authorize the user request context.
- ❌ **Infinite Lifespan JWTs**: Issuing access tokens that never expire. Access tokens should expire in 10-15 minutes, with refresh tokens expiring in 1-7 days.
- ❌ **Redirect Loops on Expiration**: Triggering nested auth checks that cause infinite browser redirects between `/login` and protected routes when a session expires.
