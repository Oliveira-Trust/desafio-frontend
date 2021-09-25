<template>
    <div class="card card-body">
        <h5>Filtros</h5>

        <form @submit.prevent="search">
            <div class="row">
                <div class="col col-12 col-md-4 form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nome"
						v-model="form.name"
                    />
                </div>
                <div class="col col-12 col-md-4 form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="E-mail"
						v-model="form.email"
                    />
                </div>
                <div class="col col-12 col-md-4 form-group">
                    <input
                        type="date"
                        class="form-control"
                        placeholder="Data de nascimento"
						v-model="form.birthDate"
                    />
                </div>
                <div class="col col-12 form-group">
					<el-button @click.prevent="search" :loading="loading" class="float-right" type="info" icon="el-icon-search">Pesquisar</el-button>
					<el-button @click.prevent="clearForm" class="float-right mr-2">Limpar</el-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import http from '@/http'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
			loading: false,
            form: {
                name: '',
                email: '',
                birthDate: '',
            },
        }
    },
	computed: {
		...mapGetters({
			user: 'users/user',
			userSearch: 'users/userSearch',
			userCollection: 'users/userCollection',
		})
	},
    methods: {
		...mapActions({
			setUser: 'users/setUser',
			setUserSearch: 'users/setUserSearch',
			setUserCollection: 'users/setUserCollection',
		}),
		clearForm() {
			Object.entries(this.form).map(([k,v]) => {
				this.form[k] = ''
			})
		},
        async search() {
			this.loading = true
            const { getUsers } = http.users
			this.setUserCollection(null)
            try {
                const req = await getUsers()

                this.setUserSearch(this.form)

				if (Array.isArray(req) && req.length > 0) {
					this.setUserCollection(req)
				} else {
					this.userCollection('-')
				}
				
            } catch (error) {
                console.error(error)
            }
			this.loading = false
        },
    },
}
</script>

<style>
</style>