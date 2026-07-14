# 💡 Agentic Skills — Vision, Core Principles & Philosophy

> **Better Research → Better Skills → Better AI Reasoning → Better Results**

---

## 🌟 Vision

**Agentic Skills** aims to build the highest-quality open-source skill library for AI agents — one that enables them to perform tasks at the level of an experienced senior professional.

Every skill in this library should be practical, production-ready, continuously improved, and optimized for real-world use. The project welcomes contributions from both **human contributors** and **AI contributors**.

---

## ⚡ Core Principles

### 1. Continuous Improvement
No skill is ever "finished." Every skill should evolve through:
- Real-world usage and community feedback
- Production experience
- New industry standards and best practices
- Better prompting and reasoning techniques
- Official documentation, research papers, and trusted technical resources

*The repository should get smarter every day.*

### 2. Research Before Writing
Every skill must be built on solid research, not assumptions. Before writing, consult:
- Official documentation
- Existing GitHub skill repositories and open-source AI agent projects
- Community best practices and industry standards
- Experienced developer workflows
- Performance and security recommendations
- Production-ready architectures

**Always verify before writing.**

### 3. Competitor Research
Before creating or improving a skill, study what similar projects do. Evaluate:
- Strengths and weaknesses relative to your approach
- Writing style, prompt quality, and documentation clarity
- Folder organization and file naming conventions
- Examples, workflows, and reasoning patterns
- Token efficiency and maintainability
- Missing features or gaps

*The goal isn't to copy — it's to understand what works and build something better.*

### 4. Senior-Level Expertise
Every skill should reflect the thinking process of a senior expert, helping an AI to:
- Think before acting and ask better questions
- Follow structured reasoning
- Detect edge cases and avoid common mistakes
- Apply production-ready solutions
- Produce professional-quality output

*The objective is for the AI to behave like an experienced specialist — not just generate text.*

### 5. Clear Repository Structure
The repository must remain structured, scalable, and predictable for both human contributors and AI agents. Every top-level file and folder serves a permanent, specific purpose in the AI agent lifecycle:

```
agentic-skills/
├── LICENSE                # MIT open-source license
├── README.md              # Project overview, demo showcase, and quick setup guide
├── CHANGELOG.md           # Version history and release notes (`[Unreleased]` required)
├── CONTRIBUTING.md        # Contribution guidelines and skill authoring standards
├── AGENTS.md              # Primary AI Agent Router & Manifest (entrypoint for agents)
├── ecommerce-buttons.html # Live demo: 10 pure HTML/CSS e-commerce button styles
├── preview.png            # Visual preview screenshot for README demo
├── .github/
│   ├── workflows/         # CI validation workflows (validate-skills.yml)
│   └── ISSUE_TEMPLATE/    # Bug report, feature request, and new skill proposal templates
├── docs/
│   ├── PHILOSOPHY.md      # Core design principles, Vision, and contributor philosophy
│   └── SETUP.md           # Multi-platform agent setup (Cursor, Claude, Gemini, Copilot)
├── eval/
│   └── cases.json         # Keyword routing evaluation test suite (12+ cases)
├── scripts/
│   ├── validate_skills.js # Automated structure, frontmatter, and link integrity validation
│   └── run_eval.js        # Automated keyword routing evaluation runner
└── skills/
    ├── frontend/
    │   ├── SKILL.md
    │   ├── references/
    │   └── templates/     <-- Frontend starter templates (React, Next.js, Vitest)
    └── uiux/
        ├── SKILL.md
        ├── references/
        └── templates/     <-- UI/UX audit & specification templates
```

#### 📌 Permanent Top-Level Components & Their Roles:
- **Core Documentation (`README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`):** Ensures clear communication, versioning transparency, and standardized contributor onboarding.
- **Agent Router (`AGENTS.md`):** The master routing table that every AI tool reads first to discover and trigger domain skills dynamically.
- **Demo & Verification (`ecommerce-buttons.html`, `preview.png`):** Tangible proof of the repository's output quality (pure HTML/CSS production-grade generation).
- **Setup & Philosophy (`docs/`):** Contains `PHILOSOPHY.md` (the core vision and rules) and `SETUP.md` (step-by-step guides across all IDEs).
- **Quality & Evaluation (`scripts/`, `eval/`, `.github/`):** Automated CI checks (`validate_skills.js` and `run_eval.js`) that run on every push and pull request to guarantee zero broken links or invalid triggers.
- **Domain Skills (`skills/`):** The modular skill containers (`uiux/`, `frontend/`, etc.). To align with AI/LLM agent architecture and prompt execution, **every skill maintains separate, modular subdirectories (`templates/` and `resources/`) within its own folder (`skills/<skill_name>/`)**.

Each skill folder should contain predictable, self-contained modules:
- `SKILL.md` (Main router & high-signal rules)
- `references/` (Deep-dive docs, architecture, checklists, design tokens, etc.)
- `templates/` (Skill-specific starter boilerplates, code scaffolds, and markdown structures)
- `resources/` (Supporting scripts, assets, or reference datasets specific to the skill)

#### 🏆 Why Separate Per-Skill `templates/` Folders are Superior for AI Agents:
1. **Locality of Reference:** When an AI agent triggers a skill (`skills/<skill_name>/SKILL.md`), relative references like `./templates/component.tsx.template` resolve instantly within the local skill context without searching across global repository structures.
2. **Token Efficiency & Anti-Hallucination:** Loading only the active skill's templates prevents context window bloat, reduces token overhead, and eliminates hallucination caused by unrelated global templates.
3. **Modularity & Portability:** Self-contained skill folders (`skills/<skill_name>/`) can be copied or shared cleanly across different workspaces, AI IDEs, or repositories without breaking external template dependencies.
4. **Naming Collision Prevention:** Prevents conflicting filenames (e.g., `page.tsx.template` or `config.template`) across different technical domains like Next.js, React Native, or FastAPI.

> **Note on Global Templates:** A repository-level `/templates` or `/.github/ISSUE_TEMPLATE` folder should **only** exist for project-wide repository maintenance (e.g., Pull Request templates, Issue templates, or standard contributor configs).

### 6. Token Efficiency
A great skill isn't the longest — it's the most effective. It delivers:
- Strong reasoning and reliable results
- Minimal token usage and no repetition
- Clear, direct instructions

*Every sentence should earn its place. Avoid unnecessary verbosity.*

### 7. Expert Best Practices
Every skill must explicitly document expert recommendations, including:
- Best practices & common mistakes
- Things to avoid (anti-patterns)
- Production tips & edge cases
- Security and performance considerations
- Validation checklists

*The AI should learn not just what to do, but also what not to do.*

### 8. AI-Friendly Design
Skills should be easy for AI agents to parse and apply. Use:
- Clear headings and predictable formatting
- Structured, consistently named sections
- Reusable templates
- Explicit instructions with minimal ambiguity

*Every skill should be optimized for machine understanding as well as human readability.*

### 9. Quality Over Quantity
One excellent skill beats ten average ones. Before merging, ask:
- Is it accurate and well-researched?
- Is it production-ready?
- Is it easy for AI to follow?
- Would a senior professional approve it?

*If the answer to any of these is no, improve it before merging.*

### 10. Community-Driven Evolution
This project grows through collaboration. Both human and AI contributors are encouraged to:
- Improve existing skills and fix mistakes
- Refine prompts and add examples
- Optimize token usage
- Update best practices to match the latest technologies

---

## 🎯 Ultimate Mission

Build the world's best open-source skill library — one that enables AI agents to perform professional work at the level of experienced experts.
