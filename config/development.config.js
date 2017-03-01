
/////////////////////////////////////////////////////////////////////
// DEVELOPMENT configuration
//
/////////////////////////////////////////////////////////////////////
const config = {

  client: {
    host: 'http://localhost',
    env: 'development',
    port: 3000
  },

  forge: {

    oauth: {
      clientSecret: process.env.FORGE_DEV_CLIENT_SECRET,
      clientId: process.env.FORGE_DEV_CLIENT_ID,
      scope: [
        'data:read',
        'data:create',
        'data:write',
        'bucket:read',
        'bucket:create'
      ]
    },

    viewer: {
      viewer3D: 'https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.js?v=v2.13',
      threeJS:  'https://developer.api.autodesk.com/viewingservice/v1/viewers/three.js?v=v2.13',
      style:    'https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css?v=v2.13'
    }
  }
}

module.exports = config


