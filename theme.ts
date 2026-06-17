export interface Theme {
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
  screens: Screenshot[];

  /** An object with the data to import the theme */
  module: {
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

    /**
     * The path of the src directory in the theme repo if it's not the root.
     * ex: `/src`
     */
    srcdir?: string;

    /** An array of files to be copied (relative to srcdir). */
    src?: string[];

    /** Optional compile options to include in the deno.json file. */
    compileOptions?: CompilerOptions;

    /** Optional imports for the import map. */
    imports?: Record<string, string>;

    /** Deno permissions. */
    permissions?: {
      import?: string[];
      net?: string[];
    };

    /** Optional unstable flags for Deno. */
    unstable?: string[];
  };
}

export interface Screenshot {
  desktop: string;
  desktop_dark?: string;
  mobile?: string;
  mobile_dark?: string;
}

export interface CompilerOptions {
  jsx?: "jsx" | "react-jsx" | "precompile";
  jsxImportSource?: string;
  jsxImportSourceTypes?: string;
  jsxFactory?: string;
  jsxFragmentFactory?: string;
  types?: string[];
}
