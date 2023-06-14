<template>
    <Paper>
        <Heading link="Exportar CSV">
            <h4>Carteiras</h4>
        </Heading>
        <span class="divider"></span>
        <List>
            <ListItem
            v-for="wallet in wallets"
            :key="wallet.id"
            :name="wallet.nome"
            :surname="wallet.sobrenome"
            :email="wallet.email"
            :bitcoin="wallet.bitcoin"
        />
        </List>
        <Footer
            :count="pagination.count"
        ></Footer>
    </Paper>
</template>

<script>
    import Heading from '../shared/Heading/Heading.vue';
    import Paper from '../shared/Paper/Paper.vue';
    import List from './components/List.vue';
    import ListItem from './components/ListItem.vue';
    import Footer from './components/Footer.vue';
    export default {
        name: 'Content',
        components: {
            Heading,
            Paper,
            List,
            ListItem,
            Footer
        },
        methods: {
            updatePage(page){
                this.$store.dispatch("fetchWallets", {page});
            }
        },
        computed: {
            wallets () {
                return this.$store.state.wallets
            },
            pagination () {
                return this.$store.state.pagination
            }
       },
       mounted() {
            this.$store.dispatch("fetchWallets", {page: 1});
        }
    }
</script>

<style>
    .divider{
        margin: 30px 0;
    }
</style>