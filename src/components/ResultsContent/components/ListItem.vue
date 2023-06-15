<template>
    <li class="listItem">
        <span>{{ name }}</span>
        <span>{{ surname }}</span>
        <span>{{ email }}</span>
        <span>{{ currency }}</span>
        <div class="icons">
            <v-icon @click="onEdit" name="pencil-alt"></v-icon>
            <v-icon @click="onDelete" name="trash"></v-icon>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'ListItem',
        props: {
            name: String,
            surname: String,
            email: String,
            currency: Number,
            id: Number
        },
        methods: {
            onEdit(){
                this.$emit('onEdit', this.$props)
            },
            onDelete(){
                this.$emit('onDelete', this.id)
            }
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
.listItem span{
    flex: 1;
    text-align: left;
}
.listItem:nth-child(odd){
    background-color: #f5f6f8;
}
.icons svg{
    cursor: pointer;
}
.icons svg+svg{
    margin-left: 30px;
}
</style>