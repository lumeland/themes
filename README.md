# Lume themes registry

This registry is used to create the Themes section at https://lume.land/themes/.
It's also used by [Lume init](https://github.com/lumeland/init) to automatically
setup new Lume projects.

## How to add your theme

- Create a folder in the inside [themes](./themes/).
- Create the `manifest.json` file with the theme details.
  - You can use one of the existing themes for reference or
    [see the theme.ts file](./theme.ts).
  - To test the manifest file locally, run the following code to create a new
    site with your theme:
    ```
    deno run -A https://lume.land/init.ts --theme="./path/to/manifest.json"
    ```
- Run `deno task update-screens [theme-id]` to generate the screenshots.
