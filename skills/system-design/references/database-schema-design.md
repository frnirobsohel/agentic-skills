# Database Schema & Data Integrity Design

A well-designed database schema ensures data integrity, minimizes storage redundancy, and optimizes query performance.

---

## 1. Relational Schema Design Rules

When design SQL schemas (e.g., PostgreSQL), adhere to these standardization principles:

* **Primary Keys:** Every table MUST have a primary key. Use `UUIDv4` for distributed systems (prevents enumeration attacks) or auto-incrementing `BIGINT` for localized datasets.
* **Foreign Keys:** Enforce referential integrity explicitly using foreign keys. Never store relationship IDs as plain strings/integers without constraints.
* **Normalization vs Denormalization:**
  - Normalize schemas up to **Third Normal Form (3NF)** to avoid update anomalies.
  - Denormalize ONLY when query read performance becomes a bottleneck and data update frequency is low (e.g., summary metrics, dashboards).
* **Timestamps:** Every table should contain `created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP` and `updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`.

---

## 2. Indexing Strategy

Incorrect indexing is the leading cause of database slow-downs. Implement indexing proactively using these guidelines:

* **Index Foreign Keys:** Always index columns used in `JOIN` statements (foreign keys). Most SQL databases do NOT index foreign keys by default.
* **Index Query Filters:** Add indexes to fields used in `WHERE`, `ORDER BY`, or `GROUP BY` clauses.
* **Composite Indexes:** When filtering on multiple columns, order the composite index columns from the most selective to the least selective.
* **Avoid Over-indexing:** Write-heavy tables should have fewer indexes, as every index slows down `INSERT`, `UPDATE`, and `DELETE` operations.
* **Query Verification:** Run `EXPLAIN ANALYZE <query>` to ensure the database planner utilizes the indexes and avoids sequential scans (`Seq Scan`).

---

## 3. Safe Database Migrations

For production systems, migrations must not cause downtime:

1. **Write Non-Destructive Migrations:** Never drop or rename columns directly. Use a multi-phase approach:
   - **Phase 1 (Add):** Create a new column with the new schema.
   - **Phase 2 (Dual Write):** Modify code to write to both the old and new columns.
   - **Phase 3 (Backfill):** Run a script to copy old data to the new column.
   - **Phase 4 (Read Shift):** Modify code to read from the new column.
   - **Phase 5 (Cleanup):** Delete the old column and references.
2. **Lock Timeouts:** Always set a lock timeout before running structural migrations on large tables to prevent locking the database:
   ```sql
   SET statement_timeout = '5s';
   ALTER TABLE users ADD COLUMN age INT;
   ```
