<template>
    <div class="footer">
        <span>{{ count }} registro(s)</span>
        <button @click="onClickButton">Next Page</button>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        props: {
            count: Number
        },
        methods: {
            onClickButton(){
                this.$emit('onClick', 2)
            }
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