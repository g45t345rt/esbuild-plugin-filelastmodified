const { build } = require('esbuild')
const { assert } = require('chai')
const fileLastModified = require('../dist')

const test = (name, config) => {
  return build({
    entryPoints: [`${name}.js`],
    bundle: true,
    outdir: 'dist',
    plugins: [
      fileLastModified(config)
    ]
  }).catch(() => process.exit(1))
}

describe('fileLastModified esbuild tests', () => {
  it('Works with default settings', (done) => {
    test('default').then((res) => {
      assert(res)
      done()
    }).catch(done)
  })

  it('Works with another identifier', (done) => {
    test('identifier', { identifier: '__FILE_LAST_MODIFIED__' }).then((res) => {
      assert(res)
      done()
    }).catch(done)
  })

  it('Works with other imports', (done) => {
    test('other_imports').then((res) => {
      assert(res)
      done()
    }).catch(done)
  })
})
