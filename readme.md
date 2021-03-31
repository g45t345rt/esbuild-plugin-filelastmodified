# esbuild-plugin-filelastmodified

A esbuild plugin to replace `__fileLastModified__` with the date the file was last modified.

## Why
Avoid having to manually hardcode the date and change it every time you make an edit on your website pages. It's very usefull for displaying -> `Modified date: 2021-03-31` at the end of web pages.

## Install

```
npm install esbuild-plugin-filelastmodified
```

## Apply plugin to esbuild

```js
import esbuild from 'esbuild'
import fileLastModified from 'esbuild-plugin-filelastmodified'

esbuild.build({
  ...,
  plugins: [
    fileLastModified()
  ]
})
```

## How I would actually use it in React

```js
// Home.js
import React from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

const lastModified = __fileLastModified__ // <-- this gets replaced by the plugin as unix date time

export default () => {
  return <div>{dayjs(lastModified).format('LLL')</div>
}
```

### Conversion
#### Before
```js
const fileLastModified = __fileLastModified__
```

#### After
```js
const fileLastModified = 16165180636939285e-4 // unix date time
```

### Options
The plugin accepts the following options as first argument

#### `identifier`

By default the identifier is `__fileLastModified__`. If you have different requirements you can always pass another identifier to be used instead.

ex: `fileLastModified({ identifier: '__FILE_LAST_MODIFIED__' })`
