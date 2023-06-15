<template>
    <div class="modalFooter">
        <Button @click="onClose">Cancelar</Button>
        <Button @click="onClick">Criar</Button>
    </div>
</template>

<script>
    import Button from '../Button/Button.vue';
    export default {
        name: "ModalFooter",
        components:{
            Button
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