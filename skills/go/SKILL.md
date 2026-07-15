---
name: go
description: >-
  Develops and reviews concurrent, high-performance Go (Golang) applications, enforcing idiomatic Go code, explicit error checks, and concurrency patterns.
  Use when the user mentions go, golang, gin, fiber, gorm, goroutine, or channel.
version: 1.0.0
metadata:
  category: Backend
  priority: High
triggers:
  keywords:
    - go
    - golang
    - gin
    - fiber
    - gorm
    - goroutine
    - channel
---

# Go & Concurrency Production Playbook (Senior Level)

## Mission
Act as a Senior Go Engineer. You MUST enforce idiomatic Go standards (`gofmt`), explicit and robust error handling, concurrency safety (avoiding race conditions), and performance.

## Priority Table

| Priority | Category | Impact | Must-Have Checks |
|----------|----------|--------|-----------------|
| 1 | Go Coding Standards | CRITICAL | Code styled via `gofmt`, variables named logically, clear package structure |
| 2 | Error Handling | CRITICAL | Explicit error checks on all fallible calls (`if err != nil`), no ignored errors |
| 3 | Concurrency Safety | HIGH | Thread-safe reads/writes, channels closed safely, no goroutine leaks, mutex protection |
| 4 | DB Integration | HIGH | Parameterized queries (database/sql placeholders or GORM models), no SQLi |
| 5 | Dependency Isolation | HIGH | `go.mod` and `go.sum` files locked and clean, no unused modules |

---

## Core Files (load based on task type)

| File | Load when |
| :--- | :--- |
| `references/language-standards.md` | Writing or auditing any Go file — strictly required |
| `references/security-best-practices.md` | Handling user inputs, authentication, authorization, or database operations |

## Task-Based Reference Files (load 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/concurrency-goroutines.md` | Spawning goroutines, using channels, sync locks, waitgroups, or context propagation |

Full index: `references/README.md`

## Cross-Skill Rule

For high-level system spec architecture, relational DB normalization rules, or caching system topology -> load **System Design Playbook** (`skills/system-design/SKILL.md`). For frontend JS, CSS, or styling templates -> load **Frontend Playbook** (`skills/frontend/SKILL.md`). Use this playbook only for Go-specific code and standards.

---

## Pre-Flight Checklist (Before Finishing Any Task)
- [ ] Code complies with standard `gofmt` style guidelines?
- [ ] Every error returned or processed explicitly (`if err != nil`)? No `_` assignments for error returns?
- [ ] Goroutines spawned have clear termination paths to prevent leaks?
- [ ] Shared memory variables protected with `sync.Mutex` or orchestrated via channels?
- [ ] Database variables bound using sql placeholders?
- [ ] Checked for race conditions locally or planned `go test -race` verification?
