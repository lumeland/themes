# Lume themes registry

This registry is used to create the Themes section at https://lume.land/themes/.
It's also used by [Lume init](https://github.com/lumeland/init) to automatically
setup new Lume projects.

## Data schema

```ts
interface Theme {
  /**
   * An unique identifier for the theme.
   * It's used to install the theme using the `--theme=id` flag.
   */
  id: string;

  /** The name of the theme */
  name: string;

  /** A short description of the theme. */
  description: string;

  /** An array of tags to search and filter. */
  tags: string[];

  /** Lume version required. Everything but `3` is ignored. */
  lume_version: number;

  /** The author of the theme */
  author: {
    name: string;
    url: string;
  };

  /** The URL of the Git repository with the theme code. */
  repo: string;

  /** An URL with a demo of the theme. */
  demo: string;

  /**
   * An array of objects with screenshots of the theme.
   * Every screenshot can have four versions
   * The images are stored in the `/screens` directory.
   */
  screens: Array<{
    desktop: string;
    desktop_dark?: string;
    mobile?: string;
    mobile_dark?: string;
  }>;

  /** An object with the data to import the theme */
  module: {
    /**
     * The module name. Used as the variable name to import the module:
     * `import [name] from [specifier]`
     */
    name: string;

    /**
     * Module Id in the format [registry]/[package].
     * Supported registered so far: denoland, jsdelivr
     */
    id: string;

    /**
     * URL origin to create the import map
     * The URL MUST NOT include the version
     * it's obtained and updated automatically
     */
    origin: string;

    /* The path to the main module to import (ex: `/mod.ts`) */
    main: string;

    /**
     * If the theme includes LumeCMS, the name of the configuration file
     * ex: `/_cms.ts`
     */
    cms?: string;

    /** An array of files to be copied to the src folder. */
    src?: string[];

    /**
     * The path of the src directory in the theme repo if it's not the root.
     * ex: `/src`
     */
    srcdir?: string;

    /** Optional compile options to include in the deno.json file. */
    compileOptions?: Record<string, unknown>;

    /** Optional imports for the import map. */
    imports?: Record<string, string>;

    /** Optional unstable flags for Deno. */
    unstable?: string[];
  };
}
```
