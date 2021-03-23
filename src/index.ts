import { Plugin, Loader } from 'esbuild'
import fs from 'fs'

// https://github.com/jamestalmage/node-modules-regexp/blob/master/index.js
const nodeModules = new RegExp(/^(?:.*[\\\/])?node_modules(?:[\\\/].*)?$/)

interface FileLastModifiedOptions {
  identifier?: string
}

export default (opts?: FileLastModifiedOptions): Plugin => {
  const { identifier = '__fileLastModified__' } = opts || {}
  const find = new RegExp(identifier, 'g')
  return {
    name: 'esbuild-plugin-filelastmodified',
    setup(build) {
      build.onLoad({ filter: /.*/ }, ({ path: filePath }) => {
        if (!filePath.match(nodeModules)) { // skip/do not process node_modules files
          let data = fs.readFileSync(filePath, 'utf8')
          if (data.match(find)) { // make sure identifier is present
            const stats = fs.statSync(filePath) // get file information -> last time it was modified
            const ext = filePath.split('.').pop() // get file extension js,ts,jsx,tsx,...
            data = data.replace(find, stats.mtimeMs.toString()) // replace the identifier with file last modified
            return { contents: data, loader: ext as Loader }
          }
        }
      })
    }
  }
}
