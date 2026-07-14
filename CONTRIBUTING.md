# Contributing to Agentic Skills

Thank you for helping build production-grade playbooks for AI coding assistants. This guide covers how to contribute effectively.

## Before You Start

1. Read [AGENTS.md](AGENTS.md) to understand the routing model.
2. Read [docs/PHILOSOPHY.md](docs/PHILOSOPHY.md) to understand our vision, quality standards, and core tenets.
3. Read [docs/SETUP.md](docs/SETUP.md) if you are testing skills locally.
4. Check [open issues](https://github.com/frnirobsohel/agentic-skills/issues) to avoid duplicate work.

## Ways to Contribute

| Type | Examples |
| :--- | :--- |
| **Improve existing skills** | Fix outdated guidance, add checklists, expand reference modules |
| **Add reference modules** | New `references/*.md` files under an existing skill |
| **Add eval cases** | New prompts in `eval/cases.json` with expected routing |
| **Fix infrastructure** | CI, validation scripts, docs, templates |
| **Propose new skills** | Backend, DevOps, Security, Testing — open an issue first |

## Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/agentic-skills.git
cd agentic-skills

# 2. Create a branch
git checkout -b fix/uiux-accessibility-checklist

# 3. Make changes, then validate locally
node scripts/validate_skills.js
node scripts/run_eval.js

# 4. Commit and push
git add .
git commit -m "docs(uiux): expand accessibility checklist in process-audits"
git push origin fix/uiux-accessibility-checklist

# 5. Open a Pull Request
```

CI must pass before a PR can be merged.

## Skill Authoring Standards

### Required Structure

```
skills/<skill-name>/
├── SKILL.md              # Required — router + playbook
├── references/           # Recommended — modular deep-dive docs
│   ├── README.md         # Index of all reference files
│   └── *.md
├── templates/            # Recommended — skill-specific starter/response templates
└── resources/            # Optional — supporting assets, scripts, or datasets
```

### SKILL.md Frontmatter

Every `SKILL.md` must start with YAML frontmatter:

```yaml
---
name: my-skill-name          # lowercase, hyphens, max 64 chars
description: >               # third person; WHAT + WHEN; include trigger terms
  Audits and improves X. Use when the user mentions Y or Z.
version: 1.0.0
metadata:
  category: Category Name
  priority: High
triggers:
  keywords:
    - keyword-one
    - keyword-two
---
```

### Content Guidelines

- **Be concise** — agents already know general concepts; add only non-obvious, high-signal rules.
- **Modular references** — keep `SKILL.md` under ~100 lines; move deep content to `references/`.
- **Actionable checklists** — prefer tables and checkboxes over prose.
- **Portable paths** — use relative links (`references/foo.md`), never absolute `file:///` URLs.
- **No time-sensitive hacks** — avoid "before August 2025" style notes; use versioned sections instead.

### Updating the Router

When adding or changing a skill:

1. Add the skill folder under `skills/`.
2. Register it in [AGENTS.md](AGENTS.md) Skill Router Table (version, triggers, location).
3. Add eval cases in [eval/cases.json](eval/cases.json).
4. Update [CHANGELOG.md](CHANGELOG.md) under `[Unreleased]`.
5. Run `node scripts/validate_skills.js` and `node scripts/run_eval.js`.

## Pull Request Checklist

- [ ] `node scripts/validate_skills.js` passes
- [ ] `node scripts/run_eval.js` passes
- [ ] `CHANGELOG.md` updated (if user-facing)
- [ ] `AGENTS.md` router table updated (if skill triggers changed)
- [ ] No secrets, API keys, or personal absolute paths committed

## Code of Conduct

Be respectful, constructive, and focused on improving agent outcomes for everyone. Harassment and low-quality spam PRs will be closed.

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).
