import { close, makeScreenshot } from "./screenshot.ts";
import themes from "../themes.json" with { type: "json" };

const filter = Deno.args[0];

interface Site {
  id: string;
  urls?: string[];
}

const sites: Site[] = [
  {
    id: "shiraha",
  },
  {
    id: "lumocs",
  },
  {
    id: "simple-blog",
  },
  {
    id: "simple-me",
  },
  {
    id: "simple-wiki",
  },
  {
    id: "istudymen",
  },
  {
    id: "top",
  },
];

for (const site of sites) {
  if (filter && site.id !== filter) {
    continue;
  }
  const theme = themes.find((theme) => theme.id === site.id);
  if (!theme) {
    console.error(`Theme not found for site ${site.id}`);
    continue;
  }

  const urls = site.urls ?? [theme.demo];

  for (const screen of theme.screens) {
    const url = urls.shift();

    if (!url) {
      console.error(`No URL for site ${site.id}`);
      continue;
    }

    for (const [type, path] of Object.entries(screen)) {
      switch (type) {
        case "mobile":
          await makeScreenshot(url, `.${path}`, 400, 800);
          break;
        case "mobile_dark":
          await makeScreenshot(url, `.${path}`, 400, 800, "dark");
          break;
        case "desktop":
          await makeScreenshot(url, `.${path}`, 1200, 800);
          break;
        case "desktop_dark":
          await makeScreenshot(url, `.${path}`, 1200, 800, "dark");
          break;
      }
      console.log(`Screenshot saved to .${path}`);
    }
  }
}

close();
