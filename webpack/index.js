const webpackCompiler = require('./webpack-compiler')

const build = () => {

  const env = process.env.NODE_ENV

  console.log('Starting compiler NODE_ENV=' + env)

  const webpackConfig = require(`./${env}.webpack.config`)

  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(() => {

      console.log('Compilation completed successfully.')

    }).catch((err) => {

      console.log('Compiler encountered an error.', err)
      process.exit(1)
    })
}

build()
