<template>
    <span
        class="divider"
        :class='{small: small}'
        >
        </span>
</template>

<script>
    export default {
        name: "Divider",
        props: {
            small: Boolean
        }
    }
</script>

<style>
    .divider{
        margin: 30px;
        display: block;
    }
    .small{
        margin: 10px;
    }
</style>