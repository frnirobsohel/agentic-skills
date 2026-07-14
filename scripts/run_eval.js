#!/usr/bin/env node
/** Run keyword-routing eval cases against Agentic Skills. */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const CASES_FILE = path.join(ROOT, "eval", "cases.json");

function loadTriggers() {
  const triggers = {};

  if (!fs.existsSync(SKILLS_DIR)) return triggers;

  for (const name of fs.readdirSync(SKILLS_DIR)) {
    const skillDir = path.join(SKILLS_DIR, name);
    if (!fs.statSync(skillDir).isDirectory()) continue;

    const skillMd = path.join(skillDir, "SKILL.md");
    if (!fs.existsSync(skillMd)) continue;

    const keywords = new Set();
    let inKeywords = false;
    for (const line of fs.readFileSync(skillMd, "utf-8").split("\n")) {
      if (line.trim() === "keywords:") {
        inKeywords = true;
        continue;
      }
      if (inKeywords) {
        if (line.trim().startsWith("- ")) {
          keywords.add(line.trim().slice(2).trim().toLowerCase());
        } else if (line && !line.startsWith(" ")) {
          break;
        }
      }
    }
    triggers[name] = keywords;
  }

  const agentsPath = path.join(ROOT, "AGENTS.md");
  if (fs.existsSync(agentsPath)) {
    for (const line of fs.readFileSync(agentsPath, "utf-8").split("\n")) {
      const match = line.match(/skills\/(\w+)\/SKILL\.md/);
      if (!match) continue;
      const skill = match[1];
      const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
      for (const cell of cells) {
        if (cell.startsWith("`") && cell.includes(",")) {
          const kws = cell.replace(/`/g, "").split(",").map((k) => k.trim().toLowerCase());
          if (!triggers[skill]) triggers[skill] = new Set();
          kws.forEach((k) => triggers[skill].add(k));
        }
      }
    }
  }

  return triggers;
}

function matchSkill(prompt, triggers) {
  const lower = prompt.toLowerCase();
  let bestSkill = null;
  let bestScore = 0;

  for (const [skill, keywords] of Object.entries(triggers)) {
    let score = 0;
    for (const kw of keywords) {
      const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let regexStr = `(?<!\\w)${escaped}(?!\\w)`;
      if (/\w$/.test(kw)) {
        regexStr = `(?<!\\w)${escaped}s?(?!\\w)`;
      }
      const regex = new RegExp(regexStr, 'i');
      if (regex.test(lower)) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestSkill = skill;
    }
  }

  return bestScore > 0 ? bestSkill : null;
}

function keywordsHit(prompt, skill, triggers) {
  const lower = prompt.toLowerCase();
  return [...(triggers[skill] || [])].filter((kw) => lower.includes(kw)).sort();
}

function main() {
  if (!fs.existsSync(CASES_FILE)) {
    console.error(`Missing eval cases: ${CASES_FILE}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(CASES_FILE, "utf-8"));
  const cases = data.cases || [];
  const triggers = loadTriggers();
  const errors = [];
  let passed = 0;

  for (const testCase of cases) {
    const { id, prompt, expected_skill: expected } = testCase;
    const matched = matchSkill(prompt, triggers);

    if (matched !== expected) {
      errors.push(`${id}: expected skill '${expected}', got '${matched}' for prompt: ${JSON.stringify(prompt)}`);
      continue;
    }

    if (expected) {
      const hit = new Set(keywordsHit(prompt, expected, triggers));
      const expectedHit = new Set((testCase.expected_keywords_hit || []).map((k) => k.toLowerCase()));
      if (expectedHit.size) {
        for (const kw of expectedHit) {
          if (!hit.has(kw)) {
            errors.push(`${id}: expected keyword '${kw}' not found in prompt match`);
            break;
          }
        }
        if (errors.at(-1)?.startsWith(id)) continue;
      }

      for (const ref of testCase.expected_references || []) {
        const refPath = path.join(SKILLS_DIR, expected, ref);
        if (!fs.existsSync(refPath)) {
          errors.push(`${id}: expected reference missing: ${ref}`);
        }
      }
      if (errors.some((e) => e.startsWith(id))) continue;
    }

    passed++;
  }

  const total = cases.length;
  if (errors.length) {
    console.error(`Eval FAILED: ${passed}/${total} passed\n`);
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  console.log(`All eval checks passed (${passed}/${total} cases).`);
}

main();
