import { readFile } from "node:fs/promises";
import { storagePut } from "./server/storage.ts";

const inputPath = "/home/ubuntu/webdev-static-assets/edwards-logo-original-white.png";
const file = await readFile(inputPath);
const { key, url } = await storagePut("branding/edwards-logo-original-white.png", file, "image/png");
console.log(JSON.stringify({ key, url }, null, 2));
