<template>
    <BaseModal
    >
        <div class="content">
           <h5>Excluir Carteira</h5>
           <p>Tem certeza que deseja excluir essa Carteira?</p>
           <p>Esta ação não poderá ser desfeita</p> 
        </div>
        <div class="footer">
            <Button @click="onDelete">Excluir</Button>
            <Button @click="onClose">Cancelar</Button>
        </div>
    </BaseModal>
</template>

<script>
    import BaseModal from '../../shared/Modal/Modal.vue';
    import Button from '../../shared/Button/Button.vue';
    export default {
        name: "DeleteWalletModal",
        components: {
            BaseModal,
            Button
        },
        props:{
            id: Number
        },
        methods: {
            onDelete(){
                const body = {
                    id: this.id
                }
                this.$store.dispatch("deleteWallet", body)
                this.onClose()
            },
            onClose(){
                this.$emit('onClose')
            },
        },
    }
</script>

<style scoped>
.content{
    text-align: center;
    margin-bottom: 10px;
}
.content h5{
    margin-bottom: 10px;
    font-size: 18px;
}
.content p{
    font-size: 14px;
}
.footer{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.footer button{
    flex: 1;
}
.footer button+button{
    margin-top: 10px;
}
</style>