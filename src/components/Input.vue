<template>
    <div class="input-container flex flex-col">
        <input
            class="input"
            v-bind:v-model="inputValue"
            :value="inputValue"
            :type="inputType"
            :placeholder="inputPlaceholder"
        />
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        inputValue: String,
        inputType: String,
        inputPlaceholder: String
  },
}
</script>

<style lang="scss" scoped>

    .input-container {
        input {
            box-sizing: border-box;
            padding: 10px;
            height: 42px;
            border: 1px solid #d8d8d8;
            border-radius: 4px;
            margin-right: 10px;
        }
    }

</style>
