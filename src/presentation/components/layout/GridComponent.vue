<!-- 
  Requisitos
  - x - bordar inferior no header
  - x - zebrada sem linhas
  - x - hover bg branco
  - x - hover borda esquerda azul na 1ª celula 
  - x - icones
  - x - somatorio de linhas
  - x - paginação com setas e quadradinhos
  - titulo em negrito
  - botão de exportar
 -->

<template>
  <div>
    <v-data-table   
      :headers="headers"   
      :items="dataSource"
      :icons="icons"
      :itemsPage="itemsPage"
      :page.sync="page" 
      hide-default-footer
      @page-count="pageCount = $event"			
      item-key="id"
      class="custom-style elevation-1"      
    >      
      <template v-slot:item.actions="{ item }">
        <v-icon                
          @click="editItem(item)"
        >
          mdi-pencil-outline
        </v-icon>
        <v-icon 
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
  </div>
</template>

<script>
export default {
  name:'grid-component',
  props:{
    headers: { type: Array, required: false, default: ()=> null},
    dataSource: { type: Array, required: true, default: ()=> []},
    icons: { type: Array, required: false, default: ()=> null},
    itemsPage: { type: Number, required: false, default: ()=> 50}
  },
  data:()=>{
    return {
      page:1,
      pageCount: 1
    }
  },
  methods:{
    addActions(){
      if (this.icons) {
        this.headers.push({ text: '', align:"end", value: 'actions', sortable: false })
      }
    },
    updatePageCount(length){
      this.pageCount = Math.ceil(length / this.itemsPage)
    }
  },
  mounted(){
    this.addActions()
    this.updatePageCount(this.dataSource.length)
  },
  watch: {
    dataSource(val) {
      this.updatePageCount(val.length)
    }
  },
  
}
</script>