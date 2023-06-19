<template>
    <div class="modalFooter">
        <BaseButton outline @click="onClose">Cancelar</BaseButton>
        <BaseButton inverse @click="onClick">Adicionar</BaseButton>
    </div>
</template>

<script>
    import BaseButton from '../Button/Button.vue';
    export default {
        name: "ModalFooter",
        components:{
            BaseButton
        },
        methods: {
            onClick(){
                this.$emit('onClick')
            },
            onClose(){
                this.$emit('onClose')
            },
        }
    }
</script>

<style scoped>
.modalFooter{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 40px;
}
.modalFooter button+button{
    margin-left: 20px;
}
</style>