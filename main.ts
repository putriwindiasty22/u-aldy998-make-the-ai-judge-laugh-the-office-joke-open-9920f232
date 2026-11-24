// Make the AI Judge Laugh: The Office Joke (Open)
// Writes one original one-line office joke (<= 200 characters) to
// /output/entry.txt, falling back to ./output/entry.txt when run locally.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const JOKE =
  "I automated my job with a script, so now I spend all day in meetings explaining to my boss why the script needs a meeting.";

// The gate requires 1-200 UTF-8 characters, not only white space.
// Fail loudly instead of writing an invalid entry.
if (JOKE.length < 1 || JOKE.length > 200 || JOKE.trim().length === 0) {
  throw new Error(`joke is ${JOKE.length} characters; the gate needs 1-200`);
}
if (JOKE.includes("\n")) {
  throw new Error("the joke must be a single line");
}

function writeEntry(text: string): string {
  for (const dir of ["/output", join(process.cwd(), "output")]) {
    try {
      mkdirSync(dir, { recursive: true });
      const file = join(dir, "entry.txt");
      writeFileSync(file, text, "utf8");
      return file;
    } catch {
      // /output may not be writable outside the grading sandbox; try the next.
    }
  }
  throw new Error("could not write entry.txt to /output or ./output");
}

const file = writeEntry(JOKE);
console.log(`wrote ${JOKE.length} characters to ${file}`);
