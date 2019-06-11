import test from 'ava'
import tachyonsGenerator from '../'

test('should generate a print stylesheet', async t => {
  const tachy = tachyonsGenerator()
  const printStylesheet = await tachy.generatePrint()
  t.snapshot(printStylesheet)
})

test('should generate a print stylesheet with custom key identifier', async t => {
  const tachy = tachyonsGenerator()
  const printStylesheet = await tachy.generatePrint({ key: 'p' })
  t.snapshot(printStylesheet)
})

test('should generate a minified print stylesheet', async t => {
  const tachy = tachyonsGenerator()
  const printStylesheet = await tachy.generatePrint({ key: 'p', minify: true })
  t.snapshot(printStylesheet)
})
