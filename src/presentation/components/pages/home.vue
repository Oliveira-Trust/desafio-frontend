<template>
  <div>
    <v-container>
      <v-row class="mt-5 mb-5">
        <v-col cols="2">     
          <h1>BTC Carteiras</h1>            
        </v-col>
        <v-col align="end" cols="10" >
          <v-btn
            class="no-uppercase"
            depressed
            color="primary">
            Adicionar Carteira
          </v-btn>
          <!-- btn-add-carteira -->
        </v-col>
      </v-row>  
      <v-row>
        <!-- filter -->
      </v-row>
      <grid-user v-if="hasData"
        :headers="headers" 
        :dataSource ="filteredUsers()" 
        :icons="icons"
        :itemsPage="itemsPage"
        />    
    </v-container>  
      <!-- <template>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
          </v-dialog>      
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>    
      </v-data-table>
    </template>    -->
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import gridUser from '../layout/GridComponent.vue'

export default {
  name:'home',
  components:{
    gridUser
  },
  data: () => {
  return {
    hasData: false,
    headers:[
      { text: 'Nome', align: 'start', value: 'nome'},
      { text: 'Sobrenome', align: 'start', value: 'sobrenome'},
      { text: 'Email', align: 'start', value: 'email'},
      { text: 'Bitcoin', align: 'start', value: 'valor'}
    ],
    icons: ['U','D'],    
    itemsPage: 10
  }},
  methods:{
    ...mapActions(['requestUsers']),	
  },
  computed:{
    ...mapGetters(['filteredUsers'])
  }, 
  async mounted(){	
    this.requestUsers()
    this.$nextTick(()=>{
      this.hasData = true
    })
  },
}
</script>
