const { step, mqSteps } = require('./docs-helper')

const docs = (sizes, mqs) => `
/*
  SIZES

  Base:
    h = height
    min-h = min-height

  Modifiers
    ${sizes.map(size =>
      `-${size.name} = ${size.value}rem`
    ).join('\n    ')}

  Media Query Extensions:
    ${mqSteps(mqs)}
*/`

const css = sizes =>
  sizes.map(size => [
      `.h-${size.name} { height: ${size.value}rem; box-sizing: border-box; }`,
      `.min-h-${size.name} { min-height: ${size.value}rem; box-sizing: border-box; }`,
    ].join('\n'))
  .join('\n')

module.exports = {
  css,
  docs
}
