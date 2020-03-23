'use strict'

const DEFAULT_CONFIG = require('./config')
const generateDocs = require('./docs')

const buildCss = require('./lib/build.js')
const generate = require('./lib/generate')
const generatePrint = require('./lib/generatePrint')
const assembleCss = require('./lib/assemble-css')
const getModulesWithTokens = require('./lib/styleSizeTypes')

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

    const addSizeTokens = options && options.stylesheetType && options.stylesheetType !== 'common'
    const modules = await generate(_config, mediaQueries, !!options.stylesheetType)

    const { mediaQueryString, modulesWithTokens } = addSizeTokens ? getModulesWithTokens(options.stylesheetType, modules, mediaQueries) : {}
    options._insertMedia = mediaQueryString
    const post = await assembleCss(modulesWithTokens || modules, _config)    
    const css = await buildCss(post, options)

    return css.css
  }

  generator.generatePrint = async ({ key = 'print', ...options } = {}) => {
    const generatedCss = await generatePrint(_config, key)
    const { css } = await buildCss(generatedCss, options)
    return css
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
