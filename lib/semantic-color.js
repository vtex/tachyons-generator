module.exports = colors => {

  colorGenerator.backgroundColors = () => appendTransparentBackground(bg('bg', colors.background))
  colorGenerator.skinsPseudo = () => skinsPseudo(colors)
  colorGenerator.borderColors = () => appendTransparentBorder(border('b', colors.border))
  colorGenerator.variables = () => variables(colors)
  colorGenerator.skins = () => skins(colors)

  colorGenerator.colorMap = colors

  function colorGenerator () {}
  return colorGenerator
}

const addTransparent = (colors) =>
  Object.assign({}, colors, { transparent: 'transparent' })

const skins = colors => `
  ${text('c', colors.text)}
  ${text('c-on', colors.on)}
`

const skinsPseudo = (colors) => `
  ${hoverText('hover-c', colors['hover-text'])}
  ${hoverText('hover-c-on', colors['hover-on'])}
  ${visitedText('visited-c', colors['visited-text'])}
  ${hoverBg('hover-bg', colors['hover-background'])}
  ${hoverB('hover-b', colors['hover-border'])}
  ${activeText('active-c', colors['active-text'])}
  ${activeText('active-c-on', colors['active-on'])}
  ${activeBg('active-bg', colors['active-background'])}
  ${activeB('active-b', colors['active-border'])}
  .hover-bg-transparent:focus,
  .hover-bg-transparent:hover,
  .active-bg-transparent:active { background-color: transparent; }
  .hover-b--transparent:focus,
  .hover-b--transparent:hover,
  active-b--transparent:active { border-color: transparent; }
`

const colorToCss = fn => (prefix, obj) => Object.keys(obj).map(key => fn(prefix, key)).join('\n')

const appendTransparentBackground = (bgClasses) => `
  ${bgClasses}
  .bg-transparent { background-color: transparent; }
`

const text = colorToCss((prefix, key) => `.${prefix}-${key} { color: ${asVar(prefix, key)} }`)

const bg = colorToCss((prefix, key) => `.${prefix}-${key} { background-color: ${asVar(prefix, key)} }`)

const border = colorToCss((prefix, key) => `.${prefix}--${key} { border-color: ${asVar(prefix, key)} }`)

const hoverText = colorToCss((prefix, key) => ([
  `.${prefix}-${key}:focus, .${prefix}-${key}:hover { color: ${asVar(prefix, key)} }`,
]))

const hoverBg = colorToCss((prefix, key) => ([
  `.${prefix}-${key}:focus, .${prefix}-${key}:hover { background-color: ${asVar(prefix, key)} }`,
]))

const hoverB = colorToCss((prefix, key) => ([
  `.${prefix}--${key}:focus, .${prefix}--${key}:hover { border-color: ${asVar(prefix, key)} }`,
]))

const activeText = colorToCss((prefix, key) => ([
  `.${prefix}-${key}:active { color: ${asVar(prefix, key)} }`,
]))

const activeBg = colorToCss((prefix, key) => ([
  `.${prefix}-${key}:active { background-color: ${asVar(prefix, key)} }`,
]))

const activeB = colorToCss((prefix, key) => ([
  `.${prefix}--${key}:active { border-color: ${asVar(prefix, key)} }`,
]))

const visitedText = colorToCss((prefix, key) => ([
  `.${prefix}-${key}:visited { color: ${asVar(prefix, key)} }`,
]))

const appendTransparentBorder = (borderClasses) => `
  ${borderClasses}
  .b--transparent { border-color: transparent; }
`

const variables = colors => {
  const _variables = []
    .concat(`:root {`)
    .concat(addVariables('b', colors.border))
    .concat(addVariables('hover-b', colors['hover-border']))
    .concat(addVariables('active-b', colors['active-border']))
    .concat(addVariables('bg', colors.background))
    .concat(addVariables('hover-bg', colors['hover-background']))
    .concat(addVariables('active-bg', colors['active-background']))
    .concat(addVariables('c', colors.text))
    .concat(addVariables('hover-c', colors['hover-text']))
    .concat(addVariables('active-c', colors['active-text']))
    .concat(addVariables('visited-c', colors['visited-text']))
    .concat(addVariables('c-on', colors.on))
    .concat(addVariables('hover-c-on', colors['hover-on']))
    .concat(addVariables('active-c-on', colors['active-on']))
    .concat(`}`)

  return _variables.join('\n')
}

const addVariables = (prefix, colors) =>
  Object.keys(colors).reduce((acc, key) => (
    acc.concat(`  --${prefix}-${key}: ${colors[key]};`)
  ), [])

const asVar = (prefix, color) => `var(--${prefix}-${color})`

const listToMap = list => list.reduce((acc, obj) => Object.assign(acc, obj), {})
