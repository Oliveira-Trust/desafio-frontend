<template>
  <transition name="fade" appear>
    <div class="container-modal-create-and-update">
      <div class="modal-create-and-update">
        <h4 class="title">{{ id >= 0 ? "Editar" : "Adicionar" }} Carteira</h4>
        <div class="container-inputs">
          <Input
            id="nome"
            label="Nome"
            :value="nome"
            :error="fieldsError.includes('nome')"
            @update:input="$emit('update:input', $event)"
          />
          <Input
            id="sobrenome"
            label="Sobrenome"
            :value="sobrenome"
            :error="fieldsError.includes('sobrenome')"
            @update:input="$emit('update:input', $event)"
          />
          <Input
            id="email"
            label="E-mail"
            type="email"
            :value="email"
            :error="fieldsError.includes('email')"
            @update:input="$emit('update:input', $event)"
          />
          <div class="btc">
            <Input
              id="valor_carteira"
              label="Valor de compra"
              type="number"
              :value="valorDeCompra"
              :error="fieldsError.includes('valor_carteira')"
              @update:input="
                $emit('update:input', { key: $event.key, val: +$event.val })
              "
            />
            <strong class="btc-value"> BTC 0.12345 </strong>
          </div>
          <div class="actions">
            <button
              class="btn btn-cancel"
              @click="$emit('createAndUpdateActions', false)"
            >
              Cancelar
            </button>
            <button
              class="btn btn-confirm"
              @click="$emit('createAndUpdateActions', true)"
            >
              {{ id >= 0 ? "Editar" : "Adicionar" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Input from "@/components/Input";
export default {
  name: "ModalCreateAndUpdate",
  components: { Input },
  props: {
    nome: { type: String, default: "" },
    sobrenome: { type: String, default: "" },
    email: { type: String, default: "" },
    id: { type: [String, Number], default: -1 },
    valorDeCompra: { type: [String, Number], default: 0 },
    fieldsError: { type: Array, default: () => [] },
  },
  watch: {
    fieldsError(val) {
      if (val.length) {
        this.$toast.clear();
        let fields = val.join(", ");
        if (fields.includes("valor_carteira")) {
          fields = fields.replace("valor_carteira", "valor de compra");
        }
        this.$toast.error(`Por favor verifique o(s) campo(s), ${fields}.`);
      }
    },
  },
};
</script>
<style scoped>
.container-modal-create-and-update {
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  left: 0;
  max-width: 100%;
  min-height: 100vh;
  padding: 10px;
  place-items: center;
  position: fixed;
  top: 0;
  width: 100%;
}
.modal-create-and-update {
  background: #fff;
  border-radius: 8px;
  max-width: 500px;
  padding: 20px;
  width: 100%;
}
.title {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  margin-bottom: 40px;
}
.container-inputs {
  margin: 10px;
  display: grid;
  gap: 10px;
}
.btc {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.btc-value {
  flex: 1 1 40%;
}
.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}
.btn {
  cursor: pointer;
  height: 40px;
  outline: none;
  transition: all 0.3s ease-out;
  user-select: none;
  width: 120px;
}
.btn-cancel {
  background: #fff;
  border: 1px solid #0069d9;
  color: #0069d9;
}
.btn-cancel:hover {
  background: #0069d9;
  color: #fff;
}
.btn-confirm {
  background: #0069d9;
  border: 1px solid #0069d9;
  color: #fff;
}
.btn-confirm:hover {
  background: #fff;
  color: #0069d9;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
