<template>
  <div>
    <div v-for="day in days">{{ day }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      month: 5,
      year: 2017
    }
  },
  computed: {
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

      // Add previous days to start by resetting currentDay to beginning.
      currentDay = this.$moment( days[0] );

      const SUDNAY = 0;
      const MONDAY = 1;

      if ( currentDay.day() !== MONDAY ) {
        // To get a complete calendar grid of 7 across, we may have to add
        // in days from the previous month. We do this by resetting the
        // currentDay variable and subtracting a day, then adding that day
        // to the front of the days array. When the currentDay is MONDAY
        // we stop because that marks the beginning of the calendar.
        do {
          currentDay = this.$moment( currentDay ).subtract(1, 'days');
          days.unshift( currentDay );
        } while( currentDay.day() !== MONDAY );

      } // endif; 

      // Add next month's days to calendar by 
      // resetting currentDay to the end of the array.
      currentDay = this.$moment( days[days.length - 1] );

      if ( currentDay.day() !== SUDNAY ) {
        
        // keep adding until the end of calendar reaches SUDNAY.
        do {
          currentDay = this.$moment( currentDay ).add( 1, 'days' );
          days.push( currentDay );
        } while( currentDay.day() !== SUDNAY );

      } // endif;

      // return an array of all the current days of the month.
      return days;
    }
  },
  created() {
    console.log(this.$moment);
  }
}
</script>