<template>

  <div :class="classObject">{{ day.format( 'D' ) }}</div>

</template>

<script>
export default {
  props: [ 'day' ], 
  data() {
    return {

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