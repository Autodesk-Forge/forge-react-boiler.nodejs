// async support
import 'babel-polyfill'

//Server stuff
import cookieParser from 'cookie-parser'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import debug from 'debug'
import util from 'util'
import path from 'path'

//Endpoints
import DerivativesAPI from './api/endpoints/derivatives'
import LMVProxy from './api/endpoints/lmv-proxy'
import SocketAPI from './api/endpoints/socket'
import ForgeAPI from './api/endpoints/forge'
import OssAPI from './api/endpoints/oss'

//Services
import DerivativesSvc from './api/services/DerivativesSvc'
import ServiceManager from './api/services/SvcManager'
import SocketSvc from './api/services/SocketSvc'
import ForgeSvc from './api/services/ForgeSvc'
import OssSvc from './api/services/OssSvc'

//Config (NODE_ENV dependant)
import config from'c0nfig'

/////////////////////////////////////////////////////////////////////
// App initialization
//
/////////////////////////////////////////////////////////////////////
const app = express()

app.use('/resources', express.static(__dirname + '/../../resources'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('trust proxy', 1)
app.use(cookieParser())
app.use(helmet())

/////////////////////////////////////////////////////////////////////
// API Routes setup - Disabled except socket by default
//
/////////////////////////////////////////////////////////////////////
//app.use('/api/derivatives', DerivativesAPI())
app.use('/api/socket', SocketAPI())
//app.use('/api/forge', ForgeAPI())
//app.use('/api/oss', OssAPI())

/////////////////////////////////////////////////////////////////////
// Viewer GET Proxy
//
/////////////////////////////////////////////////////////////////////
app.get('/lmv-proxy/*', LMVProxy.get)

/////////////////////////////////////////////////////////////////////
// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware
//
/////////////////////////////////////////////////////////////////////
app.use(require('connect-history-api-fallback')())

/////////////////////////////////////////////////////////////////////
// Static routes
//
/////////////////////////////////////////////////////////////////////
if (process.env.NODE_ENV === 'development') {

  // dynamically require webpack dependencies
  // to them in devDependencies (package.json)
  const webpackConfig = require('../../webpack/development.webpack.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpack = require('webpack')

  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: webpackConfig.stats,
    progress: true,
    hot: true
  }))

  app.use(webpackHotMiddleware(compiler))

} else {

  // compression middleware compresses your server responses
  // which makes them smaller (applies also to assets).
  // You can read more about that technique and other good
  // practices on official Express.js docs http://mxs.is/googmy
  app.use(compression())

  app.use(express.static(path.resolve(process.cwd(), './dist')))
}

app.get('*', express.static(path.resolve(process.cwd(), './dist')))

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
function runServer(app) {

  try {

    process.on('exit', () => {

    })

    process.on('uncaughtException', (err) => {

      console.log('uncaughtException')
      console.log(err)
      console.error(err.stack)
    })

    process.on('unhandledRejection', (reason, p) => {

      console.log('Unhandled Rejection at: Promise ', p,
        ' reason: ', reason)
    })

    var derivativesSvc = new DerivativesSvc()

    var forgeSvc = new ForgeSvc(config.forge)

    var ossSvc = new OssSvc()

    ServiceManager.registerService(derivativesSvc)
    ServiceManager.registerService(forgeSvc)
    ServiceManager.registerService(ossSvc)

    var server = app.listen(
      process.env.PORT || config.server_port || 3000, () => {

        var socketSvc = new SocketSvc({
          session,
          server
        })

        ServiceManager.registerService(socketSvc)

        console.log('Server listening on: ')
        console.log(server.address())
        console.log('ENV: ' + process.env.NODE_ENV)
      })

  } catch (ex) {

    console.log('Failed to run server... ')
    console.log(ex)
  }
}

/////////////////////////////////////////////////////////////////////
//
//
/////////////////////////////////////////////////////////////////////
runServer(app)

