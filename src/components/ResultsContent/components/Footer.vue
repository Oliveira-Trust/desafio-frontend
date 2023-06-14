<template>
    <div class="footer">
        <span>{{ count }} registro(s)</span>
        <Pagination></Pagination>
    </div>
</template>

<script>
    import Pagination from '../../shared/Pagination/Pagination.vue';
    export default {
        name: "Footer",
        components: {
            Pagination
        },
        props: {
            count: [Number, undefined],
        }
    }
</script>

<style scoped>
.footer{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer span{
    color: #9b9b9b;
    font-size: 12px;
}
</style>