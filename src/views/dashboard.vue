<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <div class="title">BTC Carteira</div>
            <div>
                <ot-button>Adicionar Carteira</ot-button>
            </div>
        </div>
        <div class="card flex justify-between items-center">
            <div class="search-input">
                <ot-input placeholder-text="Nome" v-model="name" />
            </div>
            <div class="search-input">
                <ot-input placeholder-text="Sobrenome" v-model="surname" />
            </div>
            <div class="search-input">
                <ot-input placeholder-text="E-mail" v-model="email" />
            </div>
            <div class="flex justify-end">
                <ot-button
                    @click="(getUsersList(), resetPage())"
                    :loading="loadMore"
                    variant="ot-blue-outline"
                >
                    <font-awesome-icon class="icon" icon="search" />Buscar
                </ot-button>
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
            <div slot="action-btn">Editar e Deletar</div>
        </ot-table>
    </div>
</template>

<script>
import { appendQueryString } from '@/utils/';
import { mapActions, mapState } from "vuex";
export default {
    name: 'Dashboard',
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
                value: 'action-btn',
                label: ''
            },
        ],
        email: '',
        name: '',
        surname: '',
        activePage: 1,
        modal: false,
        loading: false,
        loadMore: false,
    }),
    async created () {
        this.loading = !this.loading
        await this.getUsersList();
        this.loading = !this.loading
    },
    methods: {
        ...mapActions('users', ['getUsers']),
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
    width: 27%;
}
</style>