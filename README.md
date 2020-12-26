# pretty-table

![version](https://img.shields.io/github/package-json/v/117/pretty-table?color=196DFF&style=flat-square)
![language](https://img.shields.io/github/languages/code-size/117/pretty-table?color=F1A42E&style=flat-square)
![build](https://img.shields.io/github/workflow/status/117/pretty-table/test?style=flat-square)
![prettier](https://img.shields.io/static/v1?label=code%20style&message=prettier&color=ff51bc&style=flat-square)

Format data to a console-friendly table.

## Contents

- [Features](#features)
- [Install](#install)
- [Example](#example)
- [Contributing](#contributing)

## Features

- [x] Extremely fast.
- [x] Prints your data to pretty tables.

## Install

From NPM:

```terminal
$ npm i @master-chief/pretty-table
```

## Example

```typescript
import pretty from '@master-chief/pretty-table'

let data = [
  { name: 'cosmo', animal: 'cat', age: 12 },
  { name: 'mabel', animal: 'dog', age: 18 },
]

console.log(pretty(data))
```

The above code will output a formatted (and pretty 😍) table.

```terminal
name  animal age
cosmo cat    12
mabel dog    18
```

## Contributing

Feel free to contribute and PR to your 💖's content. 
