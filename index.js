'use strict'

const camelcase = require('camelcase')
const buildCss = require('./lib/build.js')
const DEFAULT_CONFIG = require('./config')

const generateDocs = require('./docs')
const generate = require('./lib/generate')
const assembleCss = require('./lib/assemble-css')

const DEFAULT_OPTIONS = {
  compileVars: true,
  minify: false,
}

module.exports = config => {
  const _config = Object.assign({}, DEFAULT_CONFIG, config)
  const mediaQueries = _config.customMedia

  generator.modules = async (options) => {
    const modules = await generate(_config, mediaQueries)

    return modules
  }

  generator.generate = async (options) => {
    options = Object.assign({}, DEFAULT_OPTIONS, options)

    let start = process.hrtime()
    const modules = await generate(_config, mediaQueries)
    let end = process.hrtime(start)
    console.info('GENERATE TIME: %ds %dms', end[0], end[1] / 1000000)

    start = process.hrtime()
    const post = await assembleCss(modules, _config)
    end = process.hrtime(start)
    console.info('ASSEMBLE TIME: %ds %dms', end[0], end[1] / 1000000)

    start = process.hrtime()
    const css = await buildCss(post, options)
    end = process.hrtime(start)
    console.info('BUILD TIME: %ds %dms', end[0], end[1] / 1000000)

    return css.css
  }

  generator.docs = async () => {
    const modules = await generate(_config, mediaQueries)

    const post = await assembleCss(modules, _config)

    const css = await buildCss(post, { minify: true })

    const docs = generateDocs(_config, { modules, min: css.css })

    return docs
  }

  function generator () {}
  return generator
}
