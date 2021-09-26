<template>
    <div class="card card-body">
        <h5>Filtros</h5>

        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col col-12 col-md-4 form-group">
                    <label>Nome</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nome"
                        v-model="form.name"
                        @focus="clearErrors('name')"
                        :class="{
                            'is-invalid': form.errors.name,
                        }"
                    />
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ form.errors.name }}</strong>
                    </span>
                </div>
                <div class="col col-12 col-md-4 form-group">
                    <label>E-mail</label>
                    <input
                        type="email"
                        class="form-control"
                        placeholder="E-mail"
                        v-model="form.email"
                        :class="{
                            'is-invalid': form.errors.email,
                        }"
                        @focus="clearErrors('email')"
                    />
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ form.errors.email }}</strong>
                    </span>
                </div>
                <div class="col col-12 col-md-4 form-group">
                    <label>Data de cadastro</label>
                    <input
                        type="date"
                        class="form-control"
                        placeholder="Data de nascimento"
                        v-model="form.openDate"
						@focus="clearErrors('openDate')"
                        :class="{
                            'is-invalid': form.errors.openDate,
                        }"
                    />
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ form.errors.openDate }}</strong>
                    </span>
                </div>
                <div class="col col-12 form-group">
                    <el-button
                        @click.prevent="submitForm"
                        :loading="loading"
                        class="float-right"
                        type="info"
                        icon="el-icon-search"
                        >Pesquisar</el-button
                    >
                    <el-button
                        @click.prevent="clearForm"
                        class="float-right mr-2"
                        >Limpar</el-button
                    >
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import http from '@/http'
import { mapActions, mapGetters } from 'vuex'
import validator from '@/utils/validator'
import messages from '@/utils/messages'

export default {
    data() {
        return {
            loading: false,
            form: {
                name: '',
                email: '',
                openDate: '',
                errors: {
                    name: '',
                    email: '',
                    openDate: '',
                },
            },
        }
    },
    computed: {
        ...mapGetters({
            user: 'users/user',
            userSearch: 'users/userSearch',
            userCollection: 'users/userCollection',
        }),
    },
    methods: {
        ...mapActions({
            setUser: 'users/setUser',
            setUserSearch: 'users/setUserSearch',
            setUserCollection: 'users/setUserCollection',
        }),
        clearForm() {
            Object.entries(this.form).map(([k, v]) => {
                if (k !== 'errors') {
					this.form[k] = ''
				}
            })
        },
        searchQuery() {
            let query = ''
            let filter = []
            const { name: n, email: e, openDate: bd } = this.form

            if (n !== '') {
                filter.push('q=' + n)
            }
            if (e !== '') {
                filter.push('q=' + e)
            }
            if (bd !== '') {
                filter.push('q=' + bd)
            }

            if (filter.length > 0) {
                query = '&' + filter.join('&')
            }

            return query
        },
        validateForm() {
            const { form } = this
            const rules = {
                email: ['email'],
                openDate: ['currentDate', 'minDate'],
            }
            return validator.validate(form, form.errors, rules)
        },
        submitForm() {
            if (this.validateForm()) {
                return this.search()
            }
        },
        async search() {
            this.loading = true
            const { getUsers } = http.users
            this.setUserCollection(null)
            const query = this.searchQuery()
            try {
                const req = await getUsers(query)

                this.setUserSearch(this.form)

                if (Array.isArray(req) && req.length > 0) {
                    this.setUserCollection(req)
                } else {
					this.$message({
						message: messages.searchReturnError,
						type: 'warning'
					})
                    this.setUserCollection('-')
                }
            } catch (error) {
                this.userCollection('-')
                console.error(error)
            }
            this.loading = false
        },
    },
}
</script>

<style>
</style>