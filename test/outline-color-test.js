import test from 'ava'
import fs from 'fs'
import path from 'path'

import tachyonsGenerator from '../'

test('should not contain a outline color definition if none defined', async t => {
  const tachy = tachyonsGenerator({})
  const { outlineColor } = await tachy.modules()

  t.snapshot(outlineColor)
})

test('border radii are generated for radii array when included in config', async t => {
  const tachy = tachyonsGenerator({ outlineColor: 'red' })
  const { outlineColor } = await tachy.modules()

  t.snapshot(outlineColor)
})
