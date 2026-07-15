# Indexing & Query Tuning

This module details guidelines for index creation, SQL optimization, and resolving slow queries with execution plans.

---

## ⚡ Core Philosophy
Every database query must scale linearly or better. Tuning indexes and queries prevents CPU spikes, query timeout failures, and application-level bottlenecks.

---

## 🛠️ Best Practices

### 1. Indexing Strategies
- **B-tree Index (Default)**: Use for equality (`=`), range comparisons (`>`, `<`), and sorting (`ORDER BY`).
- **Composite Index (Multi-column)**: Use when querying multiple fields in a single query (e.g. `WHERE active = true AND tenant_id = 5`).
  - **Rule of Index Cardinality**: Place columns with the highest selectivity (most unique values) first in the index array.
  - **Left-prefix Rule**: A composite index on `(a, b)` can optimize queries on `a` or `(a, b)`, but not queries on `b` alone.
- **GIN Index (Generalized Inverted Index)**: Use in PostgreSQL for searching inside arrays, full-text search, and JSONB document structures.
- **Partial/Filtered Index**: Create indexes with `WHERE` clauses (e.g., `CREATE INDEX ON users(email) WHERE active = true`) to minimize index storage footprint.

### 2. Reading Execution Plans
Before optimizing any query, run `EXPLAIN (ANALYZE, BUFFERS)` in PostgreSQL or `EXPLAIN` in MySQL:
- **Avoid Sequential Scans (Seq Scan)** on large tables. Sequential scans read every row on disk. Target Index Scans (Index Scan) or Index Only Scans.
- **Look for high cost and high actual time**: Investigate loops, hash joins, or nested loop iterations that skew performance metrics.
- **Compare Estimated vs. Actual Rows**: A large difference means database statistics are out of date (run `ANALYZE`).

### 3. Query Optimization
- **Select only required columns**: Never use `SELECT *`. Fetch only the fields needed by the application to minimize buffer pools and network overhead.
- **Eager Load Associations**: When using ORMs, prevent `N+1` query issues by eagerly loading tables (e.g., using `select_related`/`prefetch_related` in Django, or `with` in Laravel Eloquent).
- **Use Pagination Safely**:
  - Avoid large offset pagination (`LIMIT 10 OFFSET 100000`) as the database must read and discard 100,000 records.
  - Use **Keyset/Cursor Pagination** instead (`WHERE id > last_seen_id LIMIT 10`).

---

## 🚫 Anti-Patterns to Avoid
- ❌ **Over-Indexing**: Adding indexes on every column. This slows down write operations (INSERT, UPDATE, DELETE) since the database must update indexes on every write.
- ❌ **Querying with Functions on Indexed Columns**: Writing queries like `WHERE UPPER(email) = 'USER@EXAMPLE.COM'` prevents index utilization. Use expression indexes (`CREATE INDEX ON users(UPPER(email))`) or normalize input during writes.
- ❌ **Implicit Type Conversions**: Querying a string column using an integer value (e.g. `WHERE zip_code = 12345` on a `VARCHAR` column). This forces the database to convert every row, skipping index scans.
