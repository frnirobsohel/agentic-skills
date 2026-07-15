# API Contracts & Type Safety

This module provides best practices and guidelines for designing client-server interfaces, achieving end-to-end type safety, and utilizing contract-first development.

---

## ⚡ Core Philosophy
An API contract is a binding agreement between the backend and frontend. Designing and enforcing contracts prevents integration errors, reduces debugging loops, and enables teams to work in parallel.

---

## 🛠️ Best Practices

### 1. Schema-First Development
- **Define schemas first**: Write OpenAPI (Swagger) specs, GraphQL schemas, or tRPC definitions before implementing routes or database queries.
- **Single Source of Truth**: The schema file (e.g., `openapi.yaml`, `schema.graphql`) is the source of truth. Do not make ad-hoc payload changes in backend code without updating the schema.
- **Auto-Generate Types**: Generate client-side TypeScript types or SDKs directly from the schema (e.g., `openapi-typescript`, `graphql-codegen`).

### 2. Standardized Response Envelope
API responses must follow a predictable layout:
- **Single Item**:
  ```json
  {
    "data": {
      "id": "usr_12345",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
  ```
- **Paginated Collection**:
  ```json
  {
    "data": [
      { "id": "usr_12345", "name": "Jane Doe" }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 15,
      "total_items": 120,
      "total_pages": 8
    }
  }
  ```

### 3. Preventing Frontend Breakages
- **Never delete or rename fields**: Use backward-compatible additions. If a field is obsolete, mark it `@deprecated` in the schema and deprecate it gracefully.
- **Nullability and Optionals**: Explicitly define which fields can be `null` or are optional (`?`). Unspecified nullability leads to runtime crashes on the frontend (e.g., `TypeError: Cannot read properties of null`).
- **Semantic Versioning**: Use API versioning prefixing (`/api/v1/users`) or custom headers when making breaking modifications.

---

## 🚫 Anti-Patterns to Avoid
- ❌ **Typing API Responses as `any`**: Defeats type safety. Always assign generated schema types to API client responses.
- ❌ **Direct Database to API Handoff**: Do not serialize database models directly to the response without a DTO (Data Transfer Object) or serializer layer. Database column changes should not leak to the API contract.
- ❌ **Implicit Query Parameter Parsing**: Ensure query parameters (e.g., `?limit=10&page=2`) are coerced, validated (e.g., with Zod/Pydantic), and typed on the server.
