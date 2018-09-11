
[![OAuth2](https://img.shields.io/badge/OAuth2-v1-green.svg)](http://developer.autodesk.com/)
[![Data-Management](https://img.shields.io/badge/Data%20Management-v2-green.svg)](http://developer.autodesk.com/)
[![Model-Derivative](https://img.shields.io/badge/Model%20Derivative-v2-green.svg)](http://developer.autodesk.com/)
[![Viewer](https://img.shields.io/badge/Viewer-v2.17-green.svg)](http://developer.autodesk.com/)

# About Forge React Boiler

A boilerplate project to quickly get started using [Autodesk Forge Platform](https://forge.autodesk.com/)
Web Services in a modern React + Node.js Web Application.
The base project is initially derived from the [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit).

### Thumbnail
![thumbnail](/thumbnail.png)

 * Main components of the Frontend:

  [React](https://facebook.github.io/react/) + [Redux](https://github.com/reactjs/redux)

 * On the Backend:

  [Node.js](https://nodejs.org) + [Express](http://expressjs.com)

 * Build System:

  [NPM](https://www.npmjs.com/) scripts + [Webpack 2](https://webpack.js.org) + [Babel](https://babeljs.io)

## React Support

React >= 0.13.x

## Browser Support

Forge React Boiler is responsive, mobile friendly and has been tested on the following browsers:

  * Chrome
  * Firefox
  * Safari
  * Opera
  * Edge


## Running the sample

Configuration is controlled by **NODE_ENV**
[environment variable](https://www.google.com/webhp?q=set+environment+variable&gws_rd=cr&ei=tum2WMaSF4SdsgHruLrIDg),
make sure to set it properly to **development** or **production**,
based on the configuration type you want to run.


In **development**, the client is dynamically built by the
[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware), so just run:


 * `npm install`    *(downloads project dependencies locally)*

 * `set NODE_ENV=development`

 * `set HOT_RELOADING=true`

 * `npm start`      *(builds client on the fly and runs server)*

 * open [http://localhost:3000](http://localhost:3000) in your favorite browser




In **production**, the client requires a build step, so run:

 * `npm install` *(not required if you already run at previous step)*

 * `set NODE_ENV=production`

 * `npm run build-server` *(builds server in /bin/server)*

 * `npm run build-prod` *(builds client in /dist)*

 * `npm start` *(runs server)*

 * open [http://localhost:3000](http://localhost:3000) in your favorite browser


## Loading custom models in the Forge Viewer

The project contains a default model located in **/resources/models/seat** that can be loaded with no further
setup and will also work offline.

If you want to load a model from **Autodesk Cloud**, you first need to generate a viewable **URN** as documented in the
[Prepare a File for the Viewer](https://developer.autodesk.com/en/docs/model-derivative/v2/tutorials/prepare-file-for-viewer/) tutorial.

Using the same Forge ClientId & ClientSecret used to upload the model,
populate environment variables used by the config files (in **/config**):

  * development:

    `FORGE_DEV_CLIENT_ID`

    `FORGE_DEV_CLIENT_SECRET`

  * production:

    `FORGE_CLIENT_ID`

    `FORGE_CLIENT_SECRET`


Restart the server, you can then directly load your model by specifying design **URN** as query parameter in the url of the viewer page:

[http://localhost:3000/viewer?urn=YOUR_URN_HERE](http://localhost:3000/viewer?urn=YOUR_DESIGN_URN_HERE)


## Deploy to Heroku

Use your **Forge ClientId & ClientSecret** obtained while
[Creating a new Forge App](https://developer.autodesk.com/myapps/create)

And Press Deploy button below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Wait for a while once the Heroku App has been deployed as the client needs to be built **after the first run**

## More about Autodesk Forge Platform and Web Applications of the future?

Check it out at [developer.autodesk.com](https://developer.autodesk.com).

Look at our [Quickstarts Guide](https://developer.autodesk.com/en/docs/quickstarts/v1/overview/)
to find the Forge SDK's for the programming language of your choice.

## About the Author

[https://twitter.com/F3lipek](https://twitter.com/F3lipek)

## Web Applications using Forge React Boiler

 * [Autodesk Forge RCDB](https://forge-rcdb.autodesk.io)

 ![forge-rcdb](https://github.com/Autodesk-Forge/forge-rcdb.nodejs/blob/master/resources/img/forge-rcdb.jpg)

(Feel free to add your own by submitting a pull request...)
