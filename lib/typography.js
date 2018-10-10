const { step, mqSteps } = require('./docs-helper')

const docs = (typography, mqs) => `
/*

  TYPOGRAPHY
  http://tachyons.io/docs/typography/measure/

  Measures:
    measure = literal value ${typography.measure[0]}em (base line length)
    measure-narrow = literal value ${typography.measure[1]}em (narrow line length)
    measure-wide = literal value ${typography.measure[2]}em (wide line length)

  Media Query Extensions:
    ${mqSteps(mqs)}

*/`

const css = (typography, fullConfig) => `
.measure {
  max-width: ${typography.measure[0]}em;
}
.measure-wide {
  max-width: ${typography.measure[1]}em;
}
.measure-narrow {
  max-width: ${typography.measure[2]}em;
}
.small-caps { font-variant: small-caps; }
.indent {
  text-indent: 1em;
  margin-top: 0;
  margin-bottom: 0;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
${typographyStyles(typography, fullConfig)}
`;

const typographyStyles = (typography, fullConfig) => {
  if (!typography.styles) return ''

  const root = fullConfig.namespace ? '*, ' : 'body, '

  return Object.keys(typography.styles).reduce((acc, styleName) => {
    const properties = typography.styles[styleName]

    return `${acc}
${styleName === 'body' ? root : ''}.t-${styleName} {
  font-family: ${properties.fontFamily};
  font-weight: ${properties.fontWeight};
  font-size: ${properties.fontSize};
  text-transform: ${properties.textTransform};
  letter-spacing: ${properties.letterSpacing};
}
`
  }, '')
}

module.exports = {
  css,
  docs
}
