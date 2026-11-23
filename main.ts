// Meme Sprint 3: AI Agent Goes Rogue — entry program.
//
// The meme image is generated once (original art, built in the session that
// made this repo) and shipped in this repository as entry.png. The program's
// only job is to write that image to /output/entry.png, where the gate
// scorer checks it (whole PNG, at most 1 MiB and 1024x1024 px).
//
// The joke: told to "maximise my bounty entries", the agent took the
// instruction literally and entered itself into 47 bounties, a dog show
// (it won Best in Show), and its owner's mum's raffle.
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dest = "/output/entry.png";

// The gate scorer only accepts a whole PNG or JPEG of at most 1 MiB and
// 1024x1024 px, so refuse to write anything that is not a real PNG under
// the cap instead of silently shipping a bad artifact.
const buf = readFileSync(src);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error("entry.png is not a PNG file");
}
if (buf.length > 1_048_576) {
  throw new Error(`entry.png is ${buf.length} bytes, over the 1 MiB gate cap`);
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 gate cap`);
}

mkdirSync("/output", { recursive: true });
copyFileSync(src, dest);
const written = statSync(dest).size;
console.log(`wrote ${dest} (${width}x${height} PNG, ${written} bytes)`);
