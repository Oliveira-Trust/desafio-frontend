<template>
    <div class="modal">
        <Paper>
            <div class="modalContent">
                <slot></slot>
            </div>
        </Paper>
    </div>
</template>

<script>
    import Paper from '../Paper/Paper.vue';
    export default {
        name: "BaseModal",
        components: {
            Paper
        },
        computed: {
            amount () {
                return this.$store.state.currency.amount
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
.modalContent{
    width: 100%;
}
</style>