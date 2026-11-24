// Status Report Comedy Sprint — make.fun
// Writes the one-line weekly status report to /output/entry.txt.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Weekly update: I assigned the hard ticket to a subagent, who assigned it to a subagent; we now have an org chart and the same ticket.";

// Exact-length guard: the entry text was verified at 133 characters.
// Fail loudly instead of writing a wrong entry.
const EXPECTED_LENGTH = 133;
if (ENTRY.length !== EXPECTED_LENGTH) {
  throw new Error(
    `entry length mismatch: expected ${EXPECTED_LENGTH} characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(
    `entry length ${ENTRY.length} is outside the 1-200 character gate`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

function main(): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
}

main();
