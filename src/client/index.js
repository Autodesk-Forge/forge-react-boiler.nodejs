import AppContainer from './containers/AppContainer'
import createStore from './store/createStore'
import ReactDOM from 'react-dom'
import 'font-awesome-webpack'
import config from 'c0nfig'
import 'bootstrap-webpack'
import React from 'react'

//Services
import ServiceManager from 'SvcManager'
import StorageSvc from 'StorageSvc'
import SocketSvc from 'SocketSvc'
import EventSvc from 'EventSvc'
import ForgeSvc from 'ForgeSvc'

// ========================================================
// Services Initialization
// ========================================================

const storageSvc = new StorageSvc({
  storageKey: 'Autodesk.Forge.Storage'
})

const socketSvc = new SocketSvc({
  host: config.client.host,
  port: config.client.port
})

socketSvc.connect().then((socket) => {

  console.log('client socket connected')

}, (error) => {

  console.log('error connecting client socket ...')
  console.log(error)
})

const eventSvc = new EventSvc()

const forgeSvc = new ForgeSvc({
  apiUrl: '/api/forge'
})

// ========================================================
// Services Registration
// ========================================================
ServiceManager.registerService(storageSvc)
ServiceManager.registerService(socketSvc)
ServiceManager.registerService(eventSvc)
ServiceManager.registerService(forgeSvc)

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__

const store = createStore(initialState)


// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {

  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// ========================================================
// This code is excluded from production bundle
// ========================================================
if (config.env === 'development') {

  if (window.devToolsExtension) {

    window.devToolsExtension.open()
  }

  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
