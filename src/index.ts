import { Plugin, OnLoadArgs, OnLoadResult } from 'esbuild'
import fs from 'fs'

interface PluginOptions {
  identifier?: string
}

const onLoad = (identifier) => async (args: OnLoadArgs): Promise<OnLoadResult> => {
  const find = new RegExp(identifier, 'g')
  const source = (await fs.promises.readFile(args.path)).toString('utf-8')

  if (!source.match(find)) return
  const stats = fs.statSync(args.path) // get file information -> last time it was modified
  const contents = source.replace(find, stats.mtimeMs.toString()) // replace the identifier with file last modified
  return { contents }
}

const plugin = (options?: PluginOptions): Plugin => {
  const { identifier = '__fileLastModified__' } = options || {}

  return {
    name: 'esbuild-plugin-filelastmodified',
    setup(build) {
      build.onLoad({ filter: /.*/ }, onLoad(identifier))
    }
  }
}

export default plugin
module.exports = plugin
