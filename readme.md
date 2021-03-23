# esbuild-plugin-filelastmodified

A esbuild plugin to replace `__fileLastModified__` with the actual time the file has been modified.

## Why
Avoid having to manually change the the last time the file was modified everytime you make an edit.

## Install

```
npm install esbuild-plugin-filelastmodified
```

## Usage

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
