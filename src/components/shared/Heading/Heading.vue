<template>
    <div class="container">
        <h1>{{ text }}</h1>
        <Button>{{ link }}</Button>
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
}
</style>