const ExtensionId = 'Viewing.Extension.Demo'

export default class DemoExtension
  extends Autodesk.Viewing.Extension {

  constructor (viewer, options) {

    super()

    this.viewer = viewer
  }

  load () {

    this.viewer.setBackgroundColor(
      255, 226, 110,
      219, 219, 219)

    console.log (`${ExtensionId} loaded`)
  }


  unload () {

    console.log (`${ExtensionId} unloaded`)
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  ExtensionId, DemoExtension)

