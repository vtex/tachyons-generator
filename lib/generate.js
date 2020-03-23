const camel = require('camelcase')
const kebab = require('kebab-case')
const isBlank = require('is-blank')
const mqify = require('mqify')

const manifest = require('./manifest')
const color = require('./color')
const semanticColor = require('./semantic-color')
const generators = require('./generators')

const cssWithDocs = (generator, config, mqs, fullConfig) => `${generator.docs(config, mqs)}
${generator.css(config, fullConfig)}`

module.exports = (config, mediaQueries, skipMqify = false) => {
  const colors = color(config.palette || config.colors)

  const skipModules = (config.skipModules || []).map(n => camel(n))
  const semanticColors = semanticColor(config.semanticColors)

  const px = Object.keys(manifest)
    .filter(filterSkipped.bind(null, skipModules))
    .map(name => {
      const module = manifest[name]

      let raw = null

      if (module.colors) {
        raw = colors[name]()
        raw = raw + '\n' + semanticColors[name]()
      } else if (generators.hasOwnProperty(name)) {
        const generator = generators[name]
        raw = cssWithDocs(generator, config[name], config.customMedia, config)
      } else {
        raw = requireify(name)
      }

      if (!module.mq || skipMqify) {
        return { name, css: raw }
      }

      return mqify(raw, mediaQueries).then(css => ({ name, css }))
    })

  return Promise.all(px).then(reduceModules)
}

const reduceModules = modules => {
  return modules.reduce((prev, curr) => {
    prev[camel(curr.name)] = curr.css
    return prev
  }, {})
}

const filterSkipped = (skipModules, name) => {
  if (isBlank(skipModules)) {
    return true
  } else {
    return !skipModules.includes(camel(name))
  }
}

const requireify = name => {
  const kebabed = kebab(name)
  return require(`../partials/_${kebabed}.css`)
}
