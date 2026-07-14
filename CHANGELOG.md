# Changelog

All notable changes to **Agentic Skills** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- (Nothing yet)

## [1.1.0] - 2026-07-14

### Added
- `CHANGELOG.md` for suite versioning and release notes
- `CONTRIBUTING.md` with formal contribution guidelines
- `docs/SETUP.md` — multi-platform setup guide (Cursor, Claude Code, Gemini, Copilot)
- GitHub Actions CI workflow (`validate-skills.yml`)
- `scripts/validate_skills.js` — structure, frontmatter, and reference integrity checks
- `scripts/run_eval.js` — keyword routing eval for skill trigger matching
- `eval/README.md` — eval system documentation
- `eval/cases.json` — eval test cases for UI/UX and Frontend skills
- `skills/uiux/references/README.md` and `skills/frontend/references/README.md` — reference indexes
- GitHub issue templates (bug report, feature request, new skill request)
- Pull request template

### Changed
- `AGENTS.md` — replaced hardcoded `file:///` paths with portable relative links; added multi-platform setup table and validation section
- `README.md` — expanded setup guide for all major AI coding assistants; linked to CONTRIBUTING, CHANGELOG, and docs
- `skills/uiux/SKILL.md` and `skills/frontend/SKILL.md` — added `version` field to YAML frontmatter

### Fixed
- Broken absolute file paths in `AGENTS.md` that only worked on the author's local machine

## [1.0.0] - 2026-01-01

### Added
- Initial release with `AGENTS.md` skill router
- **UI/UX Production Playbook** (`skills/uiux/`) with 17 reference modules
- **Frontend Production Playbook** (`skills/frontend/`) with 9 reference modules
- Demo: `ecommerce-buttons.html` — 10 e-commerce button styles (pure HTML/CSS)
- Apache 2.0 license

[Unreleased]: https://github.com/frnirobsohel/agentic-skills/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/frnirobsohel/agentic-skills/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/frnirobsohel/agentic-skills/releases/tag/v1.0.0
