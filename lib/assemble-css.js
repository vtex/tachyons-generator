module.exports = (cssObj, config) => `
/* TACHYONS v${config.version || '0.0.1'} | https://github.com/tachyons-css/tachyons */

/*
 *
 *      ________            ______
 *      ___  __/_____ _________  /______  ______________________
 *      __  /  _  __  /  ___/_  __ \_  / / /  __ \_  __ \_  ___/
 *      _  /   / /_/ // /__ _  / / /  /_/ // /_/ /  / / /(__  )
 *      /_/    \__,_/ \___/ /_/ /_/_\__, / \____//_/ /_//____/
 *                                 /____/
 *
 *    TABLE OF CONTENTS
 *
 *    1. External Library Includes
 *       - Normalize.css | http://normalize.css.github.io
 *    2. Tachyons Modules
 *    3. Variables
 *       - Media Queries
 *       - Colors
 *    4. Debugging
 *       - Debug all
 *       - Debug children
 *
 */

/* External Library Includes */
${Array.isArray(cssObj) ? cssObj.map(css => namespace(css, config)).join('\n') : namespace(cssObj, config)}
`

const namespace = (cssObj, config) => {
  const content = `
${cssObj.normalize}
${importModules(cssObj)}
`

  if (config.namespace) {
    return (
      `.${config.namespace} {
        ${content}
      }`
    )
  }

  return content
}

const importModules = cssObj => {
  const SKIP = [
    'normalize',
    'debugChildren',
    'debugGrid'
  ]

  return Object
    .keys(cssObj)
    .filter(key => !SKIP.includes(key))
    .map(key => cssObj[key])
    .join('\n')
}
