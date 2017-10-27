// Import Vuex
import Vue  from 'vue'; 
import Vuex from 'vuex';
Vue.use( Vuex );

// import Moment for time management
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

// Vuex store
export default new Vuex.Store({
  state: {
    currentYear: 2017,
    currentMonth: 2,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    events: [],
    // You can only set a date once you have entered the eventForm
    // Thus, when you click on a day, the eventForm will open
    // and the date will be set accordingly.
    eventFormDate: moment()
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
    },
    addEvent( state, payload ) {
      state.events.push( payload );
    },
    eventFormDate( state, payload ) {
      state.eventFormDate = payload;
    }
  },
  actions: {
    addEvent( context, payload ) {
      console.log( context ); // access to mutations and the state
      let obj = {
        description: payload,
        date: context.state.eventFormDate
      }
      context.commit( 'addEvent', obj );
      Axios.post( '/add_event', obj );
    }
  }
});
  