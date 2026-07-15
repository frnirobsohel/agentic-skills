# PHP & Laravel Security Best Practices

Write secure PHP applications by defending against common web vulnerabilities (OWASP Top 10).

---

## 1. SQL Injection Prevention

Never construct raw SQL queries by concatenating input variables.

- **Eloquent / Query Builder (Safe):** Laravel handles parameter binding automatically when using standard ORM methods:
  ```php
  // Safe
  $user = User::where('email', $email)->first();
  ```
- **Raw SQL (Must use bindings):** If you must write raw SQL, always use parameter placeholders:
  ```php
  // Safe
  $users = DB::select('select * from users where active = ?', [$activeStatus]);
  ```

---

## 2. Preventing Cross-Site Scripting (XSS)

* **Blade Escaping:** Blade's standard double curly braces `{{ $variable }}` automatically escape output through PHP's `htmlspecialchars()` function.
* **Raw Unescaped Output:** Avoid using `{!! $variable !!}` unless you are rendering trusted HTML. If rendering user input, sanitize it first using a library like HTMLPurifier.
* **Escaping in Plain PHP:** If writing vanilla PHP, manually escape all dynamic output:
  ```php
  echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
  ```

---

## 3. CSRF (Cross-Site Request Forgery) Protection

* **CSRF Middleware:** Enforce CSRF middleware globally for all state-changing routes (`POST`, `PUT`, `PATCH`, `DELETE`).
* **Forms:** Include the `@csrf` Blade directive inside HTML forms to generate the hidden token input:
  ```html
  <form method="POST" action="/profile">
      @csrf
      <!-- form inputs -->
  </form>
  ```
* **AJAX Requests:** Pass the token in request headers (e.g., `X-CSRF-TOKEN`) extracted from the meta tag.

---

## 4. Secure Password Hashing

Never store plain-text passwords or use weak algorithms (e.g., `md5`, `sha1`).

- Always use modern cryptographic hashes like `Argon2id` or `Bcrypt`.
- **Laravel Hash Facade:**
  ```php
  use Illuminate\Support\Facades\Hash;

  $hashedPassword = Hash::make($plainPassword);
  ```

---

## 5. Session & Cookie Security

Set secure session settings in `config/session.php`:
- `encrypt` => `true` (encrypts session payloads).
- `secure` => `true` (only sends cookies over HTTPS).
- `http_only` => `true` (prevents Javascript access to session cookies).
- `same_site` => `'lax'` or `'strict'` (mitigates CSRF).
