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
    }
  },
  computed: {
    events() {

      let mockData = [
        { description: 'Random Event1', date: this.$moment( '2017-02-02', 'YYYY-MM-DD' ) },
        { description: 'Random Event2', date: this.$moment( '2017-03-02', 'YYYY-MM-DD' ) },
        { description: 'Random Event3', date: this.$moment( '2017-10-02', 'YYYY-MM-DD' ) }
      ];
      return mockData.filter( event => event.date.isSame( this.day, 'day' ) );

    },
    // It is possible to create an object of CSS classes 
    // that can be dynamically applied based on boolean values.
    // Here, we add a class to todays date by checking for 'today'.
    classObject() {
      return {
        day:   true,
        today: this.day.isSame( this.$moment(), 'day' ),
        past:  this.day.isBefore( this.$moment(), 'day' )
      }
    }
  }
}
</script>