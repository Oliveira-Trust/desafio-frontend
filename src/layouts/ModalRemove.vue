
<template>
  <App-Modal>
    <template v-slot:modalHeader>
      <h3>
        <div>
          <DeleteIcon
            fillColor="var(--color-error)"
            :size="62"
            class="icone-search"
          />
        </div>
      </h3>
    </template>
    <template v-slot:modalBody>
      <section class="container-modal">
        <h4 class="text-center">Excluir Carteira</h4>
        <p class="text-center">Tem certeza que deseja excluir essa Carteira?</p>
        <p class="text-center">Esta ação não poderá ser desfeita.</p>
      </section>
    </template>
    <template v-slot:modalFooter>
      <div class="w-100">
        <App-Button
          variation="primary"
          class="w-100"
          state="error"
          @click="close(form)"
        >
          Excluir
        </App-Button>
        <App-Button variation="default" class="w-100 text-center" @click="dismiss()">
          Cancelar
        </App-Button>
      </div>
    </template>
  </App-Modal>
</template>

<script>
export default {
  name: "App-ModalRemove",
  props: {
    close: {
      type: Function,
      required: true,
    },
    dismiss: {
      type: Function,
      required: true,
    },
    formulario: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.btn-remove {
  font-size: 1rem;
  background-color: var(--color-error);
}

h3 {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: var(--radius-circle);
}

h3 div {
  padding: 0.5rem;
  border-radius: var(--radius-circle);
  border: 1px solid var(--color-error);
}

h4 {
  font-size: 1.2rem;
}

.container-modal {
  padding: 1rem;
}
</style>