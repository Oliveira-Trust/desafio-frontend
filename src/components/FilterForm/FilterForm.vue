<template>
    <Paper>
        <div class="inputsWrapper">
            <BaseInput v-model="name" placeholder="Nome" />
            <Divider small />
            <BaseInput v-model="surname" placeholder="Sobrenome" />
            <Divider small />
            <BaseInput v-model="email" placeholder="E-mail" />
            <Divider small />
            <Button>Buscar</Button>
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
                name: '',
                surname: '',
                email: ''
            }
        }       
    }
</script>

<style scoped>
.inputsWrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;    
}
</style>

