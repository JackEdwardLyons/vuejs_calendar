// Import Vuex
import Vue  from 'vue'; 
import Vuex from 'vuex';
Vue.use( Vuex );

// Vuex store
export default new Vuex.Store({
  state: {
    currentYear: 2017,
    currentMonth: 2
  },
  mutations: {
    setCurrentMonth( state, payload ) {
      state.currentMonth = payload;
    }
  }
});
  