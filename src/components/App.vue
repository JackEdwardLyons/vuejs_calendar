<template>
  <div>
    {{ msg }}
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      msg: 'Hello Poo'
    }
  },
  created() {
    console.log( this.$moment );
  }
}
</script>