<template>
    <Paper>
        <div class="inputsWrapper">
            <BaseInput v-model="name" placeholder="Nome" />
            <BaseInput v-model="surname" placeholder="Sobrenome" />
            <BaseInput v-model="email" placeholder="E-mail" />
            <span class="divider"></span>
            <Button>Buscar</Button>
        </div>
    </Paper>
</template>

<script>
    import Paper from '../shared/Paper/Paper.vue';
    import BaseInput from '../shared/Input/Input.vue';
    import Button from '../shared/Button/Button.vue';
    export default {
        components: {
            BaseInput,
            Paper,
            Button
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
.divider{
    display: block;
    margin: 0px 5px;
}
.inputsWrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;    
}
</style>

