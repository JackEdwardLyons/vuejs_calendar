// Import Vue & Styles
import Vue from 'vue';
import './style.scss';
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
// Merge an object of events into the store state
let initialState = Object.assign( {}, store.state, { events } );
console.log( initialState );
// Begin with a mock data state
store.replaceState( initialState );

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store
});
