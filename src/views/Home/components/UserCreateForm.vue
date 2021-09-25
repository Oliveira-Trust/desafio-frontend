<template>
    <div class="modal-container">
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Adicionar carteira</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            @click.prevent="closeModal"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form ref="form" @submit.prevent="submitForm">
                            <div class="row">
                                <div class="col col-12 form-group">
                                    <label>Nome</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Nome"
                                        v-model="form.name"
                                        @focus="clearErrors('name')"
                                        @blur="
                                            validateWithRules('name', [
                                                'required',
                                            ])
                                        "
                                        :class="{
                                            'is-invalid': form.errors.name,
                                        }"
                                    />
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ form.errors.name }}</strong>
                                    </span>
                                </div>
                                <div class="col col-12 form-group">
                                    <label>Sobrenome</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Sobrenome"
                                        v-model="form.lastname"
                                        :class="{
                                            'is-invalid': form.errors.lastname,
                                        }"
                                        @focus="clearErrors('lastname')"
                                        @blur="
                                            validateWithRules('lastname', [
                                                'required',
                                            ])
                                        "
                                    />
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{
                                            form.errors.lastname
                                        }}</strong>
                                    </span>
                                </div>
                                <div class="col col-12 form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="E-mail"
                                        v-model="form.email"
                                        :class="{
                                            'is-invalid': form.errors.email,
                                        }"
                                        @focus="clearErrors('email')"
                                        @blur="
                                            validateWithRules('email', [
                                                'required',
                                                'email',
                                            ])
                                        "
                                    />
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ form.errors.email }}</strong>
                                    </span>
                                </div>
                                <div class="col col-12 col-md-6 form-group">
                                    <label>Valor de compra</label>
                                    <money
                                        class="form-control"
                                        v-bind="money"
                                        v-model="form.value"
                                        :class="{
                                            'is-invalid': form.errors.value,
                                        }"
                                        @focus.native="clearErrors('value')"
                                        @blur.native="
                                            validateWithRules('value', [
                                                'required',
                                            ])
                                        "
                                        @input.native="onInputValue"
                                        :disabled="user !== null"
                                    ></money>
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ form.errors.value }}</strong>
                                    </span>
                                </div>
                                <div class="col col-12 col-md-6 form-group">
                                    <label></label>
                                    <h3>{{ converted }}</h3>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <el-button
                            @click.prevent="clearForm"
                            class="float-right mr-2"
                            type="danger"
                            plain
                            >CANCELAR</el-button
                        >
                        <el-button
                            @click.prevent="submitForm()"
                            :loading="loading"
                            class="float-right"
                            type="info"
                            :icon="
                                user === null
                                    ? 'el-icon-folder-add'
                                    : 'el-icon-refresh-right'
                            "
                            >{{
                                user === null ? 'SALVAR' : 'ATUALIZAR'
                            }}</el-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import validator from '@/utils/validator'
import { Money } from 'v-money'
import http from '@/http'
import axios from 'axios'
import messages from '@/utils/messages'

export default {
    components: {
        Money,
    },
    data() {
        return {
            loading: false,
            loadingConversion: false,
            bitcoinValue: '',
            BTC: 0,
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: '',
                precision: 2,
                maxlength: 12,
                masked: false,
            },
            form: {
                name: '',
                lastname: '',
                email: '',
                value: 0,
                wallet_value: 0,
                errors: {
                    name: '',
                    lastname: '',
                    email: '',
                    value: '',
                },
            },
        }
    },
    computed: {
        ...mapGetters({
            showUserCreateForm: 'components/showUserCreateForm',
            user: 'users/user',
        }),
        converted() {
			const { wallet_value: wv } = this.form
            return new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BTC',
                minimumFractionDigits: 8,
            }).format(wv)
        },
		
    },
    methods: {
        ...mapActions({
            setUser: 'users/setUser',
            setShowUserCreateForm: 'components/setShowUserCreateForm',
        }),
        validateForm() {
            const { form } = this
            const rules = {
                name: ['required'],
                lastname: ['required'],
                email: ['required', 'email'],
                value: this.user === null ? ['required'] : [],
            }
            return validator.validate(form, form.errors, rules)
        },
        closeModal() {
            this.setShowUserCreateForm(false)
        },
        submitForm() {
            if (this.validateForm()) {
                return this.user === null ? this.store() : this.update()
            }
        },
        treatData() {
            const { form } = this
            let data = {
                nome: form.name,
                sobrenome: form.lastname,
                email: form.email,
                endereco: null,
                data_nascimento: null,
                data_abertura: null,
                endereco_carteira: null,
                valor_carteira: form.wallet_value,
            }

            if (this.user !== null) {
                data.valor_carteira = this.user.valor_carteira
            }
            return data
        },
        async store() {
            this.loading = true
            const { storeUser } = http.users
            const data = this.treatData()
            try {
                const req = await storeUser(data)
                this.$emit('register')
                this.$message({
                    message: messages.register,
                    type: 'success',
                })
                this.closeModal()
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        async update() {
            this.loading = true
            const { updateUser } = http.users
            const { id } = this.user
            const data = this.treatData()
            try {
                const req = await updateUser(data, id)
                this.$emit('update')
                this.$message({
                    message: messages.update,
                    type: 'success',
                })
                this.closeModal()
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        upUser() {
            const { user } = this
            if (user !== null && user !== undefined) {
                this.form.name = user.nome
                this.form.lastname = user.sobrenome
                this.form.email = user.email
                this.form.wallet_value = user.valor_carteira
            }
        },
        onInputValue() {
            const { value } = this.form
            this.getConversion(value, true)
        },
        async getConversion(value) {
			const v = value / this.BTC
            this.form.wallet_value = v
        },
        async setValue() {
            try {
                const req = await axios.get(
                    'https://economia.awesomeapi.com.br/last/BTC-BRL'
                )
                let { bid } = req.data.BTCBRL
				this.BTC = bid
            } catch (error) {
                console.error(error)
            }
        },
    },
    async mounted() {
        await this.setValue()
        this.upUser()
    },
    beforeDestroy() {
        this.setUser(null)
    },
}
</script>

<style lang="scss">
.form-group {
    h3 {
        word-break: break-word;
        font-size: 1.5rem;
        line-height: 35px;
        padding: 0;
        margin-top: 0;
        margin-top: 0.5rem;
    }
}
</style>