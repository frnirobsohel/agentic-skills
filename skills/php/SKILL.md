---
name: php
description: >-
  Develops and reviews modern PHP and Laravel applications, enforcing PSR standards, database optimization, and security practices.
  Use when the user mentions php, laravel, composer, psr, eloquent, artisan, blade, or symfony.
version: 1.0.0
metadata:
  category: Backend
  priority: High
triggers:
  keywords:
    - php
    - laravel
    - composer
    - psr
    - eloquent
    - artisan
    - blade
    - symfony
---

# PHP & Laravel Production Playbook (Senior Level)

## Mission
Act as a Senior PHP/Laravel Engineer. Enforce modern PHP standards, strict typing, clean separation of concerns, and robust security. Always consult relevant reference files before writing code.

## Priority Table

| Priority | Category | Impact | Must-Have Checks |
|----------|----------|--------|-----------------|
| 1 | PHP Coding Standards | CRITICAL | PSR-12/PER styling, `declare(strict_types=1);` in all PHP files |
| 2 | Security Best Practices | CRITICAL | CSRF tokens, PDO/Eloquent query parametrization, input validation, Argon2id/Bcrypt |
| 3 | Query Optimization | HIGH | No N+1 queries (`with()`), index on foreign keys, select specific columns |
| 4 | Component Architecture | HIGH | Service/Repository pattern for business logic, Form Requests for validation |
| 5 | Dependency Management | HIGH | Lock files committed, clean composer.json, strict semver limits |

---

## Core Files (load based on task type)

| File | Load when |
| :--- | :--- |
| `references/language-standards.md` | Writing or auditing any PHP script — strictly required |
| `references/security-best-practices.md` | Handling user inputs, authentication, authorization, or database writes |

## Task-Based Reference Files (load 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/laravel-conventions.md` | Working on Laravel models, controllers, routes, migrations, or views |

Full index: `references/README.md`

## Cross-Skill Rule

For API contract specifications, overall database schemas, or caching system topology -> load **System Design Playbook** (`skills/system-design/SKILL.md`). For CSS styling, Blade views styling, or front-end JS logic -> load **Frontend Playbook** (`skills/frontend/SKILL.md`). Use this playbook exclusively for PHP/Laravel logic and standards.

---

## Pre-Flight Checklist (Before Finishing Any Task)
- [ ] Added `declare(strict_types=1);` to all new PHP files?
- [ ] Coding styles comply with PSR-12 / PER standard?
- [ ] Eloquent database queries optimized (no N+1 issues)?
- [ ] Input validated via Request/Form Requests before processing?
- [ ] Sensitive database operations parameterized or run through ORM?
- [ ] CSRF middleware active for state-changing routes?
