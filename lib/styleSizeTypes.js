const { parse: mqifyParse } = require('mqify')
const classPostfix = require('postcss-class-postfix')
const postcss = require('postcss')

const stylesheetTypeToToken = {
  notsmall: ['ns', 'm'],
  small: ['s'],
  large: ['l'],
  xlarge: ['xl']
}

module.exports = (stylesheetType, originalModules, mediaQueries) => {
  const tokenArray = stylesheetTypeToToken[stylesheetType]

  if (!tokenArray) {
    return {}
  }
  const token = tokenArray[0]

  const mediaQuery = mediaQueries.find(mq => {
    const sizeToken = Object.keys(mq)[0]
    return token === sizeToken
  })

  if (!mediaQuery) {
    return {}
  }

  const mediaQueryString = mqifyParse([mediaQuery])[0].mq

  const keys = Object.keys(originalModules)
  const modulesWithTokens = tokenArray.map(token => {
    const moduleWithToken = keys.reduce(
      (acc, curKey) => {
        acc[curKey] = postcss([classPostfix('-' + token)]).process(originalModules[curKey]).css
        return acc
      },
      {}
    )
    moduleWithToken.normalize = ''
    return moduleWithToken
  })
  return { mediaQueryString, modulesWithTokens }
}