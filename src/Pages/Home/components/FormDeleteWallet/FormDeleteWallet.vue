<style src="./FormDeleteWallet.css"></style>

<template>
  <form class="formValidation" @submit.prevent="">
    <div class="formDescriptions">
      <span class="formTrash pi pi-trash"></span>
      <span class="formDescriptionOne">Excluir Carteira</span>
      <span class="formDescriptionTwo"
        >Tem certeza que deseja excluir essa Carteira?</span
      >
      <span class="formDescriptionThree"
        >Está ação não poderá ser desfeita</span
      >
    </div>
    <div class="buttonFinishDelete">
      <button class="buttonDelete" @click.stop="excluirUsuario(userId)">
        Excluir
      </button>
      <button class="buttonToCancel" @click="close">Cancelar</button>
    </div>
  </form>
</template>
<script>
import Users from "../../../../services/users.js";

export default {
  name: "FormDeleteWallet",
  props: {
    userId: String,
  },
  methods: {
    close() {
      this.$emit("close");
    },
    excluirUsuario() {
      Users.deletar(this.userId)
        .then(() => {
          this.$emit("walletUpdated");
          this.$emit("deleteSuccess");
          this.openedModalDelete = false;
        })
        .catch((error) => {
          console.error("Erro ao excluir usuário:", error);
        });
    },
  },
};
</script>
