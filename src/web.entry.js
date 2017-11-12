/* 
 * Client Side Web Entry ( this code runs in the browser )
 */
import './style.scss';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
// Return some mock data as part of the initial state
let events = window.__INITIAL_STATE__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
});

import VueCalendar from './entry';
// Because no 'el' was provided in the Vue instance
// You must use the $mount instance method here.
VueCalendar( events ).$mount( '#app' );
