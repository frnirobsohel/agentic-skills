#!/usr/bin/env node
/** Validate Agentic Skills repository structure, frontmatter, and references. */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const REQUIRED_KEYS = ["name", "description", "version", "metadata", "triggers"];
const REF_PATTERN = /references\/[\w.-]+\.md/g;
const SKILL_LINK_PATTERN = /skills\/[\w.-]+\/SKILL\.md/g;

function parseFrontmatter(content) {
  if (!content.startsWith("---")) return null;
  const end = content.indexOf("\n---", 3);
  if (end === -1) return null;
  const block = content.slice(3, end).trim();
  const data = {};
  let currentKey = null;
  let listMode = false;

  for (const line of block.split("\n")) {
    if (line.startsWith("  - ") && listMode && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(line.slice(4).trim());
      continue;
    }
    listMode = false;
    if (!line.includes(":")) continue;
    const colon = line.indexOf(":");
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (value === "") {
      currentKey = key;
      data[key] = [];
      listMode = true;
    } else {
      currentKey = key;
      data[key] = value.replace(/^["']|["']$/g, "");
      listMode = false;
    }
  }
  return data;
}

function validateSkill(skillDir, errors) {
  const skillMd = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillMd)) {
    errors.push(`Missing SKILL.md in ${path.relative(ROOT, skillDir)}`);
    return;
  }

  const content = fs.readFileSync(skillMd, "utf-8");
  const fm = parseFrontmatter(content);
  if (!fm) {
    errors.push(`${path.relative(ROOT, skillMd)}: missing or invalid YAML frontmatter`);
    return;
  }

  for (const key of REQUIRED_KEYS) {
    if (!(key in fm)) {
      errors.push(`${path.relative(ROOT, skillMd)}: frontmatter missing key '${key}'`);
    }
  }

  if (fm.name && !/^[a-z0-9-]{1,64}$/.test(fm.name)) {
    errors.push(`${path.relative(ROOT, skillMd)}: invalid name '${fm.name}'`);
  }

  const refs = content.match(REF_PATTERN) || [];
  for (const ref of refs) {
    const refPath = path.join(skillDir, ref);
    if (!fs.existsSync(refPath)) {
      errors.push(`${path.relative(ROOT, skillMd)}: referenced file not found: ${ref}`);
    }
  }

  const refsDir = path.join(skillDir, "references");
  if (fs.existsSync(refsDir) && !fs.existsSync(path.join(refsDir, "README.md"))) {
    errors.push(`${path.relative(ROOT, refsDir)}: missing README.md index`);
  }
}

function validateAgentsMd(errors) {
  const agentsPath = path.join(ROOT, "AGENTS.md");
  if (!fs.existsSync(agentsPath)) {
    errors.push("Missing AGENTS.md at repository root");
    return;
  }

  const content = fs.readFileSync(agentsPath, "utf-8");
  if (content.includes("file:///")) {
    errors.push("AGENTS.md contains absolute file:/// paths — use relative links");
  }

  const links = content.match(SKILL_LINK_PATTERN) || [];
  for (const link of links) {
    if (!fs.existsSync(path.join(ROOT, link))) {
      errors.push(`AGENTS.md: broken skill link: ${link}`);
    }
  }

  if (!content.includes("Suite Version:")) {
    errors.push("AGENTS.md: missing Suite Version declaration");
  }
}

function main() {
  const errors = [];

  if (!fs.existsSync(SKILLS_DIR)) {
    errors.push("Missing skills/ directory");
  } else {
    const skillDirs = fs.readdirSync(SKILLS_DIR)
      .map((name) => path.join(SKILLS_DIR, name))
      .filter((p) => fs.statSync(p).isDirectory());

    if (skillDirs.length === 0) errors.push("No skill folders found under skills/");
    for (const dir of skillDirs) validateSkill(dir, errors);
  }

  validateAgentsMd(errors);

  const changelog = path.join(ROOT, "CHANGELOG.md");
  if (!fs.existsSync(changelog)) {
    errors.push("Missing CHANGELOG.md");
  } else if (!fs.readFileSync(changelog, "utf-8").includes("## [Unreleased]")) {
    errors.push("CHANGELOG.md: missing [Unreleased] section");
  }

  for (const required of ["CONTRIBUTING.md", "docs/SETUP.md", "eval/cases.json"]) {
    if (!fs.existsSync(path.join(ROOT, required))) {
      errors.push(`Missing required file: ${required}`);
    }
  }

  if (errors.length) {
    console.error("Validation FAILED:\n");
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  const skillCount = fs.existsSync(SKILLS_DIR)
    ? fs.readdirSync(SKILLS_DIR).filter((n) => fs.statSync(path.join(SKILLS_DIR, n)).isDirectory()).length
    : 0;
  console.log(`All checks passed (${skillCount} skills validated).`);
}

main();
