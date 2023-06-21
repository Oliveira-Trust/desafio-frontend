<template>
  <Fragment>
    <section class="d-flex flex-row align-items-center my-3">
      <h5>Carteiras</h5>
      <div class="ml-auto p-2">
        <ExportCsv :wallets="fullWallets" :dataFile="dataFile" :labels="labels" :fields="fields" />
      </div>
    </section>
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Sobrenome</th>
          <th scope="col">Email</th>
          <th scope="col">Biticoin</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wallet in wallets" v-bind:key="wallet.id">
          <th scope="row">{{ wallet.nome }}</th>
          <td>{{ wallet.sobrenome }}</td>
          <td>{{ wallet.email }}</td>
          <td>{{ wallet.valor_carteira }}</td>
          <td>
            <div class="d-flex">
              <a href="#" @click.prevent="showModalUpdate(wallet, 'updateWallet')" class="mr-2">
                <i class="bi bi-pencil"></i>
              </a>
              <a href="#" @click.prevent="showModalDelete(wallet.id, 'deleteWallet')">
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <section class="d-flex flex-row align-items-center mb-5">
      <div>
        total: <strong>{{ wallets.length }} </strong> 
        <span v-if="wallets.length > 1">Carteiras</span>
        <span v-else>Carteira</span>
      </div>
      <div class="ml-auto p-2">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-end">
            <li v-bind:class="(!pagination['prev']) ? 'page-item disabled' : 'page-item'">
              <a class="page-link" href="#" @click.prevent="onPagination(pagination['first'])" tabindex="-1">Previous</a>
            </li>
            <li v-bind:class="(!pagination['prev']) ? 'page-item disabled' : 'page-item'"><a class="page-link" href="#" @click.prevent="onPagination(pagination['prev'])">Prev</a></li>
            <li v-bind:class="(!pagination['next']) ? 'page-item disabled' : 'page-item'"><a class="page-link" href="#" @click.prevent="onPagination(pagination['next'])">Next</a></li>
            <li v-bind:class="(!pagination['next']) ? 'page-item disabled' : 'page-item'">
              <a class="page-link" href="#" @click.prevent="onPagination(pagination['last'])">Last</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <!--MODAIS DELETE-->
    <Modal v-show="getObjModal.deleteWallet">
      <template v-slot:body>
        <div class="d-flex flex-column justify-content-center text-center">
          <i class="bi bi-trash modal-trash-icon text-danger"></i>
          <h6>Excluir Carteira</h6>
          <p>Tem certeza de que deseja excluir essa carteira?<br> Esta ação não poderá ser desfeita.</p>
          <button type="button" class="btn btn-sm btn-danger" @click="deleteWallet">Excluir</button>
        </div>
      </template>
    </Modal>
    <!--MODAIS UPDATE-->
    <Modal v-show="getObjModal.updateWallet">
      <template v-slot:title>
        <h6>Editar Carteira</h6>
      </template>
      <template v-slot:body>
        <WalletForm :form="form" :converter="converter" typeAction="updateWallet"></WalletForm>
      </template>
    </Modal>
  </Fragment>
</template>

<script>
  import { Fragment } from 'vue-fragment';
  import Modal from '../../Modal/Modal.vue';
  import WalletForm from '../WalletForm/WalletForm.vue';
  import ExportCsv from '../../ExportCsv/ExportCsv.vue';
  import { normalizeValue } from '../../../helpers/helpers';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    components: {
      Modal,
      WalletForm,
      ExportCsv,
      Fragment
    },
    data () {
      return {
        idWallet: null,
        form: {},
        dataFile: 'wallets.csv',
        labels: {
          nome: 'Nome',
          sobrenome: 'Sobrenome',
          email: 'Email',
          'valor_carteira': 'BTC'
        },
        fields: ['id', 'nome', 'sobrenome', 'email', 'valor_carteira']
      }
    },
    async mounted () {
      await this.$store.dispatch('fetchWallets', '?_sort=data_abertura&_order=desc&_page=1&_limit=10');
      await this.$store.dispatch('fetchFullWallets');
      await this.$store.dispatch('getConverter', 'BTC-BRL');
    },
    computed: {
      ...mapGetters('modal', ['getObjModal']),
      ...mapGetters({
        wallets: 'getWallets',
        fullWallets: 'getFullWallets',
        converter: 'getConverter',
        pagination: 'getPagination'
      })
    },
    methods: {
      ...mapMutations('modal', ['HIDE_MODAL']),
      showModalDelete(id, modalName) {
        this.idWallet = id;
        this.$store.dispatch('modal/showModal', modalName);
      },
      showModalUpdate(wallet, modalName) {
        const { id, nome, sobrenome, email, valor_carteira } = wallet;
        
        this.form = {
          id,
          name: nome,
          lastName: sobrenome,
          email,
          purchaseValue: Number(normalizeValue(valor_carteira) * normalizeValue(this.converter.bid))
        };
        this.$store.dispatch('modal/showModal', modalName);
      },
      async deleteWallet() {
        await this.$store.dispatch('deleteWallet', this.idWallet);
        this.HIDE_MODAL();
      },
      async onPagination(link = '') {
        const query = link.split('?');
        await this.$store.dispatch('fetchWallets', `?${query[1]}`);
      }
    }
  }
</script>

<style scoped>
 .modal-trash-icon {
  font-size: 40px;
 }
</style>