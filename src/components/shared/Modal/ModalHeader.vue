<template>
    <div class="modalHeader">
        <slot></slot>
    </div>
</template>

<script>
    export default{
        name: 'ModalHeader'
    }
</script>

<style scoped>
    .modalHeader{
        margin-bottom: 30px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--gray-light);
    }
</style>