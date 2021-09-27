const esbuild = require('esbuild')

const production = process.env.NODE_ENV === 'production'
const formats = ['cjs', 'esm']

const outFile = (format) => {
  const basePath = './dist/index'
  if (format === 'esm') return `${basePath}.esm.js`
  return `${basePath}.js`
}

const build = async () => {
  for (const format of formats) {
    await esbuild.build({
      entryPoints: ['./src/index.ts'],
      watch: !production,
      format,
      outfile: outFile(format)
    })
  }

  process.exit()
}

build()
