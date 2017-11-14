require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript');

app.use('/public', express.static(path.join(__dirname, 'public')));
/* Populate the Vuex store with mock events */
let events = [
  { description: 'Random event 1', date: moment('2017-02-06', 'YYYY-MM-DD') },
  { description: 'Random event 2', date: moment('2017-02-15', 'YYYY-MM-DD') },
  { description: 'Random event 3', date: moment('2017-03-14', 'YYYY-MM-DD') }
];

// Create reference to Server Side Renderer variable
let renderer;

// index.html
app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  let contentMarker = '<!-- APP -->';

  if ( renderer ) {
    renderer.renderToString({}, function(err, html) {
      if ( err ) {
        console.log(err);
      } else {
        // The mock data now begins on the server.
        res.send(template.replace(contentMarker, `<script>var __INITIAL_STATE__ = ${ serialize(events) }</script>\n${ html }`));
      }
    });
  } else {
    res.send( '<p>Awaiting compilation... </p>')
  }
});

app.use( require( 'body-parser' ).json() );
app.post( '/add_event', ( req, res ) => { 
  events.push( req.body );
  res.send( events );
})


const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  // Create a Server Side Bundle
  require( './webpack-server-compiler' ).init( function( bundle ) {
    // Pass in the Bundle and take the Vue Instance to output the correct 
    // Server Rendered version of the app.
    // NPM: https://www.npmjs.com/package/vue-server-renderer
    // Guide: https://ssr.vuejs.org/en/
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
  })
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
