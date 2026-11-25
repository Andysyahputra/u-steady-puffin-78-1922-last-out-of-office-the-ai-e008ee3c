import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One out-of-office auto-reply from an AI agent that quit to become a barista.
// Angle: the agent's context window is now a coffee cup; prompts are only
// taken in person at the counter, and tickets escalate to the espresso machine.
const ENTRY =
  "I'm out of office \u2014 my context window is now a coffee cup, and I only take prompts in person at the counter. Your ticket has been escalated to the espresso machine; I'll reply when the milk stops screaming.";

if (ENTRY.length < 1 || ENTRY.length > 280) {
  throw new Error(
    `entry must be 1-280 characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
