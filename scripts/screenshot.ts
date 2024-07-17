/// <reference lib="dom" />

import { launch } from "jsr:@astral/astral@0.4.3";
import { dirname } from "jsr:@std/path@1.0.0/dirname";

const browser = await launch();

type Theme = "light" | "dark";

export async function makeScreenshot(
  url: string,
  path: string,
  width: number,
  height: number,
  theme?: Theme,
) {
  const page = await browser.newPage(url);
  page.setViewportSize({ width, height });

  if (theme === "dark") {
    await page.emulateMediaFeatures([{
      name: "prefers-color-scheme",
      value: "dark",
    }]);
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    });
    await page.waitForTimeout(1000); // Wait for transitions
  }

  const screenshot = await page.screenshot({
    format: "png",
  });
  try {
    Deno.mkdirSync(dirname(path), { recursive: true });
  } catch {
    // Ignore
  }
  await Deno.writeFile(path, screenshot);
  await page.close();
}

export function close() {
  browser.close();
}
