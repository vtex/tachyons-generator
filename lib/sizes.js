const { step, mqSteps } = require('./docs-helper')

const docs = (sizes, mqs) => `
/*
  SIZES

  Base:
    h = height
    min-h = min-height

  Modifiers
    ${Object.keys(sizes).map(size =>
      `-${size} = ${sizes[size]}rem`
    ).join('\n    ')}

  Media Query Extensions:
    ${mqSteps(mqs)}
*/`

const css = sizes =>
  Object.keys(sizes)
    .map(size => [
      `.h-${size} { height: ${sizes[size]}rem; box-sizing: border-box}`,
      `.min-h-${size} { min-height: ${sizes[size]}rem; box-sizing: border-box}`,
      ].join('\n'))
    .join('\n')

module.exports = {
  css,
  docs
}
