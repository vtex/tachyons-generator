const pageBreaks = Object.entries({
  after: ['auto', 'avoid', 'always', 'all', 'page', 'left', 'right'],
  before: ['auto', 'avoid', 'always', 'all', 'page', 'left', 'right'],
  inside: ['auto', 'avoid'],
})
  .map(([name, values]) =>
    values
      .map(value => {
        return `.break-${name}-${value} { break-${name}: ${value}; }`
      })
      .join('\n'),
  )
  .join('\n')

const orphans = Array.from({ length: 5 })
  .map((n, i) => `.orphans-${i + 1} { orphans: ${i + 1}; }`)
  .join('\n')

const widows = Array.from({ length: 5 })
  .map((n, i) => `.widows-${i + 1} { widows: ${i + 1};}`)
  .join('\n')

const decorationBreaks = ['slice', 'clone'].map(
  type => `.decoration-break-${type}: { box-decoration-break: ${type}; }`,
)

module.exports = [pageBreaks,orphans,widows,decorationBreaks].join('\n\n')
