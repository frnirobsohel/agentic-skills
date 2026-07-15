# API Architecture & Interface Contracts

Well-designed APIs act as robust contracts between clients and services, ensuring scalability, maintainability, and clean decoupling.

---

## 1. Protocol Comparison & Best Use Cases

| Protocol | Transport | Best For | Trade-offs |
| :--- | :--- | :--- | :--- |
| **REST** | HTTP/1.1 or 2 | Public APIs, standard CRUD web apps, simple integrations | Over/under fetching of data |
| **GraphQL** | HTTP/1.1 or 2 | Complex clients, dashboards with diverse data fetching needs | Complex query parsing, caching complexity |
| **WebSockets** | TCP | Real-time chat, live dashboards, active notifications | State management, scale out requires Redis pub-sub |
| **gRPC** | HTTP/2 | Internal microservices communication, high-performance APIs | Poor browser support, requires schema definition (.proto) |

---

## 2. REST API Best Practices

If designing REST APIs, enforce these naming and design conventions:

* **Resource Naming:** Use plural nouns for endpoints. Never use verbs.
  * **Correct:** `GET /users`, `POST /users/123/posts`
  * **Incorrect:** `GET /getUsers`, `POST /createUser`
* **HTTP Verbs:** Use HTTP methods semantically:
  * `GET`: Retrieve data (must be idempotent & safe).
  * `POST`: Create a resource.
  * `PUT`: Replace an existing resource.
  * `PATCH`: Partially update a resource.
  * `DELETE`: Remove a resource.
* **Status Codes:** Return accurate HTTP response status codes:
  * `200 OK`: Success with payload.
  * `201 Created`: Success after resource creation.
  * `400 Bad Request`: Input validation failure.
  * `401 Unauthorized`: Authentication missing or invalid.
  * `403 Forbidden`: Authenticated, but lacks permissions.
  * `404 Not Found`: Resource does not exist.
  * `429 Too Many Requests`: Rate limit exceeded.
  * `500 Internal Server Error`: Server exception (log stack trace, do not expose to user).

---

## 3. Standard API Response Structure

Always envelope responses to maintain structural predictability:

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "usr_9281a",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### Paginated Success Response
```json
{
  "success": true,
  "data": [
    { "id": "post_1", "title": "First Post" }
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 156,
    "has_more": true
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request body failed parameter checks.",
    "details": [
      { "field": "email", "issue": "Must be a valid email format" }
    ]
  }
}
```

---

## 4. API Versioning

Always version public APIs to prevent breaking existing clients.

- **URL Versioning (Recommended):** Put version in path.
  * `https://api.example.com/v1/users`
- **Header Versioning:** Specify via custom request header.
  * `Accept: application/vnd.company.v1+json`
