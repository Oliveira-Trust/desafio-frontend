<template>
  <table class="ma-b-10">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Sobrenome</th>
        <th>Email</th>
        <th>Bitcoin</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="naoExisteCateiras" align="center">
        <td colspan="5">Nenhuma carteira adicionada</td>
      </tr>
      <tr v-for="wallet in listWallets" :key="wallet.id">
        <td data-title="Nome" v-text="wallet.nome"></td>
        <td data-title="Sobrenome" v-text="wallet.sobrenome"></td>
        <td data-title="Email" v-text="wallet.email"></td>
        <td data-title="Bitcoin" v-text="wallet.valor_carteira"></td>
        <td>
          <div class="group-btn">
            <App-Button variation="icone" @click="openModalEditar(wallet)">
              <EditIcon :size="18" fillColor="var(--color-default)" />
            </App-Button>

            <App-Button variation="icone" @click="openModalRemover(wallet)">
              <DeleteIcon :size="18" fillColor="var(--color-default)" />
            </App-Button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ModalService from "@/services/ModalService";
import ModalRegister from "../layouts/ModalRegister.vue";
import ModalRemove from "../layouts/ModalRemove.vue";

export default {
  name: "App-TableWallets",
  props: {
    listWallets: {
      type: Array,
      default: () => [],
    },
    removeWallet: {
      type: Function,
    },
    editWallet: {
      type: Function,
      required: true,
    },
  },
  methods: {
    openModalEditar(wallet) {
      ModalService.open(ModalRegister, {
        form: { ...wallet },
      }).then((retorno) => {
        this.editWallet(retorno);
      });
    },

    openModalRemover(wallet) {
      ModalService.open(ModalRemove, { form: wallet }).then((wallet) => {
        this.removeWallet(wallet);
      });
    },
  },
  computed: {
    naoExisteCateiras() {
      return this.listWallets.length == 0;
    },
  },
};
</script>

<style scoped>
tbody tr:nth-of-type(even) td {
  background-color: rgba(0, 0, 0, 0.03);
}

.group-btn {
  float: right;
}

table {
  border-collapse: collapse;
  width: 100%;
  border-spacing: 0 0rem;
  margin-bottom: 1.5rem;
}

th {
  color: var(--color-black);
  font-weight: var(--weight-semi-bold);
  padding: 1rem 1rem 0.7rem 0.5rem;
  text-align: left;
  border-bottom: 0.13rem solid #c5d0db;
}

tbody tr:hover {
  background-color: rgb(227 240 255 / 20%);
  box-shadow: inset 3px 0px 0px 0px var(--color-primary);
}

td {
  padding: 1rem 1rem 0.5rem 0.5rem;
  border: 0;
}

tr:last-child {
  border-bottom: 0.08rem solid #c5d0db;
}

@media (max-width: 769px) {
  th {
    display: none;
  }

  td {
    display: block;
    width: 100%;
  }
  td:before {
    content: attr(data-title);
    text-transform: uppercase;
    margin-right: 0.5rem;
  }
}
</style>