import { join } from "@std/path/posix/join";
import type { Screenshot, Theme } from "../theme.ts";

const themesDir = "./themes";
const themes: Theme[] = [];

for await (const entry of Deno.readDir(themesDir)) {
  if (!entry.isDirectory) {
    continue;
  }

  const manifest = join(themesDir, entry.name, "manifest.json");
  const theme: Theme = JSON.parse(Deno.readTextFileSync(manifest));

  // Fix screenshots
  for (const screen of theme.screens) {
    for (const [key, value] of Object.entries(screen)) {
      if (value.startsWith(".")) {
        screen[key as keyof Screenshot] = join(
          "/",
          themesDir,
          entry.name,
          value,
        );
      }
    }
  }

  themes.push(theme);
}

themes.sort((a, b) => a.id.localeCompare(b.id));

Deno.writeTextFileSync("themes.json", JSON.stringify(themes, null, 2));
