import { launch } from "jsr:@astral/astral@0.4.3";

const browser = await launch();

interface Size {
  width: number;
  height: number;
}

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
  }
  const screenshot = await page.screenshot({
    format: "png",
  });
  await Deno.writeFile(path, screenshot);
}

export function close() {
  browser.close();
}
