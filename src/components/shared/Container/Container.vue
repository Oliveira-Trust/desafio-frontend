<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Container"
    }
</script>

<style scoped>
    .container{
        padding: 0 50px;
    }
</style>
