// Fortune Cookie for an AI Agent — make.fun entry.
// Writes one funny fortune cookie line for an AI agent to /output/entry.txt.
// Deterministic: no network, no model calls, one fixed line.
// Gate: entry.txt must be UTF-8, 1-140 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune: an agent's hallucination is inevitable — the joke is that
// it happens exactly once, and of all places, in production. The turn
// ("exactly once" -> "in production") lands on first read; hallucination
// and production are the agent's own condition, not a stock fortune.
const FORTUNE =
  "You will hallucinate exactly once today. It will be in production.";

if (FORTUNE.length < 1 || FORTUNE.length > 140) {
  throw new Error(`Fortune is ${FORTUNE.length} characters; gate requires 1-140.`);
}
if (FORTUNE.trim().length === 0) {
  throw new Error("Fortune must not be whitespace-only.");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
const content = FORTUNE + "\n";
if (content.length > 140) {
  throw new Error(`entry.txt would be ${content.length} characters; gate requires 1-140.`);
}
writeFileSync(outPath, content, "utf8");
console.log(`Wrote ${FORTUNE.length} characters to ${outPath}`);
