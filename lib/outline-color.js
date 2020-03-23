module.exports = {
  css: color => {
    if (color == null) return ''

    return `* { outline-color: ${color} }`
  },
  docs: () => '',
}
