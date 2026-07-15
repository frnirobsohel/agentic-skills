# Rust Backend Security Best Practices

Write robust, memory-safe, and secure Rust applications.

---

## 1. SQL Injection Protection

Ensure SQL variables are bound parameterized, never string formatted.

- **SQLx Query Macro (Safe):** Compiles SQL queries checking database tables schemas at compile-time and binds variables dynamically:
  ```rust
  // Safe: compiled checked and bound parameterized
  let user = sqlx::query_as::<_, User>("SELECT id, email FROM users WHERE id = $1")
      .bind(user_id)
      .fetch_one(&pool)
      .await?;
  ```
- **Avoid:** String formatting query statements (e.g. `format!("... WHERE id = '{}'", user_id)`).

---

## 2. Safe Parsing with Serde

Serde protects against memory exploits when parsing payloads. However, ensure length limits are verified for JSON inputs:

- Limit reader buffer sizes on incoming requests before passing to `serde_json::from_reader`.
- In Axum or Actix web handlers, configure default body limits (e.g. `axum::extract::DefaultBodyLimit::max(1024 * 1024)`).

---

## 3. Unsafe Blocks Policy

- Avoid declaring `unsafe` blocks.
- Memory corruption can only occur inside `unsafe` code. If you must use `unsafe` to execute system calls or interact with C libraries, isolate it inside separate, documented interfaces.

---

## 4. Preventing Panics

A panic inside a thread can shut down thread schedulers or leak server errors.

- **Never use `.unwrap()` in production.** Prefer using `.ok_or()` or return custom Errors:
  ```rust
  // Dangerous
  let id = req.id.unwrap();
  
  // Safe
  let id = req.id.ok_or(AppError::MissingField("id"))?;
  ```
- Configure HTTP middleware handlers to catch panics and return generic `500 Internal Server Error` responses, preventing application crashes.
