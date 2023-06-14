<template>
    <input
        class="input"
        :placeholder="placeholder"
        :value="modelvalue"
        @input="$emit('update:modelvalue', $event.target.value)"
    />
</template>

<script>
    export default {
        name: "BaseInput",
        props:{
            placeholder: String,
            modelvalue: String
        },
        emits: ['update:modelvalue']
    }
</script>

<style scoped>
    .input{
        border-radius: 3px;
        border: 1px solid #e9e9e9;
        padding: 10px;
        width: 100%;
    }
    .input:focus{
        outline: none;
        border-color: var(--primary-color);
    }
    .input+.input{
        margin-left: 10px;
    }
</style>