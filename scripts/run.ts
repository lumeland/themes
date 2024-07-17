import { close, makeScreenshot } from "./screenshot.ts";
import themes from "../themes.json" with { type: "json" };

const filter = Deno.args[0];

const sites = [
  {
    id: "shiraha",
    urls: [
      "https://lume.shiraha.js.org/",
    ],
  },
  {
    id: "lumocs",
    urls: [
      "https://lumocs.56k.guru/",
    ],
  },
  {
    id: "simple-blog",
    urls: [
      "https://lumeland.github.io/theme-simple-blog/",
    ],
  },
  {
    id: "simple-me",
    urls: [
      "https://lumeland.github.io/theme-simple-me/",
    ],
  },
  {
    id: "simple-wiki",
    urls: [
      "https://lumeland.github.io/theme-simple-wiki/",
    ],
  },
  {
    id: "istudymen",
    urls: [
      "https://istudymen.github.io/",
    ],
  },
  {
    id: "top",
    urls: [
      "https://tarugoconf.github.io/TOP/",
    ],
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

  for (const screen of theme.screens) {
    const url = site.urls.shift();

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
