/* 
 * Shared file between web-entry.js & node-entry.js
 * This file contains all the 'common logic'
 * There are now two Webpack bundles being run:
 * - node.bundle.js & web.bundle.js
 */

// Import Vue
import Vue from 'vue';
// Import Vuex Store
import store from './store';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
// Create an instance of moment on the Vue prototype
// so all components can access the moment library.
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment; }});


import App from './components/App.vue';
// Return some mock data as part of the initial state
let events = window.__INITIAL_STATE__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
});


// Export Vue instance to run on client side.
export default function( events ) {

  // Merge an object of events into the store state
  let initialState = Object.assign( {}, store.state, { events } );
  console.log( initialState );
  // Begin with a mock data state
  store.replaceState( initialState );

  return new Vue({
    // The server renders the 'el: #app'
    data: {
      moment
    },
    components: {
      App
    },
    store,
    // Render function to create elements and meta data
    // This means you can effectively skip the process of
    // creating an HTML element in the index.html file.
    render( createElement ) {
      let vnode = createElement(
        // 1st argument is the element
        'div',
        // 2nd argument are the attributes & meta
        { attrs: { id: 'app' } },
        // 3drd argument are the child nodes
        [
          createElement( 'app' )
        ]
      )
      // We cannot remove the 'el: #app' from above
      // as Vue needs to mount somewhere on the DOM
      // that isn't the BODY tag. This render function
      // just replaces the element on load.
      return vnode;
    }
  });

}