<template>
    <ot-modal :show="show">
        <div class="container-box" slot="body">
            <div class="flex title">{{ title }} Carteira</div>
            <div class="division">
                <div class="line"></div>
            </div>
            <div class="input-componet">
                <ot-input
                    :valid="isValidForm"
                    :rules="rules.nome"
                    v-model="form.nome"
                    placeholder-text="Nome"
                    @valid="rules.nome.valid = $event"
                />
            </div>
            <div class="input-componet">
                <ot-input
                    :valid="isValidForm"
                    v-model="form.sobrenome"
                    :rules="rules.sobrenome"
                    placeholder-text="Sobrenome"
                    @valid="rules.sobrenome.valid = $event"
                />
            </div>
            <div class="input-componet">
                <ot-input
                    :valid="isValidForm"
                    v-model="form.email"
                    :rules="rules.email"
                    placeholder-text="E-mail"
                    @valid="rules.email.valid = $event"
                />
            </div>
            <div class="input-componet flex justify-start items-center">
                <ot-input
                    :valid="isValidForm"
                    inputType="text"
                    v-model="form.valueBrl"
                    :rules="rules.valueBrl"
                    placeholder-text="Valor de Compra"
                    hasMoney
                    @valid="rules.valueBrl.valid = $event"
                />
                <div class="bitcoin">BTC {{ bitcoin }}</div>
            </div>
        </div>
        <div class="flex justify-end" slot="footer">
            <ot-button
                :disabled="loading"
                class="mr-5"
                @click="$emit('close')"
                variant="ot-blue-outline"
            >Cancelar</ot-button>
            <ot-button
                :disabled="!validationForm"
                :loading="loading"
                @click="validateForm"
            >Adicionar</ot-button>
        </div>
    </ot-modal>
</template>

<script>
import { getBtcToBrlValue } from '@/services/coins';
import { convertBrlInNumber, convertBtcToNumber } from '@/utils';
import { mapActions } from 'vuex';
export default {
    name: 'managerUser',
    props: {
        user: {
            type: [Boolean, Object],
            default: false
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        form: {
            nome: '',
            sobrenome: '',
            email: '',
            valueBrl: '',
            valorCarteira: 0
        },
        rules: {
            nome: {
                required: true,
                type: 'text',
                valid: true,
                length: 3,
                name: 'Nome'
            },
            sobrenome: {
                required: true,
                type: 'text',
                valid: true,
                length: 3,
                name: 'Sobrenome'
            },
            email: {
                required: true,
                type: 'email',
                valid: true,
                name: 'E-mail'
            },
            valueBrl: {
                required: true,
                type: 'text',
                valid: true,
                name: 'Valor da Carteira'
            },
        },
        bitcoinValue: 0,
        valueBrl: 0,
        loading: false,
        isValidForm: false,
    }),
    async created () {
        const value = await getBtcToBrlValue();
        this.bitcoinValue = value;
    },
    methods: {
        ...mapActions('users', ['updateUser', 'createUser']),
        ...mapActions('notification', ['showNotification']),
        async validateForm () {
            // Let's ask the input component if it follows the validation rules
            this.isValidForm = !this.isValidForm
            // set timeout for components to respond in time
            await setTimeout(() => { }, 500)
            if (this.validationForm) {
                await this.actionRequest();
            }
        },
        async actionRequest () {
            this.loading = !this.loading;
            try {
                const user = this.makePost();
                if (this.user) {
                    await this.updateUser(user);
                } else {
                    await this.createUser(user);
                }
                this.showNotification({ message: `Usuário ${this.message} com sucesso`, type: 'success' })
            } catch (e) {
                this.showNotification({ message: 'Um erro aconteceu', type: 'error' });
            } finally {
                this.loading = !this.loading;
                this.$emit('reload-table');
                this.$emit('close');
            }
        },
        makePost () {
            const data = { ...this.form };
            delete data.valueBrl;
            return {
                ...data,
                valorCarteira: this.bitcoin
            }
        },
    },
    computed: {
        title () {
            return this.user ? 'Editar' : 'Adicionar';
        },
        message () {
            return this.user ? 'Editado' : 'Criado';
        },
        bitcoin () {
            const valueBrl = convertBrlInNumber(this.form.valueBrl);
            const value = valueBrl / this.bitcoinValue;
            return value && valueBrl >= 1 ? value : 0;
        },
        validationForm () {
            return this.rules.nome.valid && this.rules.sobrenome.valid && this.rules.email.valid && this.rules.valueBrl.valid;
        }
    },
    watch: {
        user () {
            if (this.user) {
                const valueBrl = (parseFloat(this.user.valorCarteira * this.bitcoinValue))
                this.form = { ...this.user, valueBrl: convertBtcToNumber(valueBrl) };

            } else {
                this.form = {
                    nome: '',
                    sobrenome: '',
                    email: '',
                    valueBrl: '',
                    valorCarteira: 0,
                }
            }

        },
        'form.valueBrl': async function (newVal, oldVal) {
            if (newVal != oldVal) {
                const value = await getBtcToBrlValue();
                this.bitcoinValue = value;
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.container-box {
    padding: 35px;
    width: 600px;
}
.title {
    font-weight: bold;
    font-size: 22px;
}
.division {
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
    margin-top: 25px;
}
.division .line {
    border-bottom: #dbdbdb 1px solid;
    width: 100%;
}
.input-componet {
    margin-bottom: 10px;
}
.bitcoin {
    font-weight: bold;
    margin-left: 15px;
}
</style>