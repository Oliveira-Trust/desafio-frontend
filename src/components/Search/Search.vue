<template>
  <section class="container">
    <form @submit.prevent="searchWallet" novalidate="true">
      <div class="form-row align-items-center">
        <div class="col-auto">
          <label class="sr-only" for="name">Nome</label>
          <input type="text" class="form-control mb-2" v-model="name" id="name" placeholder="Nome">
        </div>
        <div class="col-auto">
          <label class="sr-only" for="lastName">Sobrenome</label>
          <input type="text" class="form-control mb-2" v-model="lastName" id="lastName" placeholder="Sobrenome">
        </div>
        <div class="col-auto">
          <label class="sr-only" for="email">Email</label>
          <input type="email" class="form-control mb-2" v-model="email" id="email" placeholder="Email">
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-outline-primary mb-2">Buscar</button>
        </div>
        <div class="col-auto" >
          <input class="btn btn-primary mb-2" type="reset" v-show="getSearchSuccess" @click="reset" value="Remover">
        </div>
      </div>
    </form>
    <div class="alert alert-info" v-show="getSearchError" role="alert">
      {{ getMsgSearch }}
    </div>
    <AlertError :errors="errors" />
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AlertError from '../AlertError/AlertError.vue';

  export default {
    data() {
      return {
        name: null,
        lastName: null,
        email: null,
        errors: []
      }
    },
    components: {
      AlertError
    },
    computed: {
      ...mapGetters(['getMsgSearch', 'getSearchError', 'getSearchSuccess'])
    },
    methods: {
      async searchWallet(submitEvent) {
        const { name, lastName, email } = submitEvent.target.elements;
        const params = {
          nome: name.value,
          sobrenome: lastName.value,
          email: email.value
        }
        this.searchValidation();
      
        if (this.name || this.lastName || this.email) {
          this.errors = [];
          const qs = Object.entries(params)
                      .filter(([, value]) => value !== '')
                      .map(([key, val]) => `${key}=${val}`)
                      .join('&');
        
          await this.$store.dispatch('searchWallet', qs);
        }
      },
      async reset() {
        this.name = null;
        this.lastName = null;
        this.email = null;
        await this.$store.dispatch('fetchWallets');
      },
      searchValidation() {
        this.errors = [];
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if (!this.name || !this.lastName || !regex.test(this.email)) {
          this.errors.push('Preencha um dos campos!');
        }
      }
    }
  }
</script>
