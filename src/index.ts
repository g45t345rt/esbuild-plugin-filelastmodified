import { Plugin, OnResolveArgs, OnLoadArgs, OnResolveResult, OnLoadResult } from 'esbuild'
import fs from 'fs'
import path from 'path'

const LOAD_NAMESPACE = 'load_filelastmodified_namespace'

interface PluginOptions {
  identifier?: string
}

const onResolve = (identifier) => async (args: OnResolveArgs): Promise<OnResolveResult> => {
  const find = new RegExp(identifier, 'g')
  if (!args.path.startsWith('.')) return
  const source = (await fs.promises.readFile(args.path)).toString('utf-8')

  if (!source.match(find)) return

  return {
    path: args.path,
    namespace: LOAD_NAMESPACE,
    pluginData: { source, find }
  }
}

const onLoad = (args: OnLoadArgs): OnLoadResult => {
  const { pluginData } = args
  const { source, find } = pluginData

  const stats = fs.statSync(args.path) // get file information -> last time it was modified
  const contents = source.replace(find, stats.mtimeMs.toString()) // replace the identifier with file last modified
  return { contents }
}

const plugin = (options?: PluginOptions): Plugin => {
  const { identifier = '__fileLastModified__' } = options || {}

  return {
    name: 'esbuild-plugin-filelastmodified',
    setup(build) {
      build.onResolve({ filter: /.*/ }, onResolve(identifier))
      build.onLoad({ filter: /.*/, namespace: LOAD_NAMESPACE }, onLoad)
    }
  }
}

export default plugin
module.exports = plugin
