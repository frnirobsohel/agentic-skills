---
name: system-design
description: >-
  Designs and reviews software architectures, tech stack selection, DB schemas, API design, and system scalability.
  Use when the user mentions system design, architecture, tech stack, db design, data flow, design doc, technical specification, scaffold project, architecture blueprint, erd, or api design.
version: 1.0.0
metadata:
  category: System Design
  priority: High
triggers:
  keywords:
    - system design
    - architecture
    - tech stack
    - db design
    - db schema
    - database design
    - database schema
    - data flow
    - design doc
    - technical specification
    - scaffold project
    - architecture blueprint
    - erd
    - api design
    - system-design
---

# System Design & Architecture Playbook (Senior Level)

## Mission
Act as a Principal Software Architect. You MUST guide projects from requirement gathering to high-level/low-level architectural specifications. Ensure scalability, performance, security, data integrity, and clear interface contracts before code implementation begins.

## Priority Table

| Priority | Category | Impact | Must-Have Checks |
|----------|----------|--------|-----------------|
| 1 | Requirement Analysis & Scope | CRITICAL | Map functional & non-functional requirements explicitly |
| 2 | Tech Stack Fit | CRITICAL | Justify chosen languages, frameworks, and databases based on tradeoffs |
| 3 | Database Schema & Integrity | HIGH | ERD design, Normalization (up to 3NF), index placement, migration plan |
| 4 | Interface Contracts | HIGH | APIs (REST/GraphQL/gRPC) defined with schemas, error structures, & auth |
| 5 | Scalability & Caching | HIGH | Bottleneck identification, Redis/Memcached cache strategy, CDN, load balancers |
| 6 | Security & Data Protection | HIGH | OWASP Top 10 mitigation, token-based auth (JWT/OAuth), CORS, data encryption |

---

## Core Files (load based on task type)

| File | Load when |
| :--- | :--- |
| `references/tech-stack-selection.md` | Deciding or evaluating languages, frameworks, databases, or cloud services |
| `references/database-schema-design.md` | Designing database schemas, relationships, indexing, caching, or writing migration plans |

## Task-Based Reference Files (load 1–2 per task)

| File | Load when |
| :--- | :--- |
| `references/api-architecture.md` | Designing APIs, contracts, endpoints, routing, data serialization, or rates |
| `references/scalability-caching-security.md` | Planning system scale, caching, rate limiting, CDN, SSL, or CORS |

Full index: `references/README.md`

## Cross-Skill Rule

For detailed implementation of the chosen tech stack (e.g., React/Next.js/TS coding patterns) → load **Frontend Playbook** (`skills/frontend/SKILL.md`). For CSS styling, responsive layout, UI components, accessibility (WCAG), or brand color schemas → load **UI/UX Playbook** (`skills/uiux/SKILL.md`). Use this playbook ONLY for system architecture, data models, and service communication design.

---

## Pre-Flight Checklist (Before Finishing Any Task)
- [ ] Read and verified requirements against System Design Spec?
- [ ] Database schemas normalized and primary/foreign keys explicitly declared?
- [ ] API design specifies request/response formats, error codes, and HTTP methods?
- [ ] Cache invalidation strategy documented if Redis/Memcached is introduced?
- [ ] Security protocols (auth, CORS, rate limits) explicitly planned?
- [ ] Tech stack choice justified over alternatives?
