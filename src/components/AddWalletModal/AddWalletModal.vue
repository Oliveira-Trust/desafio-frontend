<template>
    <BaseModal
        @onClick="onClick"
        @onClose="onClose"
    >
            <BaseInput
                v-model="name"
                @update:modelValue="newValue => name = newValue"
                placeholder="Nome"
            />
            <Divider small />
            <BaseInput
                v-model="surname"
                @update:modelValue="newValue => surname = newValue"
                placeholder="Sobrenome"
            />
            <Divider small />
            <BaseInput
                v-model="email"
                @update:modelValue="newValue => email = newValue"
                placeholder="Email"
            />
            <Divider small />
            <div class="currencyConvertWrapper">
                <div>
                    <BaseInput
                        v-model="currency"
                        @update:modelValue="newValue => convertCoin(newValue)"
                        placeholder="Valor de Compra"
                    />
                </div>
                <span>
                    BTC {{ amount }}
                </span>
            </div>
    </BaseModal>
</template>

<script>
    import BaseInput from '../shared/Input/Input.vue';
    import BaseModal from '../shared/Modal/Modal.vue';
    import Divider from '../shared/Divider/Divider.vue'
    export default {
        name: "Modal",
        components: {
            BaseInput,
            BaseModal,
            Divider
        },
        computed: {
            amount () {
                return this.$store.state.currency.amount
            },
       },
        methods: {
            onClick(){
                const body = {
                    nome: this.name,
                    sobrenome: this.surname,
                    email: this.email,
                    currency: this.currency
                }
                this.$store.dispatch("createWallet", body);
                this.onClose()
            },
            onClose(){
                this.$emit('onClose')
            },
            convertCoin(value){
                this.currency = this.amount || value;
                this.$store.dispatch("convertCoin", value);
            }
        },
        data() {
            return {
                name: '',
                surname: '',
                email: '',
                currency: ''
            }
        } 
    }
</script>

<style scoped>
.currencyConvertWrapper{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.currencyConvertWrapper span{
    font-weight: bold;
    margin-left: 20px;
}
</style>