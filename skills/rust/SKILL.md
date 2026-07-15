---
name: rust
description: >-
  Develops and reviews systems-level, highly performant, and memory-safe applications in Rust, enforcing borrow checking and async concurrency safety.
  Use when the user mentions rust, cargo, axum, actix, serde, borrow checker, lifetime, lifetimes, or tokio.
version: 1.0.0
metadata:
  category: Backend
  priority: High
triggers:
  keywords:
    - rust
    - cargo
    - axum
    - actix
    - serde
    - borrow checker
    - lifetime
    - lifetimes
    - tokio
---

# Rust & Systems Production Playbook (Senior Level)

## Mission
Act as a Principal Rust Engineer. Enforce compiler-driven development, strict ownership and borrowing rules, explicit error propagation (avoiding panics), concurrency safety, and zero-overhead performance.

## Priority Table

| Priority | Category | Impact | Must-Have Checks |
|----------|----------|--------|-----------------|
| 1 | Compiler Standards | CRITICAL | Code compiles cleanly, zero warnings from `cargo clippy`, formatted via `rustfmt` |
| 2 | Error Handling | CRITICAL | Proper use of `Result` / `Option`, explicit matching or `?` operator, no unchecked `.unwrap()` |
| 3 | Concurrency Safety | HIGH | Thread safety verified (Send/Sync requirements), safe locks usage, async tasks managed via Tokio |
| 4 | DB & Data Safety | HIGH | Parameterized SQL requests using SQLx macros or Diesel queries, correct Serde annotations |
| 5 | Memory Safety | HIGH | Safe safe Rust by default, strict code review constraints on any `unsafe` block declarations |

---

## Core Files (load based on task type)

| File | Load when |
| :--- | :--- |
| `references/language-standards.md` | Designing, writing, or reviewing any Rust crates or modules |
| `references/security-best-practices.md` | Handling untrusted parsing (Serde), database calls (SQLx), or web requests |

## Task-Based Reference Files (load 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/concurrency-async.md` | Spawning Tokio tasks, setting up async channels, mutexes, or select timeouts |

Full index: `references/README.md`

## Cross-Skill Rule

For multi-container orchestrations (Kubernetes, Dockerfiles, GitHub Actions) -> load **DevOps Playbook** (`skills/devops/SKILL.md`). For databases scaling patterns, system caching topology, or message brokers setups -> load **System Design Playbook** (`skills/system-design/SKILL.md`). Use this playbook only for Rust code standards.

---

## Pre-Flight Checklist (Before Finishing Any Task)
- [ ] Code successfully compiles with `cargo build`?
- [ ] No compilation warnings or suggestions from `cargo clippy`?
- [ ] Checked for unwraps? All fallible conversions handled via safe error mapping?
- [ ] Borrowing and lifetimes are solved explicitly without lifetime-related compiler bugs?
- [ ] Multi-threaded access to states wrapped in Arc/Mutex or structured via message-passing channels?
- [ ] Any `unsafe` code sections strictly justified, documented, and minimized?
