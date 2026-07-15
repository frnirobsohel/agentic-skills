# Deployment Security & Service Configuration

Ensure secure service hosting and runtime integrity in production environments.

---

## 1. Environment Variable Injection

- Always inject sensitive credentials dynamically at container runtime.
- Never write credentials inside static docker-compose configurations or Kubernetes manifests.
- Use Kubernetes `Secrets` or AWS Secrets Manager to populate env vars.

---

## 2. Health-Check Endpoints

Configure liveness and readiness probes to monitor application health and automate container restarts.

- **Readiness Probe:** Verifies if the container is ready to accept HTTP traffic (e.g. database connection is established).
- **Liveness Probe:** Verifies if the container is still alive (e.g. not deadlocked).

Example endpoint implementations:
* `/healthz` or `/health/live`: returns `200 OK` if the server is listening.
* `/health/ready`: returns `200 OK` if all backend dependencies (DB, Redis) are online; returns `503 Service Unavailable` otherwise.

---

## 3. Network Isolation & SSL

- Force SSL/TLS globally. Do not allow plain HTTP traffic.
- Map internal ports safely. Expose public web servers on ports `80` / `443`, but bind backend containers locally (`127.0.0.1`) or inside private VPCs.
- Enforce explicit CORS setups to prevent unauthorized origins from reading API cookies.
