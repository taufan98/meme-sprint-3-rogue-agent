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
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dest = "/output/entry.png";

mkdirSync("/output", { recursive: true });
copyFileSync(src, dest);
console.log(`wrote ${dest}`);
