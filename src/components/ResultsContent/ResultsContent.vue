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
            :id="wallet.id"
            :name="wallet.nome"
            :surname="wallet.sobrenome"
            :email="wallet.email"
            :currency="wallet.valor_carteira"
            @onEdit="onEdit"
            @onDelete="onDelete"
        />
        </List>
        <Footer
            :count="pagination.count"
        ></Footer>
        <EditWalletModal
            v-if="isOpenModal"
            @onClose="closeModal"
            :initialParams="initialParams"
        />
    </Paper>
</template>

<script>
    import Heading from '../shared/Heading/Heading.vue';
    import Paper from '../shared/Paper/Paper.vue';
    import List from './components/List.vue';
    import ListItem from './components/ListItem.vue';
    import Footer from './components/Footer.vue';
    import EditWalletModal from './components/EditWalletModa.vue';
    export default {
        name: 'Content',
        components: {
            Heading,
            Paper,
            List,
            ListItem,
            Footer,
            EditWalletModal
        },
        data(){
            return {
                isOpenModal: false,
                initialParams: {}
            }
        },
        methods: {
            openModal(){
                this.isOpenModal = true
            },
            closeModal(){
                this.isOpenModal = false
            },
            updatePage(page){
                this.$store.dispatch("fetchWallets", {page});
            },
            onEdit(wallet){
                this.initialParams = wallet
                this.isOpenModal = true
            },
            onDelete(id){
                console.log(id)
            }            
        },
        computed: {
            wallets () {
                return this.$store.state.wallets.wallets
            },
            pagination () {
                return this.$store.state.wallets.pagination
            }
       },
       mounted() {
            this.$store.dispatch("fetchWallets", {page: 1});
        }
    }
</script>