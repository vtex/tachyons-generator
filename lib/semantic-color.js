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
  ${hover('hover-c', colors['hover-text'])}
  ${hover('hover-c-on', colors['hover-on'])}
  ${hoverBg('hover-bg', colors['hover-background'])}
  ${hoverB('hover-b', colors['hover-background'])}
  .hover-bg-transparent:focus, .hover-bg-transparent:hover { background-color: transparent; }
  .hover-b--transparent:focus, .hover-b--transparent:hover { border-color: transparent; }
`

const colorToCss = fn => (prefix, obj) => Object.keys(obj).map(key => fn(prefix, key)).join('\n')

const bg = colorToCss((prefix, key) => `.bg-${key} { background-color: ${asVar(prefix, key)} }`)

const appendTransparentBackground = (bgClasses) => `
  ${bgClasses}
  .bg-transparent { background-color: transparent; }
`

const text = colorToCss((prefix, key) => `.${prefix}-${key} { color: ${asVar(prefix, key)} }`)

const hover = colorToCss((prefix, key) => ([
  `.${prefix}-${key}:focus, .${prefix}-${key}:hover { color: ${asVar(prefix, key)} }`,
]))

const hoverBg = colorToCss((prefix, key) => ([
  `.hover-bg-${key}:focus, .hover-bg-${key}:hover { background-color: ${asVar(prefix, key)} }`,
]))

const hoverB = colorToCss((prefix, key) => ([
  `.hover-b--${key}:focus, .hover-b--${key}:hover { border-color: ${asVar(prefix, key)} }`,
]))

const border = colorToCss((prefix, key) => `.b--${key} { border-color: ${asVar(prefix, key)} }`)

const appendTransparentBorder = (borderClasses) => `
  ${borderClasses}
  .b--transparent { border-color: transparent; }
`

const variables = colors => {
  const _variables = []
    .concat(`:root {`)
    .concat(addVariables('b', colors.border))
    .concat(addVariables('hover-b', colors['hover-border']))
    .concat(addVariables('bg', colors.background))
    .concat(addVariables('hover-bg', colors['hover-background']))
    .concat(addVariables('c', colors.text))
    .concat(addVariables('hover-c', colors['hover-text']))
    .concat(addVariables('c-on', colors.on))
    .concat(addVariables('hover-c-on', colors['hover-on']))
    .concat(`}`)

  return _variables.join('\n')
}

const addVariables = (prefix, colors) =>
  Object.keys(colors).reduce((acc, key) => (
    acc.concat(`  --${prefix}-${key}: ${colors[key]};`)
  ), [])

const asVar = (prefix, color) => `var(--${prefix}-${color})`

const listToMap = list => list.reduce((acc, obj) => Object.assign(acc, obj), {})
