const webpack = require('webpack')

function webpackCompiler (webpackConfig, statsFormat) {

  return new Promise((resolve, reject) => {

    const compiler = webpack (webpackConfig)

    compiler.run((err, stats) => {

      if (err) {

        console.log('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()

      console.log(stats.toString(statsFormat))

      //if (jsonStats.errors.length > 0) {
      //
      //  console.log('Webpack compiler encountered errors.')
      //  console.log(jsonStats.errors.join('\n'))
      //
      //  return reject(new Error('Webpack compiler encountered errors'))
      //
      //} else if (jsonStats.warnings.length > 0) {
      //
      //  console.log('Webpack compiler encountered warnings.')
      //  console.log(jsonStats.warnings.join('\n'))
      //
      //} else {
      //
      //  console.log('No errors or warnings encountered.')
      //}

      resolve(jsonStats)
    })
  })
}

module.exports = webpackCompiler
