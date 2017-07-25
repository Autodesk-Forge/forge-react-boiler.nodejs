import Viewer from 'Viewer'
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
   // viewer div and component created
   //
   /////////////////////////////////////////////////////////
   async onViewerCreated (viewer) {

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

          Autodesk.Viewing.setEndpointAndApi(
            window.location.origin + '/lmv-proxy-2legged',
            'modelDerivativeV2')

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

        viewer.start()

        viewer.loadModel(path)

      } catch (ex) {

        console.log('Viewer Initialization Error: ')
        console.log(ex)
      }
   }

   /////////////////////////////////////////////////////////
   //
   //
   /////////////////////////////////////////////////////////
   render () {

      return (
        <div className="viewer-view">
          <Viewer onViewerCreated={(viewer => {
              this.onViewerCreated(viewer)
            })}
          />
        </div>
      )
   }
}

export default ViewerView


