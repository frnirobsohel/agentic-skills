# Idiomatic Rust Coding & Language Standards

Write compiler-safe, readable, and standard Rust code by adhering to tooling and language paradigms.

---

## 1. Rustfmt & Clippy

Rust compiler guidelines are strict. Enforce standard code formats:

* **Formatting:** Always run `cargo fmt` to format all crates.
* **Lint Checks:** Verify code style against clippy. Always run:
  ```bash
  cargo clippy --all-targets --all-features -- -D warnings
  ```
* **Naming Conventions:**
  * Packages/crates, modules, and local variables must be named in `snake_case`.
  * Structs, Enums, Traits, and Types must be named in `CamelCase`.
  * Constants must be named in `SCREAMING_SNAKE_CASE`.

---

## 2. Ownership & Borrowing Rules

Respect the compiler's borrow checker to ensure compile-time memory safety:

* **Single Writer OR Multiple Readers:** You can have either one mutable reference (`&mut T`) OR any number of immutable references (`&T`) to a variable in a scope, but never both.
* **Clone vs. Borrow:** Avoid unnecessary `.clone()` calls on data types that implement cheap copy / borrow references. Prefer borrowing (`&str` instead of `&String`, `&[T]` instead of `&Vec<T>`).
* **Lifetimes:** Annotate explicit lifetimes (`'a`) only when the compiler cannot infer references lifetime scopes automatically.

---

## 3. Explicit Error Handling

Never ignore fallible returns. Avoid throwing runtime panics via `.unwrap()` or `.expect()` unless in test files:

```rust
// Good: Propagating errors using the ? operator
fn read_config(path: &str) -> Result<Config, io::Error> {
    let mut file = File::open(path)?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;
    let config = parse_config(&content)?;
    Ok(config)
}
```

* Use custom error enums with **thiserror** (for library crates) or **anyhow** (for binary applications) to cleanly represent and wrap different error scenarios.
