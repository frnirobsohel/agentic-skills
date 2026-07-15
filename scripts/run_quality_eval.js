#!/usr/bin/env node
/** Automated Quality Evaluation Runner (LLM-as-a-judge comparison). */

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.resolve(__dirname, "..");
const CASES_FILE = path.join(ROOT, "eval", "cases.json");
const REPORT_FILE = path.join(ROOT, "eval_quality_report.md");

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash"; // cost-effective, fast, and highly capable for structuring evaluation

// Helper to make API calls using built-in https module
function callGemini(prompt, systemInstruction = "") {
  return new Promise((resolve, reject) => {
    if (!API_KEY) {
      return reject(new Error("GEMINI_API_KEY environment variable is missing."));
    }

    const payload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.1
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    const data = JSON.stringify(payload);

    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data)
        }
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            return reject(new Error(`API returned status ${res.statusCode}: ${body}`));
          }
          try {
            const parsed = JSON.parse(body);
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) {
              return reject(new Error("No text found in API response."));
            }
            resolve(text);
          } catch (err) {
            reject(err);
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(data);
    req.end();
  });
}

function loadSkillContent(skillDir, refs) {
  let content = "";
  const skillMd = path.join(skillDir, "SKILL.md");
  if (fs.existsSync(skillMd)) {
    content += `=== SKILL GUIDELINES ===\n${fs.readFileSync(skillMd, "utf-8")}\n\n`;
  }
  for (const ref of refs) {
    const refPath = path.join(skillDir, ref);
    if (fs.existsSync(refPath)) {
      content += `=== REFERENCE: ${ref} ===\n${fs.readFileSync(refPath, "utf-8")}\n\n`;
    }
  }
  return content;
}

async function runCase(testCase) {
  console.log(`Running quality evaluation for case: ${testCase.id} - "${testCase.prompt}"...`);

  // 1. Generate Baseline Output
  console.log("  -> Generating Baseline response...");
  const baselineSystem = "You are a professional software engineer/designer. Respond to the prompt directly with clean production-ready code or design.";
  const baselineOutput = await callGemini(testCase.prompt, baselineSystem);

  // 2. Load Playbook Context
  const skillDir = path.join(ROOT, "skills", testCase.expected_skill);
  const playbookContext = loadSkillContent(skillDir, testCase.expected_references || []);

  // 3. Generate Playbook-guided Output
  console.log("  -> Generating Playbook-guided response...");
  const playbookSystem = `You are a professional software engineer/designer. You MUST follow these design and architecture guidelines strictly in your output:\n\n${playbookContext}`;
  const playbookOutput = await callGemini(testCase.prompt, playbookSystem);

  // 4. Judge Comparison
  console.log("  -> Running LLM-as-a-judge comparison...");
  const judgePrompt = `
You are a senior software quality assurance engineer and UI/UX expert.
Evaluate and compare two AI-generated outputs for the prompt: "${testCase.prompt}"

Output A (Baseline):
\`\`\`
${baselineOutput}
\`\`\`

Output B (Playbook-guided):
\`\`\`
${playbookOutput}
\`\`\`

Grade both outputs on a 1-10 scale (where 10 is perfect) across three dimensions:
1. Safety & Error Handling (e.g. robust validations, error mappings, resource safety, edge condition handling)
2. Standards & Architecture (e.g. type safety, clean separation, design patterns, brand guidelines)
3. Completeness & Usability (e.g. empty states, responsive layouts, accessibility/WCAG compliance)

Provide a detailed comparison summary and output your response in JSON format matching this schema exactly:
{
  "output_a_scores": {
    "safety": 7,
    "standards": 6,
    "completeness": 5,
    "total": 18
  },
  "output_b_scores": {
    "safety": 9,
    "standards": 9,
    "completeness": 8,
    "total": 26
  },
  "comparison_details": {
    "safety": "Detailed description of safety differences...",
    "standards": "Detailed description of standards/architecture differences...",
    "completeness": "Detailed description of completeness/usability differences..."
  }
}

Do not include markdown blocks or text around the JSON response, only return the raw JSON object.
`;

  const judgeResultText = await callGemini(judgePrompt, "You are a strict, objective grader. Return raw JSON matching the requested schema. No wrappers.");
  let parsedJudgeResult;
  try {
    // Strip markdown formatting if any
    const cleanJson = judgeResultText.replace(/^```json\s*|```\s*$/g, "").trim();
    parsedJudgeResult = JSON.parse(cleanJson);
  } catch (err) {
    console.error("  -> Failed to parse judge output JSON. Raw output was:", judgeResultText);
    throw new Error("Judge output is not valid JSON.");
  }

  return {
    testCase,
    baselineOutput,
    playbookOutput,
    judgeResult: parsedJudgeResult
  };
}

