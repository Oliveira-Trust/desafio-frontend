<template>
    <div class="paper">
        <slot></slot>
    </div>
</template>

<script>
    export default{
        name: "Paper"
    }
</script>

<style>
.paper{
    background-color: #fff;
    padding: 15px 20px;
    border-radius: 3px;
    box-shadow: 2px 2px 5px 0px rgb(184, 184, 184);
}
</style>