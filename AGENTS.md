# 🤖 Agentic Skills Manifest & Router

**Suite Version:** `1.2.0`

This file is the primary entry point for AI Coding Assistants (e.g., Gemini, Cursor, Claude Code, Copilot) interacting with this workspace. It acts as a routing table to dynamically discover and apply specialized skills based on the user's request.

---

## 🗺️ Agent Execution Flow

When you receive a user request, you **MUST** follow this routing procedure before writing any code or making edits:

1. **Scan Request:** Analyze the user's prompt, files, and target technologies.
2. **Match Triggers:** Compare the request against the **Skill Router Table** below to check if any active keywords or categories match the task.
3. **Load Skill:** If a match is found, immediately read the corresponding `SKILL.md` file (e.g., [skills/uiux/SKILL.md](skills/uiux/SKILL.md)) using your file-viewing tools.
4. **Apply Playbook:** Follow the loaded skill's rules, prioritizations, checklists, and anti-patterns strictly throughout the task.
5. **Load References:** Read only the `references/*.md` files listed in the loaded skill for the current task — do not load every reference file by default.

---

## 📂 Skill Router Table

| 🛠️ Skill Name | 📦 Version | 📂 Category | 🎯 Primary Goal | ⚡ Active Triggers | 📄 Location |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UI/UX Production Playbook** | `1.0.0` | `UI/UX Design` | High-fidelity UI/UX design audits, layout consistency, and brand identity | `ui`, `ux`, `redesign`, `dashboard`, `website`, `landing page`, `mobile app`, `accessibility`, `design system`, `design tokens`, `improve ui`, `brand`, `color system`, `typography`, `touch ux`, `empty state`, `dark mode`, `spacing`, `theme`, `figma`, `component library`, `usability`, `forms`, `navigation`, `audit report`, `ui review`, `component spec`, `component specification`, `design brief`, `copy sheet` | [skills/uiux/SKILL.md](skills/uiux/SKILL.md) |
| **Frontend Production Playbook** | `1.0.0` | `Frontend` | High-performance React/Next.js development, state management, and modern styling | `frontend`, `react`, `next.js`, `nextjs`, `tailwind`, `css`, `html`, `javascript`, `typescript`, `web app`, `client-side`, `state management`, `component`, `web vitals`, `rsc`, `gen-ui`, `server action` | [skills/frontend/SKILL.md](skills/frontend/SKILL.md) |
| **System Design & Architecture Playbook** | `1.0.0` | `System Design` | Scalable system architecture design, tech stack trade-offs, DB schema, and API contracts | `system design`, `architecture`, `tech stack`, `data flow`, `design doc`, `technical specification`, `scaffold project`, `architecture blueprint`, `api design`, `system-design` | [skills/system-design/SKILL.md](skills/system-design/SKILL.md) |
| **Backend & Fullstack Integration Playbook** | `1.0.0` | `Backend` | Connect APIs to client-side state, map database records to UI/UX components | `backend integration`, `api integration`, `fullstack`, `data fetching`, `api contract`, `state sync`, `backend-frontend`, `frontend-backend`, `api connection`, `client-server` | [skills/backend/SKILL.md](skills/backend/SKILL.md) |
| **Database Production Playbook** | `1.0.0` | `Database` | Design schemas, optimize queries, manage transactions, write zero-downtime migrations | `database schema`, `database optimization`, `query optimization`, `indexing`, `normalization`, `database migration`, `zero-downtime migration`, `transaction isolation`, `sharding`, `replication` | [skills/database/SKILL.md](skills/database/SKILL.md) |
| **PHP & Laravel Production Playbook** | `1.0.0` | `Backend` | Modern PHP development, PSR standards, database optimization, and security practices | `php`, `laravel`, `composer`, `psr`, `eloquent`, `artisan`, `blade`, `symfony` | [skills/php/SKILL.md](skills/php/SKILL.md) |
| **Python & Frameworks Production Playbook** | `1.0.0` | `Backend` | Modern Python backend development, static typing, and FastAPI/Django standards | `python`, `django`, `fastapi`, `flask`, `pip`, `poetry`, `pep8`, `pep 8`, `pydantic` | [skills/python/SKILL.md](skills/python/SKILL.md) |
| **Go & Concurrency Production Playbook** | `1.0.0` | `Backend` | Concurrent, high-performance Go (Golang) backend development and resource safety | `go`, `golang`, `gin`, `fiber`, `gorm`, `goroutine`, `channel` | [skills/go/SKILL.md](skills/go/SKILL.md) |
| **DevOps & CI/CD Playbook** | `1.0.0` | `DevOps` | Optimized containerization, dependency-cached pipelines, and verified rollouts | `devops`, `docker`, `dockerfile`, `github actions`, `ci/cd`, `pipeline`, `deploy`, `aws`, `vercel` | [skills/devops/SKILL.md](skills/devops/SKILL.md) |
| **Rust & Systems Production Playbook** | `1.0.0` | `Backend` | Systems-level, highly performant, and memory-safe Rust backend programming | `rust`, `cargo`, `axum`, `actix`, `serde`, `borrow checker`, `lifetime`, `lifetimes`, `tokio` | [skills/rust/SKILL.md](skills/rust/SKILL.md) |

---

## ⚙️ How to Load a Skill

To load a skill, use your file viewing tool to read the contents of the target `SKILL.md`. For example, to load the **UI/UX Production Playbook**:

- Read [skills/uiux/SKILL.md](skills/uiux/SKILL.md)
- Follow the guidelines in its `SKILL.md` and any associated documents in its `references/` directory (e.g., [uiux-toolkit.md](skills/uiux/references/uiux-toolkit.md)).

---

## 🔌 Multi-Platform Setup

This repository is agent-agnostic. Use the path that matches your tool:

| Platform | Project Setup | Global Setup |
| :--- | :--- | :--- |
| **Cursor** | Copy `AGENTS.md` to repo root; skills auto-discovered via workspace rules, or copy to `.cursor/skills/` | `~/.cursor/skills/` (personal skills) |
| **Claude Code** | Copy `AGENTS.md` as `CLAUDE.md`, or symlink; add skill folders under `.claude/skills/` | `~/.claude/skills/` |
| **Gemini** | Copy `AGENTS.md` + `skills/` into project workspace | `~/.gemini/config/` (Windows: `%USERPROFILE%\.gemini\config\`) |
| **GitHub Copilot** | Add `AGENTS.md` content to `.github/copilot-instructions.md` | User-level Copilot instructions in VS Code settings |

See [docs/SETUP.md](docs/SETUP.md) for step-by-step instructions per platform.

---

## ✅ Validation & Eval

- **Structure check:** `node scripts/validate_skills.js`
- **Routing eval:** `node scripts/run_eval.js`

Both run automatically in CI on every push and pull request.
