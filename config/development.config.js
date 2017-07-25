
/////////////////////////////////////////////////////////////////////
// DEVELOPMENT configuration
//
/////////////////////////////////////////////////////////////////////
const HOST_URL = 'http://localhost'
const PORT= 3000

const config = {

  env: 'development',

  client: {
    host: `${HOST_URL}`,
    env: 'development',
    port: PORT
  },

  forge: {

    oauth: {

      redirectUri: `${HOST_URL}:${PORT}/api/forge/callback/oauth`,
      authenticationUri: '/authentication/v1/authenticate',
      refreshTokenUri: '/authentication/v1/refreshtoken',
      authorizationUri: '/authentication/v1/authorize',
      accessTokenUri: '/authentication/v1/gettoken',

      baseUri: 'https://developer.api.autodesk.com',
      clientSecret: process.env.FORGE_DEV_CLIENT_SECRET,
      clientId: process.env.FORGE_DEV_CLIENT_ID,

      scope: [
        'data:read',
        'data:write',
        'data:create',
        'bucket:read',
        'bucket:create'
      ]
    },

    viewer: {
      viewer3D: 'https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.js?v=v2.15',
      threeJS:  'https://developer.api.autodesk.com/viewingservice/v1/viewers/three.js?v=v2.15',
      style:    'https://developer.api.autodesk.com/viewingservice/v1/viewers/style.css?v=v2.15'
    }
  }
}

module.exports = config


