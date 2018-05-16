const config = requrie('./config')

const postcssConfig = {
  plugins: {
    'postcss-cssnext': {}
  }
}

if (config.pxto === 'vw') {
  Object.assign(postcssConfig.plugins, {
    'postcss-aspect-ratio-mini': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore-px'],
      minPixelValue: 1,
      mediaQuery: false
    },
    'postcss-viewport-units': {}
  })
} else {
  Object.assign(postcssConfig.plugins, {
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 4,
      propList: ['*'],
      minPixelValue: 2
    }
  })
}

module.exports = postcssConfig;
