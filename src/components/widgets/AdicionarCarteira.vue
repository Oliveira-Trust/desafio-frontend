<template>
    <div>
        <div class="d-flex justify-content-between">
            <h3>BTC Carteiras</h3>
            <b-button squared variant="primary"  v-b-modal.modal-adicionar-carteira @click="exibeModal">Adicionar Carteira</b-button>
        </div>
    </div>
</template>

<script>
export default {  
    
    methods: {
        exibeModal() {
            this.$store.state.modal = {titulo: 'Adicionar Carteira'}
        }
    }

}
</script>

<style>



</style>