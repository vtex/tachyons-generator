import test from 'ava'
import globby from 'globby'
import camel from 'camelcase'
import fs from 'fs'
import path from 'path'

import config from '../config'
import tachyonsGenerator from '../'

test('media-queries are handled correctly', async t => {
  const tachy = tachyonsGenerator(config)
  const { display } = await tachy.modules()

  t.snapshot(display)
})

test('type-scale', async t => {
  const tachy = tachyonsGenerator(config)
  const { typeScale } = await tachy.modules()

  t.snapshot(typeScale)
})

test('module skipping', async t => {
  const tachy = tachyonsGenerator({ skipModules: ['aspect-ratios'] })
  const { aspectRatios } = await tachy.modules()

  t.is(aspectRatios, undefined)
})

test('css', async t => {
  const tachy = tachyonsGenerator(config)

  const css = await tachy.generate()
  const docs = await tachy.docs()

  fs.writeFileSync('out.css', css)
  fs.writeFileSync('out.html', docs)

  t.snapshot(css)
})
