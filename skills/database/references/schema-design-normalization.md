# Database Schema Design & Normalization

This module covers primary principles for designing relational database schemas, picking primary/foreign keys, and normalizing data structures.

---

## ⚡ Core Philosophy
A database schema is the foundation of data integrity. Bad schema design leads to data duplication, update anomalies, and slow query performance that cannot be fixed by indexing alone.

---

## 🛠️ Best Practices

### 1. Primary Key Selection (UUID vs. Serial BigInt)
- **Use UUIDv4/UUIDv7** for distributed systems, public-facing identifiers, or when records are inserted asynchronously. It prevents ID enumeration attacks (e.g. `api/users/1`).
- **Use BigInt Identity/Serial** for high-write tables, internal join tables, or when indexing size and insert throughput are critical. BigInt takes 8 bytes, while UUID takes 16 bytes.
- **Ensure UUID columns are indexed** and stored as `UUID` binary data type, not plain strings (`VARCHAR(36)`), to save index space.

### 2. Normalization Strategy
Always target **Third Normal Form (3NF)** for transactional databases:
- **First Normal Form (1NF)**: Eliminate duplicate columns. Ensure each field has atomic, single-valued attributes (no comma-separated strings).
- **Second Normal Form (2NF)**: Meet 1NF. Ensure all non-key columns depend entirely on the primary key (no partial dependencies on composite keys).
- **Third Normal Form (3NF)**: Meet 2NF. Ensure non-key columns do not depend on other non-key columns (no transitive dependencies).

### 3. Pragmatic Denormalization
- Only denormalize (e.g. storing aggregates, caching statistics, duplicate user profile properties) when query join overhead is a proven performance bottleneck.
- Protect denormalized fields with database triggers, transactions, or application-level events to prevent out-of-sync states.

### 4. Foreign Key Constraints
- Always declare explicit `FOREIGN KEY` constraints.
- Define cascades explicitly (`ON DELETE CASCADE`, `ON DELETE SET NULL`, `ON DELETE RESTRICT`) to prevent dangling child records.
- **Crucial Rule**: Every foreign key column must be indexed to prevent sequential scans during join queries.

---

## 🚫 Anti-Patterns to Avoid
- ❌ **The "JSON-everything" Schema**: Storing core business entities inside dynamic JSON/JSONB fields instead of structured tables. This defeats data integrity, type safety, and prevents index utilization.
- ❌ **Missing Unique Constraints**: Relying on application code alone to check uniqueness. Race conditions will eventually cause duplicate records in the database.
- ❌ **Hard Deleting Auditable Data**: Deleting critical transactional records directly. Use `deleted_at` soft-deletes or audit log history tables instead.
