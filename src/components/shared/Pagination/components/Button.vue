<template>
    <button
    class="paginationButton"
    :class='{isActive: active}'
    @click="onClickButton"
    >
        {{ page }}
    </button>
</template>

<script>
    export default {
        name: "PaginationButton",
        props: {
            page: {
                type: Number,
                required: true
            },
            active: {
                type: Boolean,
                required: false
            }
        },
        methods: {
            onClickButton(){
                this.$emit('onClick', this.page)
            }
        }
    }
</script>

<style scoped>
    .paginationButton{
        border: 1px solid #e9e9e9;
        padding: 5px 7px;
        background-color: #fff;
        border-radius: 3px;
        color: #9b9b9b;
    }
    .paginationButton+.paginationButton{
        margin-left: 5px;
    }
    .isActive{
        background-color: var(--primary-color);
        color: #fff;
        font-weight: bold;
    }
</style>