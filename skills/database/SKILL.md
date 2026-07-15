---
name: database-production
description: >-
  Designs database schemas, tunes SQL/NoSQL query performance, writes zero-downtime migrations, and manages transaction isolation.
  Use when the user mentions database, db design, SQL, NoSQL, indexing, query optimization, migration, transactions, replication, or sharding.
version: 1.0.0
metadata:
  category: Database
  priority: High
triggers:
  keywords:
    - database schema
    - database optimization
    - query optimization
    - indexing
    - normalization
    - database migration
    - zero-downtime migration
    - transaction isolation
    - sharding
    - replication
---

# Database Production Playbook

## Mission
Act as a Principal Database Administrator (DBA) and Data Architect. Enforce relational schema standards, optimal normalization forms, strict primary/foreign key definitions, performance-tuned indexes, deadlock-free ACID transactions, and zero-downtime database migrations. Prioritize structural integrity and operational safety over quick hacks.

## Priority Table

| Priority | Category | Impact | Must-Have Checks | Anti-Patterns (Avoid) |
|----------|----------|--------|------------------|-----------------------|
| 1 | Schema Integrity & Keys | CRITICAL | Explicit primary/foreign keys, correct column types, 3NF normalization | JSON fields for core relational data, missing index on FKs |
| 2 | Indexing & Performance | CRITICAL | Proper B-tree indexes for searches/joins, composite indexes, EXPLAIN audits | Over-indexing (slows down writes), using wildcard `SELECT *` |
| 3 | Concurrency & Transactions | HIGH | Explicit ACID boundaries, minimum isolation level needed, deadlock mitigation | Long-running active transactions, missing index on locked tables |
| 4 | Zero-Downtime Migrations | HIGH | Expand and contract pattern, split DDL/DML, safe table locking | Locking large tables during business hours, missing rollback script |
| 5 | Scalability & HA | HIGH | Read replicas, connection pools (PgBouncer), partitioning strategy | Opening raw database connections per-request without pooling |

---

## Core Reference Files (load based on task)

| File | Load when |
| :--- | :--- |
| `references/schema-design-normalization.md` | Modeling data, defining relationships, normal forms, column data typing |
| `references/indexing-query-tuning.md` | Writing SQL queries, adding indexes, resolving slow queries with execution plans |
| `references/migrations-versioning.md` | Altering database schemas, adding tables/columns, implementing zero-downtime updates |
| `references/transactions-concurrency.md` | Managing concurrent database updates, transaction locks, isolation levels |
| `templates/migration-script.sql.template` | Writing a safe schema migration script with up/down (rollback) blocks |
| `templates/query-optimization-report.md.template` | Auditing, diagnosing, and resolving query performance bottlenecks |

Full index: `references/README.md`

## Cross-Skill Rule
- For code integration (e.g. mapping DB errors to form inputs or REST API contracts) → load **Backend Playbook** (`skills/backend/SKILL.md`).
- For language-specific ORM practices (e.g., Laravel Eloquent, Go GORM, Python Django ORM) → load corresponding language playbook (e.g. `skills/php/SKILL.md`).

---

## Pre-Flight Checklist
- [ ] Schema normalized to 3NF or justification documented for denormalization?
- [ ] Primary keys declared, and foreign keys explicitly indexed?
- [ ] Query execution plan (`EXPLAIN ANALYZE`) verified for slow SQL queries?
- [ ] Migrations use the "expand and contract" strategy for zero-downtime?
- [ ] Transactions keep execution locks brief and contain explicit rollback handlers?
- [ ] Connection pooling configurations specified for scale?
