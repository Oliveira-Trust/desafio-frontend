<template>
    <button @click="click" class="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        methods: {
            click(){
                this.$emit('click')
            }
        }
    }
</script>

<style>
.button{
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-weight: 600;
    background-color: #fff;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;
}
</style>