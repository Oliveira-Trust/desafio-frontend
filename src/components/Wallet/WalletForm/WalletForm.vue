<template>
  <form @submit.prevent="addWallet">
    <AlertError :errors="errors" />

    <div class="form-group">
      <input type="text" class="form-control" v-model="form.name" id="name" aria-describedby="nome" placeholder="Nome">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" v-model="form.lastName" id="lastName" aria-describedby="sobrenome" placeholder="Sobrenome">
    </div>
    <div class="form-group">
      <input type="email" class="form-control" v-model="form.email" id="email" aria-describedby="emailHelp" placeholder="Email">
    </div>
    <div class="form-group row">
      <div class="col">
        <input type="text" class="form-control" v-model="form.purchaseValue" v-mask="'money'" placeholder="Valor da compra">
      </div>
      <div class="col">
        <input class="form-control" type="hidden" id="purchaseValue" :value="form.purchaseValue | converterBTC(converter)">
        <strong>BTC {{ form.purchaseValue | converterBTC(converter) }}</strong>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Adicionar</button>
  </form>
</template>

<script>
  import AwesomeMask from 'awesome-mask';
  import { mapMutations } from 'vuex';
  import AlertError from '../../AlertError/AlertError.vue';
  import { normalizeValue } from '../../../helpers/helpers';

  export default {
    directives: {
      'mask': AwesomeMask
    },
    data() {
      return {
        objConverter: {},
        errors: []
      }
    },
    components: {
      AlertError
    },
    props: ['form', 'converter', 'typeAction'],
    methods: {
      ...mapMutations('modal', ['HIDE_MODAL']),
      async addWallet (submitEvent) {
        const { name, lastName, email, purchaseValue } = submitEvent.target.elements;
        
        this.searchValidation({ name, lastName, email, purchaseValue });

        if (name.value && lastName.value && email.value && purchaseValue.value) {
          const payload = {
            nome: name.value,
            sobrenome: lastName.value,
            email: email.value,
            valor_carteira: purchaseValue.value,
            data_abertura: new Date().toISOString()
          };
  
          await this.$store.dispatch(this.typeAction, {...payload, id: this.form.id});
          this.HIDE_MODAL();
        }
      },
      searchValidation({ name, lastName, email, purchaseValue }) {
        this.errors = [];
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!name.value ) {
          this.errors.push('O campo nome deve ser preenchido!');
        }
        if (!lastName.value) {
          this.errors.push('O campo Sobrenome deve ser preenchido!');
        }
        if (!regex.test(email.value)) {
          this.errors.push('O campo Email deve ser preenchido!');
        }
        if (!purchaseValue.value) {
          this.errors.push('O campo Valor da compra deve ser preenchido!');
        }
      }
    },
    filters: {
      converterBTC(value, converter = {}) {
        if (value) {
          const { bid } = converter;
          const result = Intl.NumberFormat('pt-BR', {  
            currency: 'XBT' 
          }).format(Number(normalizeValue(value) / normalizeValue(bid))).replace('XBT', '').trim();
          return  bid && result;
        }
      }
    }
  }
</script>
