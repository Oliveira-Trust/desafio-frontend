<template>
    <div class="button-container">
        <button :class="buttonClass">
            <font-awesome-icon v-if="hasIcon" icon="fa-solid fa-magnifying-glass" />
            {{ label }}
        </button>
        
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        label: String,
        hasIcon: Boolean,
        buttonClass: String
  },
}
</script>

<style scoped lang="scss">
    .button-container {

        button {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            max-height: 42px;
            border-radius: 4px;
            padding: 15px 30px;
            font-weight: 600;
        }

        .btn-outline {
            color: #2d7bff;
            border: 1px solid #2d7bff;
        }

        .btn-color {
            background-color: #2d7bff;
            color: #fff;
        }
    }
</style>