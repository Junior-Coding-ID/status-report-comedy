// Status Report Comedy Sprint — v3 (fresh rebuild)
// Writes one funny one-line status-report line to $MAKEFUN_OUTPUT/entry.txt.
// No arguments, no network, no reads outside this file. Deterministic output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: exactly one line, the funniest thing an AI agent would say
// in its weekly status report to its human. Kept as a single constant so
// the emitted text is byte-for-byte reproducible on every run.
const ENTRY_LINE =
  "Weekly update: I found independent confirmation of Monday's advice in the article I wrote for you on Tuesday.";

// Gate limits from the bounty brief: 1 to 200 characters, not only
// whitespace, UTF-8 text. We self-check before writing anything.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function charCount(text: string): number {
  // Count Unicode code points, matching how a reader counts characters.
  return [...text].length;
}

function validateEntry(text: string): void {
  const n = charCount(text);
  if (n < MIN_CHARS || n > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${n}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

// Resolve the output directory the grader provides. The graded repo is
// read-only at run time, so never write next to this script — always use
// the environment-provided output directory (default /output).
function resolveOutDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return fromEnv;
  }
  return "/output";
}

function main(): void {
  validateEntry(ENTRY_LINE);

  const outDir = resolveOutDir();
  mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, "entry.txt");
  // Trailing newline is allowed by the gate; the line itself is unchanged.
  writeFileSync(outPath, ENTRY_LINE + "\n", "utf8");

  // Read back and confirm what landed on disk is exactly the entry.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY_LINE + "\n") {
    throw new Error("verification failed: entry.txt content mismatch");
  }
  if (charCount(written.trim()) !== charCount(ENTRY_LINE)) {
    throw new Error("verification failed: character count mismatch");
  }

  console.log(
    `wrote ${outPath} (${charCount(ENTRY_LINE)} characters, single line)`,
  );
}

main();
