# ACID Transactions & Concurrency

This module covers transaction lifecycles, locks, database isolation levels, and concurrency conflicts.

---

## ⚡ Core Philosophy
Concurrent transactions can corrupt data if isolation borders are not declared. Designing precise transaction boundaries and understanding lock types prevents deadlocks and data inconsistencies.

---

## 🛠️ Best Practices

### 1. Enforcing ACID
- **Atomicity**: Ensure all queries in a block complete, or all are rolled back.
- **Consistency**: Keep database states valid under all declared constraints.
- **Isolation**: Prevent concurrent transactions from seeing partial writes.
- **Durability**: Guarantee committed writes survive system failures.

### 2. Picking the Right Isolation Level
Understand database behaviors across standard isolation tiers:
- **Read Committed (Default)**: Prevents reading uncommitted dirty data. However, values can change if read twice in a single transaction (Non-repeatable reads).
- **Repeatable Read**: Guarantees values read inside a transaction remain identical. Prevents non-repeatable reads, but phantom reads (new matching rows added by another transaction) can occur.
- **Serializable (Highest)**: Simulates serial transaction execution. Fully isolates transactions, but fails with serialization conflicts if dependencies collide. The application must catch these errors and retry the transaction.

### 3. Keeping Transactions Short
- **Minimize Lock holding times**: Never execute slow operations (API calls, file uploads, CPU-heavy tasks) inside database transaction blocks. Keep the transaction limited strictly to database reads and writes.
- **Acquire locks late**: Run read-only operations outside the transaction, start the write block, write, and commit immediately.

### 4. Deadlock Prevention
Deadlocks occur when transaction A locks resource 1 and waits for resource 2, while transaction B locks resource 2 and waits for resource 1.
- **Consistent Lock Ordering**: Always access and lock resources in the exact same chronological order throughout your application code.
- **Avoid SELECT FOR UPDATE unnecessarily**: Locking rows for updates prevents concurrency. Only use it when preventing race conditions on critical values (like bank balances).

---

## 🚫 Anti-Patterns to Avoid
- ❌ **Ignoring Transaction Retry Logic**: Implementing Serializable isolation without writing auto-retry hooks in application code. Conflict aborts will eventually crash requests.
- ❌ **Nested Transactions without Savepoints**: Declaring nested transaction blocks in ORMs which might hide silent rollbacks, causing partial updates.
- ❌ **Over-locking Tables**: Performing operations that lock entire tables (e.g. `LOCK TABLE users IN EXCLUSIVE MODE`) instead of row-level locks, halting application traffic.
