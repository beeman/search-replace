# search-replace

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/beeman/search-replace.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/beeman/search-replace.svg)
![npm](https://img.shields.io/npm/dw/search-replace.svg)
![npm](https://img.shields.io/npm/dm/search-replace.svg)
![npm](https://img.shields.io/npm/dy/search-replace.svg)
![npm](https://img.shields.io/npm/dt/search-replace.svg)
![NPM](https://img.shields.io/npm/l/search-replace.svg)
![npm](https://img.shields.io/npm/v/search-replace.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/beeman/search-replace.svg)
![npm collaborators](https://img.shields.io/npm/collaborators/search-replace.svg)

A simple tool to help you search/replace throughout a codebase.

# Usage

Search and replace all instances of `Foo` with `Bar` and `foo` with `bar` in the current working dir and all subdirs.

Install globally if you want fast access to it.

```shell script
npm o -g search-replace
```

Search and replace all occurrences of `foo` with `bar`: 

```shell script
npx search-replace -p foo,bar 
```

You can specify multiple pairs:

```shell script
npx search-replace -p foo,bar -p Foo,Bar  
```

It can also rename the files:

```shell script
npx search-replace -p foo,bar --rename-files  
```

All options:

```shell script
Usage: search-replace -p foo,bar

Options:
  --version           Show version number                              [boolean]
  -d, --dry           Don't make any changes          [boolean] [default: false]
  -r, --rename-files  Renames files                   [boolean] [default: false]
  -f, --regexp-flags  Flags to pass in to regexp         [string] [default: "g"]
  -w, --working-dir   Working dir                        [string] [default: "."]
  -p, --pair          The search,replace pairs             [array] [default: []]
  -s, --separator     Separator between search,replace    [array] [default: ","]
  -h, --help          Show help                                        [boolean]
```

## Credits

This is just a simple wrapper, the heavy lifting is done by [adamreisnz/replace-in-file](https://github.com/adamreisnz/replace-in-file).

## MIT License
