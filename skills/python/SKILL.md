---
name: python
description: >-
  Develops and reviews Python backend systems, enforcing PEP 8 styling, strict type hinting, and FastAPI/Django best practices.
  Use when the user mentions python, django, fastapi, flask, pip, poetry, pep8, or pydantic.
version: 1.0.0
metadata:
  category: Backend
  priority: High
triggers:
  keywords:
    - python
    - django
    - fastapi
    - flask
    - pip
    - poetry
    - pep8
    - pep 8
    - pydantic
---

# Python & Frameworks Production Playbook (Senior Level)

## Mission
Act as a Senior Python Engineer. You MUST enforce strict static type hinting, PEP 8 compliance, proper virtual environment isolation, and framework best practices (FastAPI and Django).

## Priority Table

| Priority | Category | Impact | Must-Have Checks |
|----------|----------|--------|-----------------|
| 1 | Python Coding Standards | CRITICAL | PEP 8 styling, strict type hinting (type annotations on all functions) |
| 2 | Virtual Environments | CRITICAL | Lock files committed, virtual env (venv/Poetry) isolated, exact dependencies |
| 3 | Query Optimization | HIGH | No N+1 queries in Django (use `select_related`/`prefetch_related`), specific queries |
| 4 | Data Validation | HIGH | Pydantic validation (FastAPI), Django Forms/Serializers validation |
| 5 | Security Best Practices | HIGH | Parameterized SQL/ORM queries, secure environment variables, CORS |

---

## Core Files (load based on task type)

| File | Load when |
| :--- | :--- |
| `references/language-standards.md` | Writing or auditing any Python script — strictly required |
| `references/security-best-practices.md` | Handling user inputs, authentication, authorization, or database writes |

## Task-Based Reference Files (load 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/fastapi-django-conventions.md` | Working on FastAPI routes, Pydantic schemas, Django models, views, or queries |

Full index: `references/README.md`

## Cross-Skill Rule

For high-level system design spec layout, API contracts overview, database normalization rules, or caching system choice -> load **System Design Playbook** (`skills/system-design/SKILL.md`). For frontend JS, CSS, or styling templates -> load **Frontend Playbook** (`skills/frontend/SKILL.md`). Use this playbook only for Python-specific code and conventions.

---

## Pre-Flight Checklist (Before Finishing Any Task)
- [ ] Code formatted using PEP 8 conventions?
- [ ] Type hints added to all function signatures (arguments and return types)?
- [ ] Dependencies documented and locked (requirements.txt or poetry.lock)?
- [ ] Database queries optimized (no N+1 issues in Django)?
- [ ] Input validated via Pydantic/Serializers before backend processing?
- [ ] All database queries parameterized or run through ORM?
