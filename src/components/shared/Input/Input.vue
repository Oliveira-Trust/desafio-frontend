<template>
    <input
        class="input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$event=>$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
    export default {
        name: "BaseInput",
        props:{
            placeholder: String,
            modelValue: String
        },
        emits: ['update:modelValue']
    }
</script>

<style scoped>
    .input{
        border-radius: 3px;
        border: 1px solid #e9e9e9;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
    }
    .input:focus{
        outline: none;
        border-color: var(--primary-color);
    }
</style>