# Async Rust & Tokio Concurrency

Build scalable, concurrent Rust systems safely by leveraging Tokio async tasks and synchronization locks.

---

## 1. Spawning Async Tasks

Run CPU-heavy or concurrent network actions by spawning them on Tokio's multi-threaded runtime scheduler:

```rust
use tokio::task;

async fn process_requests(urls: Vec<String>) {
    let mut handles = vec![];
    for url in urls {
        // Spawn execution thread block
        let handle = task::spawn(async move {
            fetch_url(&url).await
        });
        handles.push(handle);
    }
    
    // Join all spawned threads
    for h in handles {
        let _ = h.await;
    }
}
```

---

## 2. Sync Locks: Tokio Mutex vs Std Mutex

When sharing mutable states across threads, use the correct Mutex lock types:

- **Std Mutex (`std::sync::Mutex`):** Use this for standard CPU operations where locks are held for short scopes and do not span across `.await` points.
- **Tokio Mutex (`tokio::sync::Mutex`):** Use this ONLY if you need to hold a lock across an `.await` boundary. Holding a standard lock across `.await` will cause compilation errors because standard guards do not implement `Send`.

```rust
// Correct usage of Tokio Mutex holding lock across an await call
use std::sync::Arc;
use tokio::sync::Mutex;

struct AppState {
    db: Mutex<DbConnection>,
}

async fn query_data(state: Arc<AppState>) {
    let mut guard = state.db.lock().await;
    guard.execute_query().await; // Safe: lock spans across await boundary
}
```

---

## 3. Communication Channels & Select

Rely on message passing channels to route data between concurrent tasks safely:

- **mpsc:** Multi-producer, single-consumer.
- **oneshot:** Single-producer, single-consumer for sending a single value.
- **select!:** Monitor multiple async events simultaneously:

```rust
use tokio::time::{sleep, Duration};

tokio::select! {
    res = fetch_api() => {
        println!("API response: {:?}", res);
    }
    _ = sleep(Duration::from_secs(2)) => {
        println!("Request timed out!");
    }
}
```
