<template>
  <div>
    <h1>Users</h1>
    <user-grid />
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import userGrid from '../components/user-grid.vue'

export default {
  name:'home',
  components:{
    userGrid
  },
  data: () => {
  return {
    // var: 0
  }},
  methods:{
    ...mapActions(['requestUsers']),	
  },
 
  async mounted(){	
    this.requestUsers()
  },
}
</script>

<style>
h1{
    color:red
}
</style>