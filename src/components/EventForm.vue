<template>
  <div id="event-form" :class="{ active }" :style="{ top, left }">

    <h4>Add an event</h4>
    <p>{{ date.format( 'dddd, MMM, Do' ) }}</p>
    
    <div class="text">
      <input v-focus type="text" 
             v-model="description" 
             placeholder="Dinner at Mum's"
             @keyup.enter="create()">
    </div>
    <div class="buttons">
      <button @click="create()">Create</button>
    </div>
    <button id="close-button" @click="close"> &#10005; </button>

  </div>
</template>

<script>
export default {
        data() {
            return {
                description: ''
            }
        },
        methods: {
           close() {
               this.$store.commit('eventFormActive', false);
           },
            create() {
                if ( this.description !== '' ) {
                    // When dispatching an event, the payload is synced with the 
                    // addEvent action in the actions object.
                    this.$store.dispatch( 'addEvent', this.description).then( () => {
                        this.description = '';
                        this.$store.commit( 'eventFormActive', false );
                        this.close();
                    });
                }
            }
        },
        computed: {
            date() {
                return this.$store.state.eventFormDate;
            },
            active() {
                return this.$store.state.eventFormActive;
            },
            top() {
                return `${ this.$store.state.eventFormPosY }px`;
            },
            left() {
                return `${ this.$store.state.eventFormPosX }px`;
            }
        },
        directives: {
            focus: {
                // create update Hook to check when calendar box is clicked
                // then focus on the clicked element ( text-area ).
                update(el) { 
                    el.focus(); 
                }
            }
        }
    }
</script>
