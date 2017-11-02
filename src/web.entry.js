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
let events = [
  { description: 'Random event 1', date: moment('2017-02-06', 'YYYY-MM-DD') },
  { description: 'Random event 2', date: moment('2017-02-15', 'YYYY-MM-DD') },
  { description: 'Random event 3', date: moment('2017-03-14', 'YYYY-MM-DD') }
];
// Merge an object of events into the store state
let initialState = Object.assign( {}, store.state, { events } );
console.log( initialState );
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
