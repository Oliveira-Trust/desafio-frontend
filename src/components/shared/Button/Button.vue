<template>
    <button
        @click="click"
        class="button"
        :class="{
            outline: outline,
            inverse: inverse,
            alert: alert
        }"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "BaseButton",
        methods: {
            click(){
                this.$emit('click')
            }
        },
        props:{
            outline: Boolean,
            inverse: Boolean,
            alert: Boolean
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
.outline{
    border: none;
}
.inverse{
    background-color: var(--primary-color);
    color: #fff;
}
.alert{
    background-color: var(--alert);
    border-color: var(--alert);
    color: #fff;
}
</style>