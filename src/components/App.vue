<template>
  <div>
    <div v-for="day in days">{{ day }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      month: 2,
      year: 2017
    }
  },
  computed: {
    days() {
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
      
      do {
        // keep adding days in the month until...
        days.push(currentDay);
        // create a fresh instance of moment for the next day...
        currentDay = this.$moment(currentDay).add(1, 'days');
        // months are zero-indexed, hence why we + 1
      } while( (currentDay.month() + 1) === this.month );

      // Add previous days to start
      currentDay = this.$moment( days[0] );

      const SUDNAY = 0;
      const MONDAY = 1;
      // To get a complete calendar grid of 7 across, we may have to add
      // in days from the previous month. We do this by resetting the
      // currentDay variable and subtracting a day, then adding that day
      // to the front of the days array. When the currentDay is MONDAY
      // we stop because that marks the beginning of the calendar.
      do {
        currentDay = this.$moment( currentDay ).subtract(1, 'days');
        days.unshift( currentDay );
      } while( currentDay.day() !== MONDAY );

      // return an array of all the current days of the month.
      return days;
    }
  },
  created() {
    console.log(this.$moment);
  }
}
</script>