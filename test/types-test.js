import test from 'ava'
import tachyonsGenerator from '../'

test('generate with common as stylesheet type is ok', async t => {
  const tachy = tachyonsGenerator()
  const style = await tachy.generate({ stylesheetType: 'common' })
  t.snapshot(style)
})

test('generate with large as stylesheet type is ok', async t => {
  const tachy = tachyonsGenerator()
  const style = await tachy.generate({ stylesheetType: 'large' })
  t.snapshot(style)
})

test('generate with notsmall type is ok', async t => {
  const tachy = tachyonsGenerator({ customMedia: [{ m: 48 }, {ns: 48}, {l:64}]})
  const style = await tachy.generate({ stylesheetType: 'notsmall' })
  t.snapshot(style)
})

test('generate with invalid token as stylesheet type results in same as common', async t => {
  const tachy = tachyonsGenerator()

  const [style, common] = await Promise.all([
    tachy.generate({ stylesheetType: 'DOES_NOT_EXIST' }),
    tachy.generate({ stylesheetType: 'common' })
  ])

  t.is(style, common)
})