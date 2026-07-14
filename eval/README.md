# Eval System

Lightweight routing eval for Agentic Skills — validates that user prompts match the expected skill via keyword triggers.

## Run

```bash
node scripts/run_eval.js
```

## Add a case

Edit `cases.json`:

```json
{
  "id": "uiux-005",
  "prompt": "Your test prompt with trigger keywords",
  "expected_skill": "uiux",
  "expected_keywords_hit": ["dashboard"],
  "expected_references": ["references/layout-spacing.md"]
}
```

| Field | Description |
| :--- | :--- |
| `expected_skill` | `uiux`, `frontend`, or `null` for negative cases |
| `expected_keywords_hit` | Subset of triggers that must appear in the prompt |
| `expected_references` | Reference files that must exist for the matched skill |

## Limitations

This eval tests **keyword routing logic only** — not LLM output quality. For full agent eval, run prompts manually in Cursor/Claude/Gemini and review whether the agent loads the correct `SKILL.md` and references.
