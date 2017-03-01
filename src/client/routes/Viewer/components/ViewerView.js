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
   // Return default viewable path: first 3d or 2d item
   //
   /////////////////////////////////////////////////////////
   getDefaultViewablePath (doc, roles = ['3d', '2d']) {

      var rootItem = doc.getRootItem()

      let roleArray = [...roles]

      let items = []

      roleArray.forEach((role) => {

        items = [ ...items,
          ...Autodesk.Viewing.Document.getSubItemsWithProperties(
            rootItem, { type: 'geometry', role }, true) ]
      })

      return items.length ? doc.getViewablePath(items[0]) : null
   }

   /////////////////////////////////////////////////////////
   // Component has been mounted so this div is now created
   // in the DOM and viewer can be instantiated
   //
   /////////////////////////////////////////////////////////
   async  componentDidMount () {

      try {

        let { id, urn, path } = this.props.location.query

        if (!this.props.appState.viewerEnv) {

          const env = id ? 'id'
            : urn ? 'AutodeskProduction'
            : path ? 'Local' : 'invalid'

          switch (env) {

            case 'id':

              // load by database id lookup
              // !NOT IMPLEMENTED HERE
              // could be something like:
              // const dbModel = getDBModelBy(id)
              // urn = dbModel.urn

              return

            case 'AutodeskProduction':

              await this.initialize({
                env: 'AutodeskProduction',
                useConsolidation: true
              })

              break

            case 'Local':

              await this.initialize({
                useConsolidation: true,
                env: 'Local'
              })

              break

            case 'invalid':
            default:

              const error =
                'Invalid query parameter: ' +
                'use id OR urn OR path in url'

              throw new Error(error)
              return
          }

          this.props.setViewerEnv(env)

          if (Autodesk.Viewing.setApiEndpoint) {

            //2.13
            Autodesk.Viewing.setApiEndpoint(
              window.location.origin + '/lmv-proxy')

          } else if(Autodesk.Viewing.setEndpointAndApi) {

            //2.14
            Autodesk.Viewing.setEndpointAndApi(
              window.location.origin + '/lmv-proxy',
              'modelDerivativeV2')
          }

          Autodesk.Viewing.Private.memoryOptimizedSvfLoading = true

          //Autodesk.Viewing.Private.logger.setLevel(0)
        }

        this.viewer = new Autodesk.Viewing.Private.GuiViewer3D(
          this.viewerContainer)

        this.viewer.start()

        if (!path) {

          const doc = await this.loadDocument(urn)
          path = this.getDefaultViewablePath(doc)
        }

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


