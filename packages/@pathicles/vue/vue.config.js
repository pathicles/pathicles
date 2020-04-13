module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    inline: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack: config => {
    // GraphQL Loader
    // config.module
    //   .rule('binary')
    //   .test(/\.dat$/)
    //   .use('binary-loader')
    //   .loader('binary-loader')
    //   .end()

    // config.module
    //   .rule('binary2')
    //   .test(/\.blob$/)
    //   .use('binary-loader')
    //   .loader('binary-loader')
    //   .end()
    // Add another loader
    // .use('other-loader')
    // .loader('other-loader')
    // .end()
  }
}
