<template>
  <Fragment>
    <div class="container">
     <div class="d-flex flex-row align-items-center my-3">
       <h3>BTC Carteiras</h3>
       <div class="ml-auto p-2">
         <button type="button" @click="showModalHanlder('addWallet')" class="btn btn-primary btn-sm">Adicionar Carteira</button>
       </div>
     </div>
    </div>
    <Modal v-show="getObjModal.addWallet">
      <template v-slot:title>
        <h6>Adicionar Carteira</h6>
      </template>
      <template v-slot:body>
        <WalletForm :form="form" :converter="converter" typeAction="addWallet"></WalletForm>
      </template>
    </Modal>
  </Fragment>
</template>

<script>
  import Modal from '../../Modal/Modal.vue';
  import WalletForm from '../WalletForm/WalletForm.vue';
  import { Fragment } from 'vue-fragment';
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        form: {}
      }
    },
    components: {
      Modal,
      WalletForm,
      Fragment
    },
    computed: {
      ...mapGetters('modal', ['getObjModal']),
      ...mapGetters({
        converter: 'getConverter'
      })
    },
    async mounted() {
      await this.$store.dispatch('getConverter', 'BTC-BRL');
    },
    methods: {
      showModalHanlder(modalName) {
        this.$store.dispatch('modal/showModal', modalName);
        this.form = {};
      }
    }
  }
</script>

<style scoped>

</style>