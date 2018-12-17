# @vtex/tachyons-generator

Generate a custom VTEX Tachyons build with a json configuration.

Originally forked from [tachyons-generator](https://github.com/tachyons-css/generator).

## Installation

```bash
npm i -S @vtex/tachyons-generator
```

## Usage
This will generate an index.html file with the generated style guide as well as a static css file.

```javascript
const fs = require('fs')

const tachyonsGenerator = require('@vtex/tachyons-generator')
const config = require('./config.json')

const generate = async () => {
  const tachy = tachyonsGenerator(config)

  // Minify CSS
  const out1 = await tachy.generate({ minify: true })
  fs.writeFileSync('tachyons.min.css', out1)

  // Generate a CSS only with semantic colors variables
  const out2 = await tachy.variables()
  fs.writeFileSync('tachyons-colors-vars.css', out2)

  // Keep colors as CSS variables
  const out3 = await tachy.generate({ compileVars: false })
  fs.writeFileSync('tachyons-with-vars.css', out3)

  // Generate docs website
  const docs = await tachy.docs()
  fs.writeFileSync('index.html', docs)
}

generate()
```

#### Example config

Check [config.js](/config.js)

#### Optional configurations

#### `namespace`

You can pass a `namespace` property to namespace the CSS generated (including the normalize module).

Example:

```json
 "namespace": "my-namespace",
```

Will generate the following CSS:

```css
.my-namespace .bg-black { background-color: #000; }
```

## License

MIT
