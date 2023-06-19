<template>
    <div class="listHeader">
        <span>Nome</span>
        <span>Sobrenome</span>
        <span>Email</span>
        <span>Bitcoin</span>
        <span></span>
    </div>
</template>

<script>
    export default {
        name: 'ListHeader',
        props: {
            
        },
        methods: {
            
        }
    }
</script>

<style scoped>
.listHeader{
    display: grid;
    grid-template-columns:  repeat(5, 1fr); 
    margin-bottom: 10px;   
}
.listHeader span{
    flex: 1;
    text-align: left;
    font-size: 18px;
    font-weight: bolder;
}
</style>