import test from 'ava'
import fs from 'fs'
import path from 'path'

import config from '../config'
import tachyonsGenerator from '../'

test('Line heights fall back to default values when not included.', async t => {
  const tachy = tachyonsGenerator()
  const { lineHeight } = await tachy.modules()

  t.snapshot(lineHeight)
})

test('Line heights are generated when included in config.', async t => {
  const tachy = tachyonsGenerator({ lineHeight: [1.3, 1.5, 1.7] })
  const { lineHeight } = await tachy.modules()

  t.snapshot(lineHeight)
})
