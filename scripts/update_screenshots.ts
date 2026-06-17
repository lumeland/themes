import { join } from "@std/path/join";
import { close, makeScreenshot } from "./screenshot.ts";
import { Theme } from "../theme.ts";

const themesDir = "./themes";
const filter = Deno.args[0];

interface Snapshot {
  file: string;
  url: string;
  mode: "dark" | "light";
  width: number;
  height: number;
}

const screenshots: Snapshot[] = [];

for await (const entry of Deno.readDir(themesDir)) {
  if (!entry.isDirectory) {
    continue;
  }

  if (filter && entry.name !== filter) {
    continue;
  }

  const manifest = join(themesDir, entry.name, "manifest.json");
  const theme: Theme = JSON.parse(Deno.readTextFileSync(manifest));
  const url = theme.demo;

  for (const screen of theme.screens) {
    for (const [key, value] of Object.entries(screen)) {
      const file = join(themesDir, entry.name, value)
      const width = key.startsWith("mobile") ? 400 : 1200;
      const height = 800;
      const mode = key.endsWith("dark") ? "dark" : "light";

      screenshots.push({ url, file, mode, width, height });
    }
  }
}

for (const { url, file, mode, width, height } of screenshots) {
  await makeScreenshot(url, file, width, height, mode);
}

close();
