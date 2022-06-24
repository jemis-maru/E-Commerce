
module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  devServer: {
    // proxy: 'https://209c-2402-3a80-87b-b31f-79bd-b9c2-267-13e7.ngrok.io',
    // disableHostCheck: true
  },
  transpileDependencies: [
    'quasar'
  ]
}