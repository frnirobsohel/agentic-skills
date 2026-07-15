# Python Backend Security Best Practices

Defend Python applications against common OWASP Top 10 vulnerabilities.

---

## 1. SQL Injection Prevention

* **SQLAlchemy / Django ORM (Safe):** Django ORM and SQLAlchemy parameterize query parameters by default.
* **Raw SQL Queries (Must Bind):** Never construct raw SQL strings using string formatting (`%`, `.format()`, or f-strings). Always pass parameters as arguments:
  ```python
  # Safe
  cursor.execute("SELECT * FROM users WHERE email = %s", (user_email,))
  
  # Dangerous (SQLi Vulnerable)
  cursor.execute(f"SELECT * FROM users WHERE email = '{user_email}'")
  ```

---

## 2. Secure Environment Variables Configuration

Never commit API keys, database credentials, or secret keys to version control.

- Use **pydantic-settings** (FastAPI) or **python-dotenv** to parse settings from a `.env` file.
- Enforce type checks and default values for config schemas:
  ```python
  from pydantic_settings import BaseSettings

  class Settings(BaseSettings):
      database_url: str
      secret_key: str
      debug: bool = False

      class Config:
          env_file = ".env"

  settings = Settings()
  ```

---

## 3. CORS & CSRF Defenses

* **CORS Middleware (FastAPI):** Configure CORS origins explicitly. Avoid wildcard `allow_origins=["*"]` for routes handling cookie auth:
  ```python
  from fastapi.middleware.cors import CORSMiddleware

  app.add_middleware(
      CORSMiddleware,
      allow_origins=["https://dashboard.example.com"],
      allow_credentials=True,
      allow_methods=["GET", "POST"],
      allow_headers=["*"],
  )
  ```
* **CSRF (Django):** Keep `django.middleware.csrf.CsrfViewMiddleware` active in `MIDDLEWARE` settings. Include `{% csrf_token %}` in all forms template views.

---

## 4. Package Dependency Auditing

Audit your locked dependencies regularly for known vulnerabilities:
- Run `pip-audit` or `safety check` in your local development or CI/CD pipelines:
  ```bash
  pip-audit
  ```
