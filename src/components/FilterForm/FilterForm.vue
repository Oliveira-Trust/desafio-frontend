<template>
    <Paper>
        <div class="inputsWrapper">
            <BaseInput
                @update:modelValue="newValue => name = newValue"
                v-model="name"
                placeholder="Nome"
            />
            <Divider small />
            <BaseInput
                @update:modelValue="newValue => surname = newValue"
                v-model="surname"
                placeholder="Sobrenome"
            />
            <Divider small />
            <BaseInput
                @update:modelValue="newValue => email = newValue"
                v-model="email"
                placeholder="E-mail"
            />
            <Divider small />
            <Button @click="onClick">Buscar</Button>
        </div>
    </Paper>
</template>

<script>
    import Paper from '../shared/Paper/Paper.vue';
    import BaseInput from '../shared/Input/Input.vue';
    import Button from '../shared/Button/Button.vue';
    import Divider from '../shared/Divider/Divider.vue'
    export default {
        components: {
            BaseInput,
            Paper,
            Button,
            Divider
        },
        data(){
            return {
                name: null,
                surname: null,
                email: null
            }
        },
        methods: {
            onClick(){
                const body = {
                    nome: this.name,
                    sobrenome: this.surname,
                    email: this.email
                }
                this.$store.dispatch("searchWallet", body);
            }
        },       
    }
</script>

<style scoped>
.inputsWrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;    
}
</style>

