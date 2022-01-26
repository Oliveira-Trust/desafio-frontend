
<template>
  <App-Modal>
    <div class="title-modal" slot="modalHeader">
      <h3 class="title-modal">Adicionar Carteira</h3>
    </div>
    <template v-slot:modalBody>
      <section class="container-modal">
        <App-Input
          class="modal-input"
          type="text"
          v-model="form.nome"
          label="Nome"
          name="nome"
        />
        <App-Input
          class="modal-input"
          type="text"
          v-model="form.sobrenome"
          label="Sobrenome"
          name="sobrenome"
        />
        <App-Input
          class="modal-input"
          type="email"
          v-model="form.email"
          label="E-mail"
          name="email"
        />
        <div class="group-amount">
          <App-Input
            class="modal-input w-50"
            type="text"
            v-model="form.valor_carteira"
            label="Valor de compra"
            name="valorCompra"
          />
          <div class="w-50 amount">
            BTC
            <span v-text="'Bitcoin'"></span>
          </div>
        </div>
      </section>
    </template>
    <template v-slot:modalFooter>
      <App-Button variation="default" @click="dismiss()"> Cancelar </App-Button>
      <App-Button variation="primary" @click="close(form)">
        Adicionar
      </App-Button>
    </template>
  </App-Modal>
</template>

<script>
export default {
  name: "App-ModalRegister",
  props: {
    close: {
      type: Function,
      required: true,
    },
    dismiss: {
      type: Function,
      required: true,
    },
    form: {
      type: Object,
      default: () => {
        return {
          nome: "",
          sobrenome: "",
          email: "",
          valor_carteira: 0,
        };
      },
    },
  },
};
</script>

<style scoped>
.title-modal {
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f2f2f2;
}
.container-modal {
  padding: 1rem;
}
.modal-input {
  margin-bottom: 0.5rem;
}

.group-amount {
  display: flex;
  align-items: center;
}

.group-amount .modal-input,
.amount {
  margin-right: 1rem;
}
.amount {
  font-weight: 600;
  font-size: 1.2rem;
}
button {
  font-size: 1rem;
}
</style>