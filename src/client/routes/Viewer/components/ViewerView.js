import './ViewerView.scss'
import React from 'react'

class ViewerView extends React.Component {

   /////////////////////////////////////////////////////////
   //
   //
   /////////////////////////////////////////////////////////
   constructor () {

      super ()
   }

   /////////////////////////////////////////////////////////
   // Initialize viewer environment
   //
   /////////////////////////////////////////////////////////
   initialize (options) {

      return new Promise((resolve, reject) => {

        Autodesk.Viewing.Initializer (options, () => {

          resolve ()

        }, (error) => {

          reject (error)
        })
      })
   }

   /////////////////////////////////////////////////////////
   // Load a document from URN
   //
   /////////////////////////////////////////////////////////
   loadDocument (urn) {

      return new Promise((resolve, reject) => {

        const paramUrn = !urn.startsWith('urn:')
          ? 'urn:' + urn
          : urn

        Autodesk.Viewing.Document.load(paramUrn, (doc) => {

          resolve (doc)

        }, (error) => {

          reject (error)
        })
      })
   }

   /////////////////////////////////////////////////////////
   // Return viewable path: first 3d or 2d item by default
   //
   /////////////////////////////////////////////////////////
   getViewablePath (doc, pathIdx = 0, roles = ['3d', '2d']) {

      const rootItem = doc.getRootItem()

      const roleArray = [...roles]

      let items = []

      roleArray.forEach((role) => {

        items = [ ...items,
          ...Autodesk.Viewing.Document.getSubItemsWithProperties(
            rootItem, { type: 'geometry', role }, true) ]
      })

      if (!items.length || pathIdx > items.length) {

        return null
      }

      return doc.getViewablePath(items[pathIdx])
   }

   /////////////////////////////////////////////////////////
   // Component has been mounted so this div is now created
   // in the DOM and viewer can be instantiated
   //
   /////////////////////////////////////////////////////////
   async  componentDidMount () {

      try {

        let { id, urn, path, pathIdx } = this.props.location.query

        // check if env is initialized
        // initializer cannot be invoked more than once

        if (!this.props.appState.viewerEnv) {

          await this.initialize({
            env: 'AutodeskProduction',
            useConsolidation: true
          })

          this.props.setViewerEnv('AutodeskProduction')

          if (Autodesk.Viewing.setApiEndpoint) {

            //2.13
            Autodesk.Viewing.setApiEndpoint(
              window.location.origin + '/lmv-proxy')

          } else if(Autodesk.Viewing.setEndpointAndApi) {

            //2.14
            Autodesk.Viewing.setEndpointAndApi(
              window.location.origin + '/lmv-proxy',
              'modelDerivativeV2')

          } else {

            const error = 'Proxy API not found. ' +
              'Requires viewer version >= 2.13'

            throw new Error(error)
          }

          Autodesk.Viewing.Private.memoryOptimizedSvfLoading = true

          //Autodesk.Viewing.Private.logger.setLevel(0)
        }

        if (id) {

          // load by database id lookup
          // !NOT IMPLEMENTED HERE
          // could be something like:
          // const dbModel = getDBModelBy(id)
          // urn = dbModel.urn

        } else if (urn) {

          const doc = await this.loadDocument (urn)

          path = this.getViewablePath (doc, pathIdx || 0)

        } else if (!path) {

          const error = 'Invalid query parameter: ' +
            'use id OR urn OR path in url'

          throw new Error(error)
        }

        this.viewer =
          new Autodesk.Viewing.Private.GuiViewer3D(
            this.viewerContainer)

        this.viewer.start()

        this.viewer.loadModel(path)

      } catch (ex) {

        console.log('Viewer Initialization Error: ')
        console.log(ex)
      }
   }

   /////////////////////////////////////////////////////////
   // Component will unmount so we can destroy
   // the viewer to avoid memory leaks
   //
   /////////////////////////////////////////////////////////
   componentWillUnmount () {

      if (this.viewer) {

        if(this.viewer.impl.selector) {

          this.viewer.tearDown()
          this.viewer.finish()
          this.viewer = null
        }
      }
   }

   /////////////////////////////////////////////////////////
   //
   //
   /////////////////////////////////////////////////////////
   render () {

      return (
        <div className="viewer-view">
          <div className="viewer" ref={
            (div) => this.viewerContainer = div
          }>
          </div>
        </div>
      )
   }
}

export default ViewerView


