<template>
    <div>
        <ot-table
            :headers="headers"
            :items="usersList.results"
            :totalOfItems="usersList.total"
            :pages="usersList.count"
            :loading="loading"
            @select-page="activePage = $event"
            :activePage="activePage"
        />
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
        ],
        email: '',
        name: '',
        surname: '',
        activePage: 1,
        modal: false,
        loading: false,
    }),
    async created () {
        this.loading = !this.loading
        await this.getUsersList();
        this.loading = !this.loading
    },
    methods: {
        ...mapActions('users', ['getUsers']),
        async getUsersList () {
            try {
                const queriesStrings = await this.prepareQueriesStrings();
                await this.getUsers(queriesStrings);
            } catch (error) {
                console.error({ text: 'Erro ao fazer a chamada de usuários', type: 'error' });
            }

        },
        async prepareQueriesStrings () {
            let queriesStrings = '';

            if (this.email.length) {
                queriesStrings = appendQueryString(queriesStrings, `_email=${this.email}`);
            }

            if (this.name.length) {
                queriesStrings = appendQueryString(queriesStrings, `_nome=${this.name}`);
            }
            if (this.surname.length) {
                queriesStrings = appendQueryString(queriesStrings, `_sobrenome=${this.surname}`);
            }

            if (this.activePage) {
                queriesStrings = appendQueryString(queriesStrings, `_page=${this.activePage}`);
            }

            return queriesStrings;
        },
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

<style>
</style>