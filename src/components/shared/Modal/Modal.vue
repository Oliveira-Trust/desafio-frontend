<template>
    <div class="modal">
        <Paper>
            <div class="modalHeader">
                <h3>Adiconar carteira</h3>
            </div>
            <div class="modalContent">
                <slot></slot>
            </div>
            <div class="modalFooter">
                <Button @click="onClose">Cancelar</Button>
                <Button @click="onClick">Criar</Button>
            </div>
        </Paper>
    </div>
</template>

<script>
    import Paper from '../Paper/Paper.vue';
    import Button from '../Button/Button.vue';
    export default {
        name: "BaseModal",
        components: {
            Paper,
            Button
        },
        computed: {
            amount () {
                return this.$store.state.currency.amount
            },
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
.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
}
.modalHeader{
    margin-bottom: 40px;
}
.modalFooter{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 40px;
}
.modalFooter button+button{
    margin-left: 20px;
}
.modalContent{
    width: 100%;
}
</style>