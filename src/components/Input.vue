<template>
    <div class="input-container">
        <input
            class="input"
            v-bind:v-model="inputValue"
            v-on:input="$emit('input', $event.target.value)"
            :value="inputValue"
            :type="inputType"
            :placeholder="inputLabel"
        />
        <label for="">{{ inputLabel }}</label>
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        inputValue: String,
        inputType: String,
        inputLabel: String
  },
}
</script>

<style lang="scss" scoped>

    .input-container {
        display: flex;
        flex-flow: column-reverse;
        justify-content: center;
        padding-left: 10px;
        width: 100%;
        box-sizing: border-box;
        height: 42px;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        margin-right: 10px;

        &:hover {
            border-color:#2d7bff;
            cursor: pointer;
        }

        &:focus-within {
            border-color:#2d7bff;
        }

        input {
            font-size: 14px;
            cursor: pointer;

            &:focus {
                outline: none;
            }

            &::placeholder {
                font-size: 14px;
            }

            &:focus::placeholder {
                color: transparent;
            }

            &:focus + label {
                display: block;
                color:#2d7bff;
                font-size: 11px;
                font-weight: 600;
            }

            &:not(:placeholder-shown) + label {
                display: block;
                color:#2d7bff;
                font-size: 11px;
                font-weight: 600;
            }

            &:not(:placeholder-shown) + .input-container {
                border-color:#2d7bff;
            }
        }

        label {
            display: none;
        }
    }

</style>
