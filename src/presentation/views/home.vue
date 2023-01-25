<template>
  <div>
    <v-container id="title-container">
      <v-row class="mt-5 mb-5">
        <v-col cols="2"> 
          <h1>BTC Carteira </h1>
        </v-col>
        <v-col cols="2"> 
          <v-autocomplete class="h1"
            label = 'Selecione a moeda'
            :items="['BRL','BTC', 'EUR', 'USD']"                        
            :value="selectedCurrency" 
            @input="updateGridExchange"               
            ></v-autocomplete>            
        </v-col>
        <v-col align="end" cols="8" >
          <v-btn depressed  
            class="no-uppercase" 
            color="primary" 
            @click.stop="showModal('addUser')"
          > 
            Adicionar Carteira
          </v-btn>
          <app-modal id="addUser">
            <user-form></user-form>
          </app-modal>          
        </v-col>
      </v-row>   
    </v-container>
    <v-container id="filter">
      <v-row class="mb-10 pt-5 pr-5 pl-5 rounded-shadow">        
        <v-col :xl="3" :md="3">
          <v-text-field
            v-model="prefilter.nome"
            dense
            label="Nome"
            placeholder="Input Placeholder"
            outlined
          ></v-text-field>
        </v-col>
        <v-col :xl="4" :md="3">
          <v-text-field
            v-model="prefilter.sobrenome"
            dense
            label="Sobrenome"
            placeholder="Input Placeholder"
            outlined
          ></v-text-field>
        </v-col>
        <v-col :xl="4" :md="4">
          <v-text-field
            v-model="prefilter.email"
            dense
            label="Email"
            placeholder="Input Placeholder"
            outlined
            ></v-text-field>
        </v-col>
        <v-col :xl="1" :md="2" align="end">
          <v-btn            
            class="no-uppercase pa-5"
            depressed
            outlined
            color="primary"
            @click="setFilter()">
            <v-icon left color="primary" >
              mdi-magnify
            </v-icon>
            Buscar
          </v-btn>              
        </v-col>          
      </v-row>
    </v-container>
    <v-container id="grid" class="pa-10 rounded-shadow">
      <v-row >
        <v-col cols="2">     
          <h2>Carteiras</h2>            
        </v-col>
        <v-col align="end" cols="10" >
          <v-btn
            class="no-uppercase pa-5"
            depressed
            outlined
            color="primary"
            @click="exportar">
            Exportar CSV
          </v-btn>
          <!-- btn-add-carteira -->
        </v-col>
      </v-row>   
      <grid-user id="users" v-if="hasData"
        :headers="headers" 
        :dataSource ="filteredUsers(filter)"         
        :itemsPage="itemsPage"
        /> 
    </v-container>
  </div>
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

</template>

<script>

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import gridUser from '../components/UserGridView.vue'
import userForm from '../components/UserForm.vue'
import appModal from '../components/AppModal.vue'
import { jsonToCSV, fileExporter } from '../../services/fileSystem/index'

export default {
  name:'home',
  components:{
    gridUser,
    userForm,
    appModal
  },
  data: () => {
    return {
      addModal: false,
      hasData: false,
      headers:[
        { text: 'Nome', align: 'start', value: 'nome'},
        { text: 'Sobrenome', align: 'start', value: 'sobrenome'},
        { text: 'Email', align: 'start', value: 'email'},
        { text: 'Valor (BTC)', align: 'start', value: 'valor_carteira'}        
      ],      
      itemsPage: 10,
      prefilter:{
        nome: null,
        sobrenome: null,
        email:null
      },
      filter:{
        nome: null,
        sobrenome: null,
        email:null
      }
    }
  },
  methods:{
    ...mapActions(['requestUsers', 'getCurrencyBid']),	
    ...mapMutations(['showModal','setSelectedCurrency', 'setSelectedCurrencyBid']),
    exportar () {
      const file = jsonToCSV(this.filteredUsers(this.filter))
      fileExporter(file, "export.csv")
		},
    setFilter(){
      this.filter = Object.assign(this.filter, this.prefilter)
    },
    updateGridExchange(e){
      this.setSelectedCurrency(e)    
      const bid = this.getCurrencyBid()
      console.log(bid)
      this.setSelectedCurrencyBid(bid)
      this.setFilter(this.filter)
    }

  },
  computed:{
    ...mapGetters(['filteredUsers']), 
    ...mapState({
      selectedCurrency: state => state.selectedCurrency
    })   
  }, 
  async mounted(){	
    this.requestUsers()
    this.$nextTick(()=>{
      this.hasData = true
    })
  },
}
</script>

<style lang="scss" scoped>
#filter .row {background-color: white;}
#grid {background-color: white;}
.h1.v-input {
  margin-top: -12px
}
</style>
