<template>
    <div class="button-container">
        <button class="button">{{ label }}</button>
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        label: String
  },
}
</script>

<style scoped lang="scss">
    .button-container {
        .button {
            color: #2d7bff;
            border: 1px solid #2d7bff;
            border-radius: 4px;
            height: 40px;
            width: 113px;
        }
    }
</style>