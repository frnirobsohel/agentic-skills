# Database Migrations & Version Control

This module outlines standard methodologies for executing zero-downtime database migrations, managing schema versioning, and planning rollback operations.

---

## ⚡ Core Philosophy
Database migrations must never take the application offline. Structuring DDL (Data Definition Language) scripts using incremental, non-blocking phases ensures high availability.

---

## 🛠️ Best Practices

### 1. Zero-Downtime Migrations (Expand and Contract Pattern)
When executing breaking schema updates (e.g. renaming a column or changing a relationship type), split the operation into distinct, safe releases:
1. **Phase 1 (Expand)**: Add the new column/table, allowing it to be nullable. Update the application to write to both the old and new columns.
2. **Phase 2 (Migrate)**: Backfill data from the old columns to the new columns in batch loops (throttled to avoid table locking).
3. **Phase 3 (Switch)**: Update the application to read from the new columns only.
4. **Phase 4 (Contract)**: Drop the old columns/tables and add any `NOT NULL` constraints or indexes to the new schema.

### 2. Splitting DDL and DML
- **DDL (Schema changes)**: Adding tables, modifying columns, dropping columns. Keep DDL scripts separate.
- **DML (Data modifications)**: Backfilling data, updating status flags.
- **Why?** DML operations can take a long time on large tables. Executing DDL alongside long-running DML blocks other database connections, causing pool starvation.

### 3. Avoiding Table Locking Disasters
- **Adding columns with defaults**: In older databases, adding a column with a default value (`ADD COLUMN status VARCHAR DEFAULT 'active'`) rewrites the entire table, locking it. Specify defaults in the application layer, or ensure the DB handles defaults as instant metadata operations.
- **Setting locks timeout**: Always set short lock timeouts before running migrations on busy production databases to prevent migration scripts from queuing behind slow queries:
  ```sql
  SET lock_timeout = '2s'; -- PostgreSQL: Abort if lock cannot be acquired in 2 seconds
  ```
- **Concurrently indexing**: In PostgreSQL, always build indexes with `CONCURRENTLY` to avoid blocking read/write locks on the table:
  ```sql
  CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
  ```

### 4. Rollback Readiness
- Every migration script must be accompanied by a validated **Down/Rollback** script.
- Ensure rollback paths do not cause data loss (e.g., dropping a table containing live data in a rollback step without backup).

---

## 🚫 Anti-Patterns to Avoid
- ❌ **Manual Database Tweaks**: Modifying production schemas directly via database consoles instead of code-versioned migrations. This leads to configuration drift and testing failures.
- ❌ **Adding Constraints Directly to Large Tables**: Adding a `FOREIGN KEY` or `CHECK` constraint locks the table while validating existing rows. Add constraints with `NOT VALID` first, then run a separate validate step concurrently.
- ❌ **Dropping Active Tables**: Dropping database assets before confirming the application code has stopped referencing them.
