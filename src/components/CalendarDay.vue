<template>

    <div :class="classObject" @click="captureClick">
      {{ day.format( 'D' ) }}
      <ul class="event-list">
        
        <li v-for="event in events">{{ event.description }}</li>

      </ul>
    </div>

</template>

<script>
export default {
  props: [ 'day' ], 
  methods: {
    captureClick( event ) {
      const X = event.clientX;
      const Y = event.clientY;
      this.$store.commit( 'eventFormPosition', { X, Y } );
      this.$store.commit( 'eventFormActive', true );
      // When the user clicks a day, the event Date is passed to store.
      this.$store.commit( 'eventFormDate', this.day );
    }
  },
  computed: {
    events() {
      return this.$store.state.events.filter( event => event.date.isSame( this.day, 'day' ) );
    },
    // It is possible to create an object of CSS classes 
    // that can be dynamically applied based on boolean values.
    // Here, we add a class to todays date by checking for 'today'.
    classObject() {
      let eventFormDate   = this.$store.state.eventFormDate;
      let eventFormActive = this.$store.state.eventFormActive;
      return {
        day:   true,
        today: this.day.isSame( this.$moment(), 'day' ),
        past:  this.day.isBefore( this.$moment(), 'day' ),
        active: eventFormDate.isSame( this.day, 'day' ) && eventFormActive
      }
    }
  }
}
</script>