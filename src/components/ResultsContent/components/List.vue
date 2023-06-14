<template>
    <ul>
        <ListDivider />
        <slot></slot>
        <ListDivider />
    </ul>
</template>

<script>
    import ListDivider from './ListDivider.vue';
    export default {
        name: "List",
        components:{
            ListDivider
        }
    }
</script>

<style>
   
</style>