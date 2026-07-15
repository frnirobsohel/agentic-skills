# Modern Python Language Standards

Follow modern Python guidelines (Python 3.10+) to ensure clean, type-safe, and PEP 8 compliant codebase.

---

## 1. Coding Style & Formatter Compliance (PEP 8)

We enforce PEP 8 coding style standards. Always use a tool like Black, Ruff, or autopep8 to format files.

* **Indentation:** Use 4 spaces per indentation level. Never use tabs.
* **Naming Conventions:**
  * Classes: `PascalCase` (e.g., `UserService`).
  * Functions, methods, and variables: `snake_case` (e.g., `get_user_by_id`).
  * Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).
* **Imports:**
  * Group imports in the following order: (1) Standard library, (2) Third-party libraries, (3) Local application imports. Separate groups with a blank line.
  * Avoid wildcard imports (`from module import *`).

---

## 2. Type Hinting & Static Analysis

Python is dynamically typed, but static type checking is critical for preventing runtime crashes. Enforce type hints on all functions and methods:

```python
# Modern Python 3.10+ syntax
def calculate_total(price: float, tax_rate: float) -> float:
    return price * (1 + tax_rate)

# Use "|" instead of Optional or Union in Python 3.10+
def find_user(user_id: int) -> dict | None:
    # database retrieval logic
    return None
```

- Enforce type checking in development using **mypy** or Pyright.
- Declare variables with type annotations if their type is ambiguous.

---

## 3. Dependency & Environment Isolation

Never install python packages globally. Always use project-level dependency isolation.

- **Venv (Standard Library):**
  * Create: `python -m venv .venv`
  * Activate (Windows): `.\.venv\Scripts\activate`
  * Activate (Unix/Mac): `source .venv/bin/activate`
- **Poetry (Modern Recommended):**
  * Use Poetry for package dependency locking and version resolution.
  * Always commit the `poetry.lock` and `pyproject.toml` files to version control.
