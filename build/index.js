'use strict'

const postcss = require('postcss')
const cssnano = require('cssnano')
const queries = require('css-mqpacker')
const perfect = require('perfectionist')
const prefixer = require('autoprefixer')
const atImport = require('postcss-import')
const media = require('postcss-custom-media')
const vars = require('postcss-css-variables')
const extend = require('postcss-extend-rule')
const conditionals = require('postcss-conditionals')
const rmComments = require('postcss-discard-comments')
const nested = require('postcss-nested')

const getPlugins = function (options) {
  options = options || {}

  const perfectionistOptions = options.perfectionist || {
    format: 'compact',
    trimTrailingZeros: false
  }

  // The order of PostCSS plugins matters
  let plugins = [
    nested(),
    atImport({})
  ]

  if (options.compileVars) {
    plugins = plugins.concat(vars())
  }

  plugins = plugins.concat([
    conditionals(),
    media(),
    queries(),
    perfect(perfectionistOptions),
    prefixer(),
    extend()
  ])

  if (options.minify) {
    plugins = plugins.concat([
      cssnano(),
      rmComments()
    ])
  }

  return plugins
}

module.exports = function tachyonsBuild (css, options) {
  const plugins = getPlugins(options)

  options = options || {}
  options.from = undefined

  return postcss(plugins).process(css, options)
}
