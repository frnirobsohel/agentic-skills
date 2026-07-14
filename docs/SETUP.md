# Multi-Platform Setup Guide

Agentic Skills works with any AI coding assistant that can read workspace files. This guide covers the four most common platforms.

---

## Quick Copy (Any Platform)

```bash
# From the repository root
cp AGENTS.md /path/to/your/project/
cp -r skills /path/to/your/project/
```

Your agent should read `AGENTS.md` on startup and load matching `SKILL.md` files when trigger keywords appear in the user's request.

---

## Cursor

Cursor discovers project rules from the workspace root and from `.cursor/`.

### Option A — Workspace Root (Recommended)

```
your-project/
├── AGENTS.md          # Copy from this repo
└── skills/
    ├── uiux/
    └── frontend/
```

Cursor's always-applied workspace rules can reference `AGENTS.md` directly (as in this repository).

### Option B — Cursor Skills Directory

For Cursor-native skill format, copy skill folders to:

| Scope | Path |
| :--- | :--- |
| **Project** | `.cursor/skills/<skill-name>/SKILL.md` |
| **Personal (global)** | `~/.cursor/skills/<skill-name>/SKILL.md` |

On Windows: `C:\Users\<Username>\.cursor\skills\`

Each skill folder needs a `SKILL.md` with `name` and `description` in frontmatter. You can symlink or copy from `skills/uiux/` and `skills/frontend/`.

### Verify

Ask Cursor: *"Redesign this dashboard for accessibility."* — it should load `skills/uiux/SKILL.md` and relevant `references/` files.

---

## Claude Code

Claude Code reads `CLAUDE.md` at the project root and skills from `.claude/skills/`.

### Project Setup

```bash
cp AGENTS.md CLAUDE.md
mkdir -p .claude/skills
cp -r skills/uiux .claude/skills/
cp -r skills/frontend .claude/skills/
```

### Global Setup

```
~/.claude/skills/<skill-name>/SKILL.md
```

On Windows: `C:\Users\<Username>\.claude\skills\`

---

## Gemini

Gemini CLI and Antigravity-style agents use a config directory for global rules.

### Project Setup

Copy `AGENTS.md` and `skills/` into your project root (same as Quick Copy above).

### Global Setup

| OS | Path |
| :--- | :--- |
| **Windows** | `C:\Users\<Username>\.gemini\config\` |
| **macOS / Linux** | `~/.gemini/config/` |

```bash
# Global (macOS/Linux example)
mkdir -p ~/.gemini/config
cp AGENTS.md ~/.gemini/config/
cp -r skills ~/.gemini/config/
```

---

## GitHub Copilot

Copilot reads instructions from `.github/copilot-instructions.md` in the repository.

### Project Setup

```bash
mkdir -p .github
cp AGENTS.md .github/copilot-instructions.md
cp -r skills ./
```

For shorter context, you can paste only the **Agent Execution Flow** and **Skill Router Table** sections from `AGENTS.md` into `copilot-instructions.md`, with relative links to `skills/*/SKILL.md`.

### VS Code User-Level

Open **Settings → GitHub Copilot → Instructions** and paste the router table, or point to a global copy of `AGENTS.md`.

---

## Validation After Setup

Run these from the Agentic Skills repo (or your fork) to confirm integrity before deploying:

```bash
node scripts/validate_skills.js   # structure + references
node scripts/run_eval.js          # trigger routing eval
```

Both should print `All checks passed` with exit code 0.

---

## Troubleshooting

| Problem | Fix |
| :--- | :--- |
| Agent ignores skills | Confirm `AGENTS.md` (or platform equivalent) is at workspace root and indexed |
| Wrong skill loads | Check trigger keywords in `SKILL.md` frontmatter and `AGENTS.md` router table |
| Context too large | Agent should load only task-relevant `references/*.md` files, not all of them |
| Broken links | Re-run `validate_skills.py` — it checks every `references/*.md` path in each `SKILL.md` |
