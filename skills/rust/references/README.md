# Rust Reference Index

Modular deep-dive docs for the [Rust & Systems Playbook](../SKILL.md). Load only the files relevant to the current task.

## Always-on (every rust coding task)

| File | Use when |
| :--- | :--- |
| [language-standards.md](language-standards.md) | Standard syntax, ownership/borrowing, clippy lint checks, Result/Option, Cargo |
| [security-best-practices.md](security-best-practices.md) | Safe parsing (Serde), sqlx parameter binding, avoiding unsafe, panic defenses |

## Task-based (load on demand)

| File | Use when |
| :--- | :--- |
| [concurrency-async.md](concurrency-async.md) | Spawning Tokio tasks, using async channels, tokio select!, async locking |