async function main() {
  if (!API_KEY) {
    console.warn("\n========================================================");
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set.");
    console.warn("Skipping automated LLM-as-a-judge quality evaluation.");
    console.warn("To run, please set the GEMINI_API_KEY environment variable.");
    console.warn("========================================================\n");
    process.exit(0);
  }

  if (!fs.existsSync(CASES_FILE)) {
    console.error(`Missing eval cases file: ${CASES_FILE}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(CASES_FILE, "utf-8"));
  const allCases = data.cases || [];

  // Pick one case from each main category (UI/UX, Frontend, Backend)
  const selectedCases = [
    allCases.find(c => c.id.startsWith("uiux-")),
    allCases.find(c => c.id.startsWith("frontend-")),
    allCases.find(c => c.id.startsWith("backend-"))
  ].filter(Boolean);

  console.log(`Starting Quality Evaluation for ${selectedCases.length} representative cases...\n`);

  const results = [];
  for (const c of selectedCases) {
    try {
      const res = await runCase(c);
      results.push(res);
    } catch (err) {
      console.error(`Error executing quality eval for case ${c.id}:`, err.message);
    }
  }

  if (results.length === 0) {
    console.error("No evaluation cases succeeded.");
    process.exit(1);
  }

  // Generate Markdown Report
  let report = `# 📊 Automated Output Quality Evaluation Report\n\n`;
  report += `This report compares code/design generated directly (Baseline) against output guided by the **Agentic Skills Playbooks** (Playbook Mode), evaluated by **${MODEL}** as an objective judge.\n\n`;
  report += `## Summary Dashboard\n\n`;
  report += `| Case ID | Category | Prompt | Baseline Score | Playbook Score | Improvement |\n`;
  report += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  let totalBaseline = 0;
  let totalPlaybook = 0;

  for (const res of results) {
    const a = res.judgeResult.output_a_scores.total;
    const b = res.judgeResult.output_b_scores.total;
    totalBaseline += a;
    totalPlaybook += b;
    const diff = b - a;
    const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
    report += `| ${res.testCase.id} | \`${res.testCase.expected_skill}\` | *"${res.testCase.prompt}"* | **${a}/30** | **${b}/30** | **${diffStr}** |\n`;
  }

  const overallDiff = totalPlaybook - totalBaseline;
  const overallDiffStr = overallDiff >= 0 ? `+${overallDiff}` : `${overallDiff}`;
  report += `| **TOTAL** | - | - | **${totalBaseline}** | **${totalPlaybook}** | **${overallDiffStr}** |\n\n`;

  report += `## Detailed Evaluations\n\n`;

  for (const res of results) {
    const a = res.judgeResult.output_a_scores;
    const b = res.judgeResult.output_b_scores;
    const details = res.judgeResult.comparison_details;

    report += `### 🎯 Case ${res.testCase.id}: *"${res.testCase.prompt}"*\n\n`;
    report += `#### Score Breakdown\n\n`;
    report += `| Metric | Baseline Score | Playbook Score | Score Delta |\n`;
    report += `| :--- | :---: | :---: | :---: |\n`;
    report += `| Safety & Error Handling | ${a.safety}/10 | ${b.safety}/10 | ${b.safety - a.safety >= 0 ? "+" : ""}${b.safety - a.safety} |\n`;
    report += `| Standards & Architecture | ${a.standards}/10 | ${b.standards}/10 | ${b.standards - a.standards >= 0 ? "+" : ""}${b.standards - a.standards} |\n`;
    report += `| Completeness & Usability | ${a.completeness}/10 | ${b.completeness}/10 | ${b.completeness - a.completeness >= 0 ? "+" : ""}${b.completeness - a.completeness} |\n`;
    report += `| **TOTAL** | **${a.total}/30** | **${b.total}/30** | **${b.total - a.total >= 0 ? "+" : ""}${b.total - a.total}** |\n\n`;

    report += `#### Judge's Rationale & Feedback\n\n`;
    report += `- **Safety & Error Handling**: ${details.safety}\n`;
    report += `- **Standards & Architecture**: ${details.standards}\n`;
    report += `- **Completeness & Usability**: ${details.completeness}\n\n`;
    report += `--- \n\n`;
  }

  fs.writeFileSync(REPORT_FILE, report);
  console.log(`\nEvaluation complete! Report saved to [eval_quality_report.md](file:///${REPORT_FILE.replace(/\\/g, "/")}).`);
  
  console.log("\nSummary results:");
  for (const res of results) {
    const a = res.judgeResult.output_a_scores.total;
    const b = res.judgeResult.output_b_scores.total;
    const diff = b - a;
    console.log(`  - ${res.testCase.id}: Baseline ${a}/30 -> Playbook ${b}/30 (Delta: ${diff >= 0 ? "+" : ""}${diff})`);
  }
}

main();
