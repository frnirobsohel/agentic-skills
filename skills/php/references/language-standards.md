# Modern PHP Language Standards

Follow modern PHP standards and syntax rules (PHP 8.x+) to write robust, maintainable, and type-safe backend code.

---

## 1. Strict Typing

Always enforce strict parameter and return type evaluation. Add this at the absolute top of **every** PHP file before any other code:

```php
<?php

declare(strict_types=1);

namespace App\Services;
```

### Benefits:
- Prevents silent type coercions (e.g., converting float `"1.5"` to int `1` without warnings).
- Throws a `TypeError` if method signatures do not match inputs.

---

## 2. PSR (PHP Standard Recommendation) Compliance

We follow the PHP-FIG standards. The most critical standards to adhere to:

* **PSR-1 (Basic Coding Standard):**
  * Use `<?php` tags only (never use short tags `<?`).
  * Files should only declare symbols (classes, functions, constants) or cause side-effects (outputting HTML, modifying settings) — never both.
  * Class names must be declared in `StudlyCaps`.
* **PSR-4 (Autoloading):**
  * Map namespaces directly to folder paths (e.g., `App\Models\User` maps to `app/Models/User.php`).
* **PSR-12 / PER (Coding Style Guide):**
  * Use 4 spaces for indentation (never tabs).
  * Keywords must be in lowercase (e.g., `true`, `false`, `null`, `as`).
  * Method and property names must be declared in `camelCase`.
  * Class opening braces `{` must go on the next line; method opening braces must also go on the next line.
  ```php
  class UserService
  {
      public function getUserById(int $id): ?User
      {
          return User::find($id);
      }
  }
  ```

---

## 3. Modern PHP 8.x Features

Write cleaner code by leveraging modern language capabilities:

### Constructor Property Promotion
Instead of declaring properties and assigning them in constructors:
```php
// Modern PHP 8.x
class OrderProcessor
{
    public function __construct(
        protected PaymentGateway $gateway,
        private LoggerInterface $logger
    ) {}
}
```

### Match Expressions (replaces complex switch statements)
```php
$statusText = match ($statusCode) {
    200, 201 => 'success',
    400 => 'bad request',
    default => 'unknown error',
};
```

### Nullsafe Operator
```php
// Prevents nested null checks
$country = $user?->profile?->address?->country;
```
