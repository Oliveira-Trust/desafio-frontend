<template>
  <v-card id="modal" class="pa-10">    
    <v-card-text class="text-center">        
      <v-icon 
          class="ml-5 mr-2 mb-10 circle-alert-border"   
          color="error"
          size=60
        >
          mdi-delete-outline
      </v-icon>
         
      <h2 class="mb-3">
        Excluir Carteira
      </h2>
      <p class="base-font mb-0">Tem certeza que deseja excluir essa Carteira? </p>
      <p class="base-font" >Esta ação não poderá ser desfeita.</p>
      
      <v-row>
        <v-col cols="12">
          <v-btn id="remove-btn" depressed  class="no-uppercase pa-5" @click="submit()">
            Excluir 
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn  depressed text  class="no-uppercase" color="primary" @click="cleanModal()">
                Cancelar 
          </v-btn>      
        </v-col>
      </v-row>        
    </v-card-text>
    
  </v-card>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name:'user-remove',
  components:{}, 
  data: () => {
  return {    
  }},
  methods:{
    ...mapMutations(['cleanModal']),
    ...mapActions(['deleteUser']),
    submit(){
      this.deleteUser(this.userSelected.id)
      this.cleanModal()
    }
  },
  computed:{
    ...mapState({
      userSelected: state => state.selectedUser
    })  
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  #remove-btn {
    min-width: 350px;
    background-color: $error-color;
    color: $neutral-color;
  }
  p {color: $txt-color;}
</style>
