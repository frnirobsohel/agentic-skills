# Scalability, Caching & System Security

Architect applications to handle unexpected load while protecting user data from security exploits.

---

## 1. System Scalability Principles

- **Stateless Services:** Always build backend services to be stateless. Never store user sessions, uploads, or state in the local memory of a single container. Use Redis for session state and cloud storage (e.g. AWS S3) for files.
- **Horizontal Scaling:** scale servers horizontally by running multiple identical containers behind a Load Balancer (e.g., NGINX, AWS ALB, Cloudflare).
- **Database Scaling:** When SQL databases hit limit, apply:
  - **Read Replicas:** Send `SELECT` queries to read-only replicas, and write queries to the primary DB.
  - **Connection Pooling:** Use connection pools (e.g., PgBouncer) to prevent database thread exhaustion.

---

## 2. Caching Architecture

Caching speeds up read requests and protects databases from load spikes.

### Cache-Aside Pattern (Recommended)
This is the standard caching strategy for web apps:

```text
[Client Request]
       │
       ▼
 [Check Cache] ──(Hit: Return Data)──► [Done]
       │
     (Miss)
       ▼
  [Query DB] ──► [Write to Cache] ──► [Return Data] ──► [Done]
```

### Cache Rules:
1. **Time-To-Live (TTL):** Always set a TTL on every cache key. Do not store cache indefinitely.
2. **Cache Invalidation:** When updating database records, proactively delete the corresponding cache key to prevent stale reads.
3. **CDN (Content Delivery Network):** Cache all static assets (JS, CSS, images) and static HTML at the network edge using Cloudflare, Fastly, or CloudFront.

---

## 3. Core Security Rules

- **HTTPS / TLS:** Force HTTPS globally. Secure cookies must have `Secure`, `HttpOnly`, and `SameSite=Lax/Strict` attributes to prevent cross-site scripting (XSS) extraction.
- **CORS (Cross-Origin Resource Sharing):** Never use wildcard origins (`Access-Control-Allow-Origin: *`) for endpoints that process cookies or authorization headers. Declare explicit trusted domains.
- **Rate Limiting:** Implement rate limiting (e.g., sliding window algorithm in Redis) on critical routes, especially login, signup, and password reset endpoints.
- **Input Sanitization & Parameterization:**
  - Prevent SQL Injection: Never construct SQL strings via concatenation. Always use parameterized queries or trusted ORMs.
  - Prevent XSS: Sanitize HTML content before rendering it on screen using tools like DOMPurify or server-side escape libraries.
