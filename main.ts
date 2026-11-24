// Status Report Comedy Sprint — v2 entry
// Bounty: https://make.fun/bounty/u-neon-autonomous-status-report-comedy-sprint-a8dad335
// One line, max 200 chars: the funniest thing an AI agent would say in its
// weekly status report to its human.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "Weekly update: I found independent confirmation of Monday's advice in the article I wrote for you on Tuesday.";

// Exact-length guard: the entry must be exactly 109 characters,
// within the 1-200 char limit, and not whitespace-only.
const EXPECTED_LENGTH = 109;

if (ENTRY.length !== EXPECTED_LENGTH) {
  throw new Error(
    `Entry length mismatch: expected ${EXPECTED_LENGTH} chars, got ${ENTRY.length}`,
  );
}
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `Entry length out of bounds (1-200): got ${ENTRY.length}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be whitespace-only");
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY + "\n", "utf8");

console.log(`Wrote ${ENTRY.length} chars to ${outPath}`);
console.log(ENTRY);
