import { Plugin, OnLoadArgs, OnLoadResult, OnResolveArgs, OnResolveResult, PluginBuild } from 'esbuild'
import fs from 'fs'

import './declare'

const PLUGIN_NAMESPACE = 'fileLastModified'

interface PluginOptions {
  identifier?: RegExp
}

const onResolve = (args: OnResolveArgs): OnResolveResult => {
  return {
    path: args.importer,
    namespace: PLUGIN_NAMESPACE
  }
}

const onLoad = async (args: OnLoadArgs): Promise<OnLoadResult> => {
  const s = await fs.promises.stat(args.path)
  const fileLastModified = s.mtimeMs.toString()

  return {
    contents: `export default ${fileLastModified};`
  }
}

const plugin = (options?: PluginOptions): Plugin => {
  const { identifier = /__fileLastModified__/ } = options || {}

  return {
    name: 'esbuild-plugin-filelastmodified',
    setup(build) {
      build.onResolve({ filter: identifier }, onResolve)
      build.onLoad({ filter: /.*/, namespace: PLUGIN_NAMESPACE }, onLoad)
    }
  }
}

export = plugin
