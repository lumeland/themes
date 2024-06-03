# Lume themes registry

This registry is used to create the Themes section at https://lume.land/themes/.
It's also used by [Lume init](https://github.com/lumeland/init) to automatically
setup new Lume projects.

## Data schema

Every theme must have the following fields:

### id

An unique identifier for the theme. It's used to install the theme using the
`--theme=id` flag.

### name

The name of the theme

### description

A short description of the theme.

### tags

An array of tags. It helps to search and filter themes.

### author

An object with the name of the author and an URL.

### repo

The URL of the GIT repository with the theme code.

### demo

An URL with a demo of the theme.

### screens

An array of objects with screenshots of the theme. Every screenshot should have
four versions: `desktop`, `desktop_dark`, `mobile` and `mobile_dark`. The images
are stored in the folder `screens`.

### module

An object with the data to import the theme. It has the following fields:

- **name**: The module name. It's used to generate the code to import the module
  like `import [name] from [specifier]`.
- **origin**: The origin of the module. Only `land/x` registry is supported
  currently. The URL **must not have the version** (the version is obtained and
  updated automatically).
- **main**: The path to the main module to import.
- **cms**: If the theme has the CMS configured, the name of the configuration
  file.
- **src**: An array of files to be copied to the src folder.
- **srcdir**: To configure a different `src` folder.
- **compileOptions**: Additional compile options for Deno.
- **imports**: Additional imports for the import map.
- **unstable**: Additional unstable flags for Deno.
