'use strict'

const { parse: mqifyParse } = require('mqify')
const stripComments = require('strip-css-comments')
const classPostfix = require('postcss-class-postfix')
const postcss = require('postcss')

const DEFAULT_CONFIG = require('./config')
const generateDocs = require('./docs')

const buildCss = require('./lib/build.js')
const generators = require('./lib/generators')
const generate = require('./lib/generate')
const generatePrint = require('./lib/generatePrint')
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

    const modules = await generate(_config, mediaQueries)

    const post = await assembleCss(modules, _config)

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

  generator.generateSeparateStylesheets = async (options) => {
    const modules = await generate(_config, mediaQueries, true)

    const keysToAddClasses = Object.keys(modules).filter(key => generators.hasOwnProperty(key))
    const parsedMediaQueries = mqifyParse(mediaQueries)
    const modulesWithTokens = await Promise.all(mediaQueries.map(mq => {
      const token = Object.keys(mq)[0]
      if (!token) {
        return null
      }
      const moduleWithToken = keysToAddClasses.reduce(
        (acc, curKey) => {
          acc[curKey] = postcss([classPostfix('-' + token)]).process(modules[curKey]).css
          return acc
        },
        {}
      )
      moduleWithToken.normalize = ''
      return { module: moduleWithToken, mq: parsedMediaQueries.find(mqP => mqP.key === token).mq }
    }))

    const allModules = [{ module: modules }, ...modulesWithTokens.filter(Boolean)]

    const allCss = await Promise.all(allModules.map(moduleObj => {
      const post = assembleCss(moduleObj.module, _config)
      return buildCss(post, options).then(({ css }) => {
        if (!moduleObj.mq) {
          return css
        }

        return `@media ${moduleObj.mq} {\n${stripComments(css).trim()}\n}`
      })
    }))
    return allCss
  }
  return generator
}
