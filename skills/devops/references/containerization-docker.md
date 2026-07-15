# Docker Containerization Guidelines

Build lightweight, highly optimized, and secure Docker images by adhering to industry standards.

---

## 1. Multi-Stage Builds

Avoid publishing large dev dependencies or compilers in production container images. Always separate build steps:

```dockerfile
# Stage 1: Build Environment
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Stage 2: Production Execution Environment
FROM alpine:3.18
WORKDIR /app
# Copy ONLY the compiled binary from builder
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```

---

## 2. Non-Root Execution Security

Running containers as `root` is a major security risk. If a container is compromised, the attacker has root privileges on the host. Always create a user:

```dockerfile
# Create a non-privileged user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set files ownership
USER appuser
```

---

## 3. Optimizing Layer Cache

Docker caches layers based on file modifications. Order your commands to optimize rebuild times:

- **Bad (Copies all files first, breaks package caches on any code edits):**
  ```dockerfile
  COPY . .
  RUN npm install
  ```
- **Good (Only reinstalls dependencies when package.json changes):**
  ```dockerfile
  COPY package.json package-lock.json ./
  RUN npm ci
  COPY . .
  ```

---

## 4. Docker Ignore Rules (`.dockerignore`)

Exclude heavy local directories (like `node_modules`, `.git`, `.venv`) from the Docker build context. This speeds up build compilation:

Create a `.dockerignore` file in the repository root:
```text
node_modules
.git
.gitignore
.github
*.log
.venv
```
