<template>
    <div class="wrapper">
        <PaginationButton
            v-if="pagination.actual != 1"
            :page="pagination.first"
            @onClick="updatePage"
        >
        </PaginationButton>
        <PaginationButton
            v-if="pagination.previous"
            :page="pagination.previous"
            @onClick="updatePage"
        >
        </PaginationButton>
        <PaginationButton
            v-if="pagination.actual"
            :page="pagination.actual"
            @onClick="updatePage"
            active
        >
        </PaginationButton>
        <PaginationButton
            v-if="pagination.next"
            :page="pagination.next"
            @onClick="updatePage"
        >
        </PaginationButton>
        <span v-if="pagination.next && pagination.next != pagination.last">...</span>
        <PaginationButton
            v-if="pagination.actual != pagination.last && pagination.next != pagination.last"
            :page="pagination.last"
            @onClick="updatePage"
        >
        </PaginationButton>
    </div>
</template>

<script>
    import PaginationButton from './components/Button.vue';
    export default {
        name: "Pagination",
        components: {
            PaginationButton
        },
        computed: {
            pagination () {
                return this.$store.state.wallets.pagination
            }
       },
       data(){
        return {
            actualPage: this.$store.state.wallets.pagination.actual
        }
       },
       methods: {
            updatePage(page){
                this.$store.dispatch("fetchWallets", {page});
            }
        }
    }
</script>

<style scoped>
.wrapper{
    display: flex;
}
</style>