// Import Vue & Styles
import Vue from 'vue';
import './style.scss';

// Import Vuex Store
import store from './store';

// import Moment for time management
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
// Create an instance of moment on the Vue prototype
// so all components can access the moment library.
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment; }});

import App from './components/App.vue';

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
