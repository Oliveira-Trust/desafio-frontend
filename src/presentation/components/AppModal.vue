<template>
  <v-dialog    
    :id="id"
    persistent
    v-model="show"
    transition="dialog-bottom-transition"
    :max-width="`${width}px`"
    overlay-opacity=0.9
    overlay-color="black"
  >
    <slot></slot>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name:"app-modal",
  props:{
    id: { type: String, required: true, default: ()=> null },
    width: { type: Number, required: false, default: 700 },
  },
  data:()=>{
    return {
      show: false
    }
  },
  methods:{
    ...mapMutations(['showModal'])
  },
  computed:{
   ...mapState({
      modalOpened: state => state.openedModal
   })
  },
  watch:{
    modalOpened(newVal){
      this.show = (newVal == this.id)? true: false
    }
  }
}
</script>

<style>

</style>