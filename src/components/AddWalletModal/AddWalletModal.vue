<template>
  <BaseModal>
    <ModalHeader>
      <h4>Adicionar Carteira</h4>
    </ModalHeader>
    <BaseInput
      v-model="name"
      @update:modelValue="(newValue) => (name = newValue)"
      placeholder="Nome"
    />
    <Divider small />
    <BaseInput
      v-model="surname"
      @update:modelValue="(newValue) => (surname = newValue)"
      placeholder="Sobrenome"
    />
    <Divider small />
    <BaseInput
      v-model="email"
      @update:modelValue="(newValue) => (email = newValue)"
      placeholder="Email"
    />
    <Divider small />
    <div class="currencyConvertWrapper">
      <div>
        <BaseInput
          v-model="currency"
          @update:modelValue="(newValue) => convertCoinToBTC(newValue)"
          placeholder="Valor de Compra"
        />
      </div>
      <span> BTC {{ bitcoin }} </span>
    </div>
    <ModalFooter @onClick="onClick" @onClose="onClose" />
  </BaseModal>
</template>

<script>
import BaseInput from "../shared/Input/Input.vue";
import BaseModal from "../shared/Modal/Modal.vue";
import ModalHeader from "../shared/Modal/ModalHeader.vue";
import ModalFooter from "../shared/Modal/ModalFooter.vue";
import Divider from "../shared/Divider/Divider.vue";
export default {
  name: "AddWalletModal",
  components: {
    BaseInput,
    BaseModal,
    ModalHeader,
    ModalFooter,
    Divider,
  },
  computed: {
    bitcoin() {
      return this.$store.state.currency.bitcoin;
    },
  },
  methods: {
    onClick() {
      const body = {
        nome: this.name,
        sobrenome: this.surname,
        email: this.email,
        valor_carteira: this.currency,
      };
      if(this.name === "" || this.surname === "" || this.email === ""){
        alert("Os campos são obrigatórios");
        return;
      }
      this.$store.dispatch("createWallet", body);
      this.onClose();
    },
    onClose() {
      this.$emit("onClose");
      this.$store.dispatch("clearAmountAndBitcoinState");
    },
    convertCoinToBTC(value) {
      this.currency = this.amount || value;
      this.$store.dispatch("convertCoinToBTC", value);
    },
  },
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      currency: "",
    };
  },
};
</script>

<style scoped>
.currencyConvertWrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.currencyConvertWrapper span {
  font-weight: bold;
  margin-left: 20px;
}
</style>
