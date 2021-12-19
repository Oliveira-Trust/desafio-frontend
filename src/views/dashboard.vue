<template>
    <div>
        <managerUser
            :user="selectUser"
            :show="modal"
            @close="modal = false"
            @reload-table="getUsersList"
        />
        <deleteUser
            :userId="userId"
            :show="modalDelete"
            @close="modalDelete = false"
            @reload-table="getUsersList"
        />
        <exportCsv :show="modalCsv" @close="modalCsv = false" @reload-table="getUsersList" />
        <div class="flex justify-between items-center mb-8">
            <div class="title">BTC Carteira</div>
            <div>
                <ot-button :loading="loadMore" @click="openModal">Adicionar Carteira</ot-button>
            </div>
        </div>
        <div class="card input-container">
            <div class="search-input">
                <ot-input
                    @enter="(getUsersList(), resetPage())"
                    placeholder-text="Nome"
                    v-model="name"
                />
            </div>
            <div class="search-input">
                <ot-input
                    @enter="(getUsersList(), resetPage())"
                    placeholder-text="Sobrenome"
                    v-model="surname"
                />
            </div>
            <div class="search-input">
                <ot-input
                    @enter="(getUsersList(), resetPage())"
                    placeholder-text="E-mail"
                    v-model="email"
                />
            </div>
            <div class="flex justify-end">
                <ot-button
                    @click="(getUsersList(), resetPage())"
                    :loading="loadMore"
                    variant="ot-blue-outline"
                    class="mr-5"
                >
                    <font-awesome-icon class="icon" icon="search" />Buscar
                </ot-button>
                <ot-button @click="clearFilters" :loading="loadMore" variant="ot-blue-outline">
                    <font-awesome-icon class="icon" icon="clear" />Limpar
                </ot-button>
            </div>
        </div>
        <div class="card">
            <div class="flex justify-between items-center">
                <div class="title-table">Carteiras</div>
                <div>
                    <ot-button @click="modalCsv = true" variant="ot-blue-outline">Exportar CSV</ot-button>
                </div>
            </div>
            <ot-table
                :headers="headers"
                :items="usersList.results"
                :totalOfItems="usersList.total"
                :pages="usersList.count"
                :loading="loading"
                @select-page="activePage = $event"
                :activePage="activePage"
            >
                <template v-slot:actionBtn="{ item }">
                    <div class="flex justify-around">
                        <font-awesome-icon
                            @click="openModal(item)"
                            class="action-icon"
                            icon="pencil-alt"
                        />
                        <font-awesome-icon
                            @click="openModalDeleteUser(item.id)"
                            class="action-icon"
                            icon="trash"
                        />
                    </div>
                </template>
            </ot-table>
        </div>
    </div>
</template>

<script>
import { appendQueryString } from '@/utils/';
import { mapActions, mapState } from "vuex";
import managerUser from "@/components/dashboard/modal/manager-user"
import deleteUser from "@/components/dashboard/modal/delete-user"
import exportCsv from "@/components/dashboard/modal/export-csv"
export default {
    name: 'Dashboard',
    components: {
        managerUser,
        deleteUser,
        exportCsv
    },
    data: () => ({
        rules: {
            type: 'email',
            required: true,
            name: 'E-mail'
        },
        headers: [
            {
                value: 'nome',
                label: 'Nome'
            },
            {
                value: 'sobrenome',
                label: 'Sobrenome'
            },
            {
                value: 'email',
                label: 'E-mail'
            },
            {
                value: 'valorCarteira',
                label: 'Bitcoin'
            },
            {
                value: 'actionBtn',
                label: ''
            },
        ],
        email: '',
        name: '',
        surname: '',
        activePage: 1,
        userId: 1,
        modal: false,
        loading: false,
        loadMore: false,
        selectUser: false,
        modalDelete: false,
        modalCsv: false,
    }),
    async created () {
        this.loading = !this.loading
        await this.getUsersList();
        this.loading = !this.loading
    },
    methods: {
        ...mapActions('users', ['getUsers', 'exportUserCsv']),
        async getUsersList () {
            this.loadMore = !this.loadMore
            try {
                const queriesStrings = await this.prepareQueriesStrings();
                await this.getUsers(queriesStrings);
            } catch (error) {
                console.error({ text: 'Erro ao fazer a chamada de usuários', type: 'error' });
            } finally {
                this.loadMore = !this.loadMore
            }

        },
        async prepareQueriesStrings () {
            let queriesStrings = appendQueryString('', '_limit=10');
            // creates the search filter, based on cascade
            if (this.email.length) {
                queriesStrings = appendQueryString(queriesStrings, `email_like=${this.email}`);
            }

            if (this.name.length) {
                queriesStrings = appendQueryString(queriesStrings, `nome_like=${this.name}`);
            }
            if (this.surname.length) {
                queriesStrings = appendQueryString(queriesStrings, `sobrenome_like=${this.surname}`);
            }

            if (this.activePage) {
                queriesStrings = appendQueryString(queriesStrings, `_page=${this.activePage}`);
            }

            return queriesStrings;
        },
        resetPage () {
            this.activePage = 1;
        },
        openModal (user = false) {
            if (user) {
                this.selectUser = user;
            } else {
                this.selectUser = false;
            }
            this.modal = true;
        },
        openModalDeleteUser (id) {
            this.userId = id;
            this.modalDelete = true;
        },
        async clearFilters () {
            this.email = ''
            this.name = ''
            this.surname = ''
            await this.getUsersList();
        }
    },
    computed: {
        ...mapState('users', ['usersList'])
    },
    watch: {
        async activePage () {
            await this.getUsersList();
        }
    }

}
</script>

<style lang="scss" scoped>
.title {
    font-size: 22px;
    font-weight: bold;
}

.title {
    font-size: 22px;
    font-weight: bold;
}
.icon {
    margin-right: 10px;
}
.card {
    border: 1px #fff solid;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0px 3px 6px #00000029;
    padding: 15px;
    margin-bottom: 30px;
}
.search-input {
    width: 22%;
}
.input-container {
    @apply flex justify-between items-center;
    @media screen and (max-width: 992px) {
        @apply grid grid-cols-1;
    }
}
.title-table {
    font-weight: bold;
}
.action-icon {
    cursor: pointer;
}
@media screen and (max-width: 992px) {
    .search-input {
        width: 100% !important;
        margin-bottom: 25px;
    }
}
</style>