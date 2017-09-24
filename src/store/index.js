// Import Vuex
import Vue  from 'vue'; 
import Vuex from 'vuex';
Vue.use( Vuex );

// Vuex store
export default new Vuex.Store({
  state: {
    currentYear: 2017,
    currentMonth: 2,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false
  },
  mutations: {
    setCurrentMonth( state, payload ) {
      state.currentMonth = payload;
    },
    setCurrentYear( state, payload ) {
      state.currentYear = payload;
    },
    eventFormPosition( state, payload ) {
      state.eventFormPosX = payload.X;
      state.eventFormPosY = payload.Y
    },
    eventFormActive( state, payload ) {
      state.eventFormActive = payload;
    }
  }
});
  