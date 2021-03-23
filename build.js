const esbuild = require('esbuild')

const production = process.env.NODE_ENV === 'production'
const formats = ['cjs', 'esm']

const build = async () => {
  for (const format of formats) {
    await esbuild.build({
      entryPoints: ['./src/index.ts'],
      watch: !production,
      format,
      outfile: `./dist/index${format === 'cjs' ? '' : '.' + format}.js`
    })
  }

  process.exit()
}

build()
