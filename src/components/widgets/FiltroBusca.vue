<template>
  <b-form inline>
      <div class="col-md-10 row d-flex">
          <div class="flex-fill mr-2">
              <b-form-input id="inline-form-input-nome" class="mb-2 mr-sm-2 mb-sm-0 w-100" placeholder="Nome" v-model="nome"></b-form-input>
          </div>
          <div class="flex-fill mr-2">
              <b-form-input id="inline-form-input-sobrenome" class="mb-2 mr-sm-2 mb-sm-0 w-100" placeholder="Sobrenome" v-model="sobrenome"></b-form-input>
          </div>
          <div class="flex-fill mr-2">
              <b-form-input id="inline-form-input-nome" class="mb-2 mr-sm-2 mb-sm-0 w-100" type="email" placeholder="E-mail" v-model="email"></b-form-input>
          </div>
      </div>
      <div class="col-md-2 d-flex justify-content-end">
          <b-button variant="outline-primary" @click="buscar"><b-icon icon="search" aria-hidden="true"></b-icon> Buscar</b-button>
      </div>
  </b-form>
</template>

<script>
import CarteiraService from '@/service/CarteiraService.js'

export default {

    carteiraService: null,

    data() {
        return {
            nome: '',
            sobrenome: '',
            email: '',
        }
    },
    methods: {
        buscar() {
            this.carteiraService.buscar(this.nome, this.sobrenome, this.email)
            .then(resp => {
                this.$store.state.itens = resp.data
                console.log(resp)
            })
        }
    },
    created() {
        this.carteiraService = new CarteiraService() 
    },

}
</script>

<style>

</style>