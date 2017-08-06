var path = require('path')
var fs = require('fs')

if (process.env.NODE_ENV !== 'development') {

  const dist = path.resolve(__dirname, '../dist')

  fs.stat(dist, (err, stats) => {
    if (err) {
      console.log('dist/ directory not found, starting compiler ...')
      require('../webpack')
    }
  })

  require('./server')

} else {

  require('babel-core/register')({
    plugins: ['transform-decorators-legacy'],
    presets: ['es2015-node5', 'stage-0']
  })

  require('../src/server')
}


