<template>
    <li class="listItem">
        <span>{{ name }}</span>
        <span>{{ surname }}</span>
        <span>{{ email }}</span>
        <span>{{ bitcoin }}</span>
    </li>
</template>

<script>
    export default {
        name: 'ListItem',
        props: {
            name: String,
            surname: String,
            email: String,
            bitcoin: Number
        }
    }
</script>

<style scoped>
.listItem{
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
}
.listItem+.listItem{
    background-color: #f5f6f8;
}
</style>