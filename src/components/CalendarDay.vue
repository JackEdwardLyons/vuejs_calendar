<template>

  <div :class="classObject" @click="captureClick">{{ day.format( 'D' ) }}</div>

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