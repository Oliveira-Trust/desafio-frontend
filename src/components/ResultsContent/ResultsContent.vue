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
            v-if="isOpenEditModal"
            @onClose="closeEditModal"
            :initialParams="initialParams"
        />
        <DeleteWalletModal
            v-if="isOpenDeleteModal"
            :id="idToDelete"
            @onClose="closeDeleteModal"
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
    import DeleteWalletModal from './components/DeleteWalletModal.vue';
    export default {
        name: 'Content',
        components: {
            Heading,
            Paper,
            List,
            ListItem,
            Footer,
            EditWalletModal,
            DeleteWalletModal
        },
        data(){
            return {
                isOpenEditModal: false,
                isOpenDeleteModal: false,
                idToDelete: undefined,
                initialParams: {}
            }
        },
        methods: {
            openEditModal(){
                this.isOpenEditModal = true
            },
            closeEditModal(){
                this.isOpenEditModal = false
            },
            openDeleteModal(){
                this.isOpenDeleteModal = true
            },
            closeDeleteModal(){
                this.isOpenDeleteModal = false
            },
            updatePage(page){
                this.$store.dispatch("fetchWallets", {page});
            },
            onEdit(wallet){
                this.initialParams = wallet
                this.isOpenEditModal = true
            },
            onDelete(id){
                this.idToDelete = id;
                this.isOpenDeleteModal = true
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