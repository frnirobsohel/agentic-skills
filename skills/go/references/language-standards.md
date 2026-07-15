# Idiomatic Go Coding & Language Standards

Write readable, maintainable, and standard Go code by adhering to language conventions.

---

## 1. Code Formatting & Styling

Go has strict, built-in styling conventions. Never submit unformatted Go code:

* **Gofmt:** Always run `gofmt -s` or `goimports` on your code.
* **Variable Declarations:**
  * Use the short variable declaration operator `:=` for local variable initialization.
  * Use `var` when declaring zero-value variables or when variable type must be declared explicitly:
    ```go
    // Correct
    count := 10
    var users []User // starts as nil slice
    ```
* **Naming Conventions:**
  * Packages must be in lowercase, single-word names (e.g. `package service`, not `package userService`).
  * Exported variables, fields, or functions must be in `CamelCase` starting with an uppercase letter (e.g., `GetUser`).
  * Unexported symbols must be in `camelCase` starting with a lowercase letter (e.g., `dbSession`).

---

## 2. Explicit Error Handling

Go does not use exceptions (like `try/catch`). Errors are values and must be returned and verified explicitly:

```go
// Enforce checking of err returns
data, err := readFile("config.json")
if err != nil {
    return fmt.Errorf("failed to read config file: %w", err)
}
```

### Rules:
- **Never ignore errors:** Do not assign errors to `_` unless there is a very strong, documented reason.
- **Wrap Errors:** Use `%w` in `fmt.Errorf` to wrap errors so calling functions can query original root causes using `errors.Is` or `errors.As`.
- **Exit Early:** Handle error branches first, keeping the successful code flow aligned to the left side of the screen.

---

## 3. Go Modules (`go.mod` / `go.sum`)

* All packages must be organized within a module declared in `go.mod`.
* Never modify `go.sum` manually. Run `go mod tidy` to clean up unused imports or fetch missing modules.
