<template>
    <ot-modal :show="show">
        <div class="container-box" slot="body">
            <div class="flex title">{{ title }} Carteira</div>
            <div class="division">
                <div class="line"></div>
            </div>
            <div class="input-componet">
                <ot-input v-model="form.nome" placeholder-text="Nome" />
            </div>
            <div class="input-componet">
                <ot-input v-model="form.sobrenome" placeholder-text="Sobrenome" />
            </div>
            <div class="input-componet">
                <ot-input v-model="form.email" placeholder-text="E-mail" />
            </div>
            <div class="input-componet flex justify-start items-center">
                <ot-input v-model="form.valorCarteira" placeholder-text="Valor de Compra" />
                <div class="bitcoin">BTC {{ bitcoin }}</div>
            </div>
        </div>
        <div class="flex justify-end" slot="footer">
            <ot-button class="mr-5" @click="$emit('close')" variant="ot-blue-outline">Cancelar</ot-button>
            <ot-button>Adicionar</ot-button>
        </div>
    </ot-modal>
</template>

<script>
import { getBtcToBrl } from '@/services';
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
            valorCarteira: '',
        }
    }),
    computed: {
        title () {
            return this.user ? 'Editar' : 'Adicionar';
        },
        bitcoin () {
            return 0;
        }
    },
    watch: {
        user () {
            if (this.user) {
                this.form = { ...this.user };
            } else {
                this.form = {
                    nome: '',
                    sobrenome: '',
                    email: '',
                    valorCarteira: '',
                }
            }

        },
        'form.valorCarteira': async function (newVal, oldVal) {
            console.log(newVal, oldVal);
            if (newVal != oldVal) {
                await getBtcToBrl();
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