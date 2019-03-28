const semanticColors = require('./semantic-color')

module.exports = (config) => {
  return semanticColors(config.semanticColors).variables()
}
