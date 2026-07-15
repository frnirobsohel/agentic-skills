#!/usr/bin/env node
/** Validate syntax and balanced brackets in markdown code blocks. */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== ".git" && file !== "node_modules" && file !== "eval") {
        getFiles(filePath, fileList);
      }
    } else {
      if (
        filePath.endsWith(".md") ||
        filePath.endsWith(".template") ||
        filePath.endsWith(".json")
      ) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

function extractCodeBlocks(content) {
  const blocks = [];
  const lines = content.split("\n");
  let inBlock = false;
  let currentBlock = [];
  let startLine = 0;
  let lang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      if (inBlock) {
        blocks.push({
          lang,
          code: currentBlock.join("\n"),
          startLine: startLine + 1,
          endLine: i + 1,
        });
        inBlock = false;
        currentBlock = [];
      } else {
        inBlock = true;
        lang = line.trim().slice(3).trim().toLowerCase();
        startLine = i;
      }
    } else if (inBlock) {
      currentBlock.push(line);
    }
  }
  return blocks;
}

function checkBalanced(code, lang) {
  const stack = [];
  const openToClose = { "{": "}", "[": "]", "(": ")" };
  const closeToOpen = { "}": "{", "]": "[", ")": "(" };

  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inTripleQuoteSingle = false;
  let inTripleQuoteDouble = false;
  let inTemplateLiteral = false;
  let inLineComment = false;
  let inBlockComment = false;
  let inHashComment = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const prev = i > 0 ? code[i - 1] : "";
    const isEscaped = prev === "\\" && code[i - 2] !== "\\";

    // Hash comments (Python, PHP, Bash)
    if (inHashComment) {
      if (char === "\n") inHashComment = false;
      continue;
    }

    // Single-line comments (JS, TS, Go, Rust, PHP)
    if (inLineComment) {
      if (char === "\n") inLineComment = false;
      continue;
    }

    // Block comments
    if (inBlockComment) {
      if (char === "*" && code[i + 1] === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    // Triple quotes for Python
    if (inTripleQuoteDouble) {
      if (char === '"' && code[i + 1] === '"' && code[i + 2] === '"' && !isEscaped) {
        inTripleQuoteDouble = false;
        i += 2;
      }
      continue;
    }
    if (inTripleQuoteSingle) {
      if (char === "'" && code[i + 1] === "'" && code[i + 2] === "'" && !isEscaped) {
        inTripleQuoteSingle = false;
        i += 2;
      }
      continue;
    }

    // Standard string quote escapes
    if (inSingleQuote) {
      if (char === "'" && !isEscaped) inSingleQuote = false;
      continue;
    }
    if (inDoubleQuote) {
      if (char === '"' && !isEscaped) inDoubleQuote = false;
      continue;
    }
    if (inTemplateLiteral) {
      if (char === "`" && !isEscaped) inTemplateLiteral = false;
      continue;
    }

    // Detect comment and string boundaries
    if ((lang === "python" || lang === "py" || lang === "php" || lang === "bash" || lang === "sh") && char === "#") {
      inHashComment = true;
      continue;
    }

    if (char === "/" && code[i + 1] === "/") {
      inLineComment = true;
      i++;
      continue;
    }

    if (char === "/" && code[i + 1] === "*") {
      inBlockComment = true;
      i++;
      continue;
    }

    if (lang === "python" || lang === "py") {
      if (char === '"' && code[i + 1] === '"' && code[i + 2] === '"') {
        inTripleQuoteDouble = true;
        i += 2;
        continue;
      }
      if (char === "'" && code[i + 1] === "'" && code[i + 2] === "'") {
        inTripleQuoteSingle = true;
        i += 2;
        continue;
      }
    }

    if (char === "'") {
      inSingleQuote = true;
      continue;
    }

    if (char === '"') {
      inDoubleQuote = true;
      continue;
    }

    if (char === "`" && (lang === "javascript" || lang === "js" || lang === "typescript" || lang === "ts" || lang === "go" || lang === "golang")) {
      inTemplateLiteral = true;
      continue;
    }

    // Bracket parsing
    if (openToClose[char]) {
      stack.push({ char, index: i });
    } else if (closeToOpen[char]) {
      if (stack.length === 0) {
        return `Unmatched closing bracket '${char}' at index ${i}`;
      }
      const last = stack.pop();
      if (last.char !== closeToOpen[char]) {
        return `Mismatched bracket: expected '${openToClose[last.char]}' for '${last.char}', but found '${char}' at index ${i}`;
      }
    }
  }

  if (inTripleQuoteDouble) return 'Unclosed triple quote (""")';
  if (inTripleQuoteSingle) return "Unclosed triple quote (''')";
  if (inSingleQuote) return "Unclosed single quote (')'";
  if (inDoubleQuote) return 'Unclosed double quote (")';
  if (inTemplateLiteral) return "Unclosed backtick (`)";
  if (inBlockComment) return "Unclosed block comment (/*)";
  if (stack.length > 0) {
    return `Unclosed brackets remaining: ${stack.map((x) => x.char).join(", ")}`;
  }

  return null;
}

function main() {
  const errors = [];
  const files = getFiles(ROOT);

  for (const file of files) {
    const relativePath = path.relative(ROOT, file);
    
    // Validate JSON files directly
    if (file.endsWith(".json")) {
      try {
        JSON.parse(fs.readFileSync(file, "utf-8"));
      } catch (err) {
        errors.push(`${relativePath}: Invalid JSON format: ${err.message}`);
      }
      continue;
    }

    const content = fs.readFileSync(file, "utf-8");
    const blocks = extractCodeBlocks(content);

    for (const block of blocks) {
      // Validate JSON blocks
      if (block.lang === "json") {
        try {
          JSON.parse(block.code);
        } catch (err) {
          errors.push(
            `${relativePath} (lines ${block.startLine}-${block.endLine}): Invalid JSON code block: ${err.message}`
          );
        }
        continue;
      }

      // Check balance for languages with braces/brackets
      const checkableLangs = ["javascript", "js", "typescript", "ts", "python", "py", "go", "golang", "rust", "rs", "php", "css", "html"];
      if (checkableLangs.includes(block.lang)) {
        const error = checkBalanced(block.code, block.lang);
        if (error) {
          errors.push(
            `${relativePath} (lines ${block.startLine}-${block.endLine}, lang: ${block.lang}): ${error}`
          );
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error("Code Snippet Validation FAILED:\n");
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log(`All code blocks and JSON files validated successfully (${files.length} files scanned).`);
}

main();
