<template>
    <div class="headingWrapper">
        <slot></slot>
        <BaseButton
            v-if="actionLabel"
            @click="onClickButton"
            :inverse="inverse"
        >
            {{ actionLabel }}
        </BaseButton>
    </div>
</template>

<script>
    import BaseButton from '../Button/Button.vue';
    export default {
        name: "Heading",
        components: {
            BaseButton
        },
        props: {
            text: String,
            actionLabel: String,
            inverse: Boolean
        },
        methods: {
            onClickButton(){
                this.$emit('onClick')
            }
        }
    }
</script>

<style scoped>
.headingWrapper{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: end;
}
</style>