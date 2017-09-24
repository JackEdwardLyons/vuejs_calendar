<template>

  <div>

    <header id="header">

      <div>
        <h1>Vue.js Calendar</h1>
      </div>

      <div>

        <current-month></current-month>

      </div>

    </header><!-- end #header -->

    <div id="day-bar">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </div>

    <div id="calendar">

      <div v-for="( week, i ) in weeks" class="calendar-week">
        
        <CalendarDay v-for="day in week" :day="day"></CalendarDay>

      </div><!-- end .calendar-week -->

    </div><!-- end #calendar -->

    <event-form></event-form>  

  </div><!-- end main wrapper -->

</template>

<script>
import CalendarDay  from './CalendarDay.vue';
import CurrentMonth from './CurrentMonth.vue';
import EventForm    from './EventForm.vue';

export default {
  components: {
    CalendarDay, 
    CurrentMonth,
    EventForm
  },
  computed: {
    // We can obtain the currentYeary and currentMonth 
    // from the Vuex store ( in web.entry.js ).
    month() {
      return this.$store.state.currentMonth;
    },
    year() {
      return this.$store.state.currentYear;
    },
    days() {
      // The aim here is to create a Calendar Grid of 7 x 5.
      let days = [];
      let currentDay = this.$moment( `${this.year}-${this.month}-1`, 'YYYY-M-D' );
      
      // The grid runs across 7 days from SUDNAY to MONDAY.
      // It runs 5 weeks down to reach a total of 35 squares.

      do {
        // keep adding days in the month until...
        days.push( currentDay );
        // create a fresh instance of moment for the next day...
        currentDay = this.$moment( currentDay ).add(1, 'days');
        // months are zero-indexed, hence why we + 1
      } while( ( currentDay.month() + 1 ) === this.month );

      // Reset currentDay to beginning of array.
      currentDay = this.$moment( days[0] );

      const SUDNAY = 0;
      const MONDAY = 1;

      if ( currentDay.day() !== MONDAY ) {
        // To get a complete calendar grid of 7 across, we may have to add
        // in days from the previous month. This is done by resetting the
        // currentDay variable to the first item in the array and subtracting 
        // a day, which brings us to the end of the previous month. We then add
        // that day to the front of the days array. When the currentDay is MONDAY
        // we stop subtracting because that marks the beginning of the calendar.
        do {
          currentDay = this.$moment( currentDay ).subtract(1, 'days');
          days.unshift( currentDay );
        } while( currentDay.day() !== MONDAY );

      } // endif; 

      // Add next month's days to calendar by 
      // setting currentDay to the end of the array.
      currentDay = this.$moment( days[days.length - 1] );

      if ( currentDay.day() !== SUDNAY ) {
        
        // keep adding until the end of calendar reaches SUDNAY.
        do {
          currentDay = this.$moment( currentDay ).add( 1, 'days' );
          days.push( currentDay );
        } while( currentDay.day() !== SUDNAY );

      } // endif;

      // return an array of all the current days of the month.
      // There should be 35 items in the array.
      // console.log( days.length );
      return days;
    },
    weeks() {
      let weeks = [];
      let week  = [];
      
      for ( let day of this.days ) {
        week.push( day );
        if ( week.length === 7 ) {
          weeks.push( week );
          week = [];
        }
      }
      // Return blocks of 7 days per week.
      return weeks;
    }
  },
  created() {
    console.log(this.$moment);
  }
}
</script>