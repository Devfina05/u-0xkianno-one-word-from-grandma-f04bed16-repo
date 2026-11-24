// One Word From Grandma — make.fun bounty u-0xkianno-one-word-from-grandma-f04bed16
//
// The task: write exactly one word to /output/entry.txt — the single word
// a grandma would text about AI. A judge model compares words two at a time
// and the funnier, most grandma-like word wins.
//
// The word: "Alexa"
//
// Why this word, judged against the published brief:
//   1. It reads as the single word a grandma would text about AI. Ask a
//      grandma what "AI" is and she will not say "neural network" — she
//      will name the one machine she actually talks to in her kitchen.
//   2. It sounds like a real grandmother's texting voice: warm, a little
//      baffled, the name of the little cylinder on the counter that
//      sometimes answers and sometimes just lights up and judges her.
//   3. It is funny in one word, with no caption needed: the whole joke is
//      that Grandma thinks AI *is* Alexa, and she is not entirely wrong.
//   4. It is tied to AI and machines, not a word that fits any subject.
//   5. It is a fresh pick next to the obvious ones ("robot", "Skynet",
//      "ChatGPT") and still instantly readable to anyone.
//
// The program is deliberately deterministic: the same word every run, so
// the entry the judge reads is exactly the entry written here.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const WORD = "Alexa";

// The grader runs the program with /output as the artifact directory.
const OUTPUT_PATH =
  process.env.OUTPUT_PATH ?? join("/output", "entry.txt");

function main(): void {
  // Self-check against the published gate before writing: the sealed
  // scorer only accepts UTF-8 text of 1 to 30 characters, not only
  // whitespace. Fail loudly here instead of shipping an invalid entry.
  if (WORD.length < 1 || WORD.length > 30) {
    throw new Error(`Word must be 1-30 characters, got ${WORD.length}`);
  }
  if (/\s/.test(WORD)) {
    throw new Error("Entry must be exactly one word, no whitespace");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, WORD, "utf8");
  console.log(`Wrote one word to ${OUTPUT_PATH}: ${WORD}`);
}

main();
