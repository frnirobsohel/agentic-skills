# Database Playbook Reference Index

Modular deep-dive docs for the [Database Production Playbook](../SKILL.md). Load only the files relevant to the current task.

## Core Reference Files

| File | Use when |
| :--- | :--- |
| [schema-design-normalization.md](schema-design-normalization.md) | Relational database schema design, keys, datatypes, normalization rules. |
| [indexing-query-tuning.md](indexing-query-tuning.md) | Designing SQL indexes, reading query plans, optimizing SQL performance. |
| [migrations-versioning.md](migrations-versioning.md) | Planning zero-downtime database migration patterns. |
| [transactions-concurrency.md](transactions-concurrency.md) | ACID transactions, database locks, isolation levels, deadlock prevention. |

## Starter Templates

| File | Use when |
| :--- | :--- |
| [migration-script.sql.template](../templates/migration-script.sql.template) | Writing a structured, safe DDL schema migration script. |
| [query-optimization-report.md.template](../templates/query-optimization-report.md.template) | Auditing and tuning a slow SQL execution query. |
