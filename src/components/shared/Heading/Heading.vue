<template>
    <div class="container">
        <slot></slot>
        <Button v-if="link">{{ link }}</Button>
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
        }
    }
</script>

<style scoped>
.container{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: end;
}
</style>