<template>
    <div class="headingWrapper">
        <slot></slot>
        <Button
            v-if="link"
            @click="onClickButton"
        >
            {{ link }}
        </Button>
    </div>
</template>

<script>
    import Button from '../Button/Button.vue';
    export default {
        name: "Heading",
        components: {
            Button
        },
        props: {
            text: String,
            link: String
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