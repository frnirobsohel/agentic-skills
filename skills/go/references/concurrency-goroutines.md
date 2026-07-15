# Go Concurrency Patterns & Primitives

Build highly concurrent, thread-safe Go systems by leveraging goroutines, channels, and synchronization locks.

---

## 1. Coordinating Goroutines with WaitGroup

Always ensure spawned goroutines have completed execution before exiting main threads:

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	urls := []string{"url1", "url2", "url3"}

	for _, url := range urls {
		wg.Add(1)
		// Pass variables explicitly into goroutines to avoid closure scope issues
		go func(u string) {
			defer wg.Done()
			fetchURL(u)
		}(url)
	}

	wg.Wait() // Blocks until wg.Done() is called 3 times
}
```

---

## 2. Shared Memory State Protection (Mutex)

When multiple goroutines read/write to the same memory segment (e.g. maps), always protect that state using a Mutex to avoid data races:

```go
type SafeCounter struct {
	mu    sync.Mutex
	value map[string]int
}

func (c *SafeCounter) Increment(key string) {
	c.mu.Lock()
	defer c.mu.Unlock() // Ensure unlock always runs
	c.value[key]++
}
```

---

## 3. Communication Channels & Select

Share memory by communicating, rather than communicating by sharing memory:

- **Unbuffered Channels:** Block the sender until the receiver reads (synchronous).
- **Buffered Channels:** Have a capacity. Sender only blocks when the buffer is full.
- **Select Statement:** Allows a goroutine to wait on multiple channel operations:

```go
select {
case msg1 := <-chan1:
    fmt.Println("Received:", msg1)
case chan2 <- msg2:
    fmt.Println("Sent:", msg2)
case <-time.After(2 * time.Second):
    fmt.Println("Timeout reached")
}
```

- **Avoid Goroutine Leaks:** Ensure channels are read from, or use `context.WithTimeout` to abort hanging goroutines.

---

## 4. Race Condition Check

Always verify concurrency safety before merging code. Run unit tests with the race detector enabled:
```bash
go test -race ./...
```
