<template>
  <div>
    <v-data-table   
      :headers="headers"   
      :items="dataSource"      
      :itemsPage="itemsPage"
      :page.sync="page" 
      hide-default-footer
      @page-count="pageCount = $event"			
      item-key="id"
      class="custom-style"      
    >      
      <template v-slot:item.actions="{ item }">
        <v-icon                
          @click="editItem(item)"
          title="Editar"
          >
          mdi-pencil-outline
        </v-icon>              
        <v-icon 
          title="Excluir"
          class="ml-5 mr-2"       
          @click="deleteItem(item)"
        >
          mdi-delete-outline
        </v-icon>
      </template> 
    </v-data-table>
    <v-row justify="space-between" class="pa-5 mt-10">
      <span class="ml-6 body-font">{{ dataSource.length }} registro(s).</span>
      <v-pagination
        class="custom-style mr-6 body-font"
        v-model="page"
        :length="pageCount"
        elevation="0"
      ></v-pagination>      
    </v-row>
    <app-modal id="updateUser">
      <user-form></user-form>
    </app-modal>    
    <app-modal id="removeUser" >
      <userRemove></userRemove>
    </app-modal>    
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import appModal from './AppModal'
import userForm from './UserForm'
import userRemove from './UserRemove'
export default {
  components:{
    appModal,
    userForm,
    userRemove
  },
  name:'grid-component',
  props:{
    headers: { type: Array, required: false, default: ()=> null},
    dataSource: { type: Array, required: true, default: ()=> []},    
    itemsPage: { type: Number, required: false, default: ()=> 50}
  },
  data:()=>{
    return {
      page:1,
      pageCount: 1,      
    }
  },
  methods:{
    ...mapMutations(['showModal', 'setSelectedUser']),
    ...mapActions(['getCurrencyBid']),
    addActions(){
      this.headers.push({ text: '', align:"end", value: 'actions', sortable: false })      
    },
    updatePageCount(length){
      this.pageCount = Math.ceil(length / this.itemsPage)
    },
    editItem(item){   
      this.setSelectedUser(item)      
      this.showModal('updateUser')
    },
    deleteItem(item){   
      this.setSelectedUser(item)      
      this.showModal('removeUser')
    }
  },
  async mounted(){
    this.updatePageCount(this.dataSource.length)
    if(this.selectedCurrency === 'BTC')
    this.headers.push({text: `Valor (${this.selectedCurrency})`, align: 'start', value: 'valor_currency'})     
    this.addActions()
  },
  updated(){
    if(!this.headers[4].text.includes(this.selectedCurrency))
    this.headers[4].text = this.selectedCurrency
  },
  computed:{
    ...mapState({
      selectedCurrency: state => state.selectedCurrency
    })  
  },
  watch: {
    dataSource(val) {
      this.updatePageCount(val.length)
    },
    selectedCurrency(val) {
      this.headers[4].text = `Conversão (${val})`
    }
  }  
}
</script>