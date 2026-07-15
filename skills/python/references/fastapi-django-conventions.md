# FastAPI & Django Design Conventions

Follow standard frameworks architecture conventions to ensure high performance and clean patterns.

---

## 1. FastAPI Web Framework Conventions

* **Pydantic Schemas:** Use Pydantic models for request body validation and response serialization. Never return database models directly.
* **Dependency Injection (Depends):** Leverage FastAPI's built-in dependency injection for authentication, database sessions, and third-party API clients.
* **Async/Await vs Sync:**
  * Use `async def` for I/O bound tasks that support async clients (e.g. databases with async drivers, async HTTP clients like `httpx`).
  * Use standard `def` for CPU-bound tasks or when using synchronous blocking libraries (e.g., standard relational ORMs like SQLAlchemy without async, or raw file system access). FastAPI automatically runs standard sync functions in an external thread pool to prevent blocking the event loop.

---

## 2. Django Query Optimization

Django's ORM evaluates queries lazily, which easily causes **N+1 query issues** during list rendering. Optimize database roundtrips using these commands:

### `select_related()` (For Foreign Key relationships - SQL JOIN)
Use `select_related` to eager-load single-valued relationships (one-to-one, one-to-many):
```python
# Bad: Runs N+1 queries
books = Book.objects.all()
for book in books:
    print(book.publisher.name)

# Good: Runs 1 query using an SQL INNER JOIN
books = Book.objects.select_related('publisher').all()
```

### `prefetch_related()` (For Many-to-Many / Reverse ForeignKey)
Use `prefetch_related` to eager-load multi-valued relationships (many-to-many, many-to-one reverse):
```python
# Good: Runs 2 queries and aggregates relations in Python memory
articles = Article.objects.prefetch_related('tags').all()
```

### Deferring Fields
If tables contain large text columns (e.g., body content, HTML), exclude them from the initial list load using `.only()` or `.defer()`:
```python
users = User.objects.only('id', 'username', 'email')
```
