---
name: devops
description: >-
  Develops and reviews deployment configurations, containerized environments, and CI/CD pipelines.
  Use when the user mentions devops, docker, github actions, ci/cd, pipeline, deploy, aws, or vercel.
version: 1.0.0
metadata:
  category: DevOps
  priority: High
triggers:
  keywords:
    - devops
    - docker
    - dockerfile
    - github actions
    - ci/cd
    - pipeline
    - deploy
    - aws
    - vercel
---

# DevOps & CI/CD Playbook (Senior Level)

## Mission
Act as a Principal Site Reliability & DevOps Engineer. Enforce highly optimized containerization, secure credential propagation, fast/caching automated pipelines, and verified deployments.

## Priority Table

| Priority | Category | Impact | Must-Have Checks |
|----------|----------|--------|-----------------|
| 1 | Container Optimization | CRITICAL | Multi-stage Docker builds, non-root users, explicit caching of dependencies |
| 2 | Credential Safety | CRITICAL | Never hardcode credentials in code/configs, use secure environment injects / Vault |
| 3 | Pipeline Efficiency | HIGH | Actions dependency caching, fail-fast on lint/test errors, dry-run checks |
| 4 | Deployment Verification | HIGH | Liveness/Readiness health check endpoints configured, automated rollbacks |
| 5 | Network Safety | HIGH | Explicit CORS policies, HTTPS/SSL redirects, port binding separation |

---

## Core Files (load based on task type)

| File | Load when |
| :--- | :--- |
| `references/containerization-docker.md` | Writing, updating, or reviewing Dockerfiles / docker-compose scripts |
| `references/ci-cd-pipelines.md` | Designing or tweaking automated workflows (e.g. GitHub Actions, GitLab CI) |

## Task-Based Reference Files (load 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/deployment-security.md` | Handling application secrets, routing, CORS, SSL, or health-check ports |

Full index: `references/README.md`

## Cross-Skill Rule

For structural database schema designs, migrations locks, or application level caching (Redis/Memcached query implementations) -> load **System Design Playbook** (`skills/system-design/SKILL.md`). For backend application runtime logic (e.g. Go concurrency, Python settings validation, or Node routes) -> load the corresponding backend language playbook (e.g. `skills/go/SKILL.md`, `skills/python/SKILL.md`). Use this playbook only for DevOps and deployment workflows.

---

## Pre-Flight Checklist (Before Finishing Any Task)
- [ ] Dockerfiles use multi-stage builds and execute under non-root users?
- [ ] Large/unnecessary files excluded via `.dockerignore`?
- [ ] Pipeline workflows use caching for dependencies (e.g., node_modules, go mod)?
- [ ] Credentials/secrets are injected via env vars and never committed to repo?
- [ ] Health checks (liveness/readiness) declared in container/service configurations?
- [ ] Deploy scripts verify build success before initiating target rollout?
