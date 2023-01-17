<template>
  <h1>Users {{count}} - {{teste}}!</h1>
</template>

<script>
// import { mapState } from 'vuex'

export default {
    name:'home',
    props: {
        prop: String
    },
    data: () => {
    return {
      teste: 0
    }},
    computed:{
      count () {
        return this.$store.state.count
      }    
    }, 
    created(){
      console.log('entrou')
      // eslint-disable-next-line no-debugger
      debugger
      console.log(this.$store.state)
    }
      
}
</script>

<style>
h1{
    color:red
}
</style>