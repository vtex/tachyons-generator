import test from 'ava'
import tachyonsGenerator from '../'

test("check if 3 different stylesheets were generated", async t => {
  const tachy = tachyonsGenerator()
  const stylesheets = await tachy.generateSeparateStylesheets()
  t.is(stylesheets.length, 3)
  t.snapshot(stylesheets)
})
