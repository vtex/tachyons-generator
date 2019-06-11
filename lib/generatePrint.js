const kebab = require('kebab-case')
const classPostfix = require('postcss-class-postfix')
const postcss = require('postcss')

const generators = require('./generators')

const RELEVANT_PRINT_GENERATORS = [
  'spacing',
  'clears',
  'display',
  'flexbox',
  'floats',
  'fontStyle',
  'letterSpacing',
  'lineHeight',
  'maxWidths',
  'textDecoration',
  'textAlign',
  'textTransform',
  'typeScale',
  'typography',
  'fontWeight',
  'visibility',
  'whiteSpace',
  'widths',
  // add the @page specific generator
  'page'
]

const requirePartial = name => {
  const kebabed = kebab(name)
  return require(`../partials/_${kebabed}.css`)
}

module.exports = async (config, key) => {
  const css = RELEVANT_PRINT_GENERATORS.map(name => {
    if (name in generators) {
      return generators[name].css(config[name], config)
    }
    return requirePartial(name)
  }).join('\n')

  return postcss([classPostfix(`-${key}`)])
    .process(css, { from: undefined })
    .then(({ css }) => css.trim())
}
