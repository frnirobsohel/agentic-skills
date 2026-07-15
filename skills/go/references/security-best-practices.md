# Go Backend Security Best Practices

Defend Go applications against common OWASP Top 10 exploits.

---

## 1. SQL Injection Protection

Never append strings or format variables inside raw SQL statements.

- **Standard Library `sql.DB` (Safe):** Pass variables as parameters using database-specific placeholders (`$1`, `$2` for PostgreSQL; `?` for MySQL):
  ```go
  // Safe
  query := "SELECT id, email FROM users WHERE id = $1"
  row := db.QueryRow(query, userID)
  
  // Dangerous (SQLi Vulnerable)
  query := fmt.Sprintf("SELECT id, email FROM users WHERE id = '%s'", userID)
  ```
- **GORM ORM (Safe):** Standard GORM methods parameterize queries automatically:
  ```go
  // Safe
  db.Where("email = ?", userEmail).First(&user)
  ```

---

## 2. Secure Configuration & Environments

Always parse settings from environment variables. Never hardcode credentials.

- Use packages like **viper** or **caarlos0/env** to parse configuration into structs:
  ```go
  type Config struct {
      DatabaseURL string `env:"DATABASE_URL" envDefault:"postgres://localhost:5432/db"`
      SecretKey   string `env:"SECRET_KEY,required"`
      Port        int    `env:"PORT" envDefault:"8080"`
  }
  ```

---

## 3. CORS & CSRF Defenses

Configure CORS origins explicitly when setting up web server middleware.

- **Gin CORS Middleware (Safe Example):**
  ```go
  config := cors.DefaultConfig()
  config.AllowOrigins = []string{"https://app.example.com"}
  config.AllowCredentials = true
  router.Use(cors.New(config))
  ```
- **Avoid Wildcards:** Never set `Access-Control-Allow-Origin: *` for authenticated endpoints (where cookies or Authorization headers are passed).
