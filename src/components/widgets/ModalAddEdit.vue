<template>
    <div>
        <b-modal id="modal-adicionar-carteira" :title="this.$store.state.modal.titulo" ref="modal-add-edit" @hidden="fechaModal" @show="atualizaValorEntrada">
            <b-form>
                <b-form-text id="input-modal-nome">Nome</b-form-text>
                <b-form-input id="input-modal-nome" :state="okNome" @click="okNome=null" @blur="carteira.nome ? okNome = true : okNome = false" type="text" placeholder="Nome" required class="mb-2" v-model="carteira.nome"></b-form-input>
                <b-form-invalid-feedback id="input-modal-nome">O campo nome é obrigatório</b-form-invalid-feedback>
                <b-form-text id="input-modal-sobrenome">Sobrenome</b-form-text>
                <b-form-input id="input-modal-sobrenome" :state="okSobrenome" @click="okSobrenome=null" @blur="carteira.sobrenome ? okSobrenome = true : okSobrenome = false" type="text" placeholder="Sobrenome" required class="mb-2"  v-model="carteira.sobrenome"></b-form-input>
                <b-form-invalid-feedback id="input-modal-sobrenome">O campo sobrenome é obrigatório</b-form-invalid-feedback>
                <b-form-text id="input-modal-email">E-mail</b-form-text>
                <b-form-input id="input-modal-email" :state="okEmail" @click="okEmail=null" @blur="carteira.email ? okEmail = true : okEmail = false" type="email" placeholder="E-mail" required class="mb-2" v-model="carteira.email"></b-form-input>
                <b-form-invalid-feedback id="input-modal-email">O campo e-mail é obrigatório</b-form-invalid-feedback>
            </b-form>
            <b-form inline>
                <b-form-select id="inline-form-custom-select-pref" class="mb-2 mr-sm-2 mb-sm-0" :options="combinacoesPossiveis" v-model="cotacaoSelecionada" @change="atualizaValoresConversao"></b-form-select>
                <b-form-input :state="okValorEntrada" @click="okValorEntrada=null" @blur="valorEntrada ? okValorEntrada = true : okValorEntrada = false" id="input-modal-valor" type="number" placeholder="Valor da Compra" required v-model="valorEntrada" @keyup="atualizaValorConvertido"></b-form-input>
                <label class="mr-sm-2 ml-2" for="inline-form-custom-select-pref">BTC {{ carteira.valor_carteira }}<span></span></label>
            </b-form>
            <template #modal-footer>
                <div class="d-flex justfy-content-end">                    
                    <b-button variant="outline-secondary" class="float-right mr-2 btn-cancelar" @click="fechaModal">Cancelar</b-button>
                    <b-button variant="primary" class="float-right" @click="salvar">Adicionar</b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import ConversaoMoedaService from '@/service/ConversaoMoedaService.js'
import CarteiraService from '@/service/CarteiraService.js'

export default {

    conversaoMoedaService: null,
    carteiraService: null,

    data() {
        return {
            modal: {
                titulo: 'Adicionar Carteira',
            },
            valorEntrada: 0,
            okNome: null,
            okSobrenome: null,
            okEmail: null,
            okValorEntrada: null,
            valorConversao: '',
            cotacaoSelecionada: '',
            combinacoesPossiveis: []
        }
    },
    computed: {
        carteira() {
            return this.$store.state.carteira
        }
    },
    methods: {
        listaCombinacoesPossiveis() {
            this.conversaoMoedaService.listaCombinacoesPossiveis()
            .then(resp => {
                // Filtra na lista de combinacoes possiveis as conversoes que interessam (BTC) e armazena em variavel.
                let chaves = Object.keys(resp.data).filter(obj => { return obj.includes('BTC')})
                chaves.forEach(chave => {
                    this.combinacoesPossiveis.push({ value: chave, text: chave.replace('BTC-', '')})
                })
                // Seleciona o primeiro item e coloca como padrao do select
                this.cotacaoSelecionada = chaves[0]
                this.atualizaValoresConversao()
            })
        },
        atualizaValoresConversao() {
            let codigoCotacao = String(this.cotacaoSelecionada)
            this.conversaoMoedaService.buscaValorCompra(codigoCotacao)
            .then(resp => {
                // Aparentemente o "." que vem no valor de compra nao e relacionado a fracao... desprezando o ponto, os valores se aproximam das cotacoes reais.
                // Por isso tirei o ponto aqui.
                this.valorConversao = Number(resp.data[codigoCotacao.replace('-', '')].bid.replace('.',''))
                this.atualizaValorConvertido()
            })
        },
        // Esse caso se refere ao botao adicionar. Faz a conversao da moeda selecionada para BTC quando os dados nao estao populados e quando o usuario modifica o valor de compra.
        atualizaValorConvertido() {
            this.valorEntrada ? this.carteira.valor_carteira = Number(this.valorEntrada/this.valorConversao).toFixed(7) : this.valorEntrada = this.carteira.valor_carteira = ''  
        },
        // Esse caso se refere ao botao editar. Faz a conversao de BTC para a moeda selecionada quando o modal e carregado com dados populados.
        atualizaValorEntrada() {
            this.atualizaValoresConversao()
            this.carteira.valor_carteira ? this.valorEntrada = Number(this.carteira.valor_carteira*this.valorConversao).toFixed(2) : this.valorEntrada = ''
        },
        // Adiciona ou atualiza uma nova carteira (o verbo foi abstraido para a classe de servico.)
        salvar() {
            if(!(this.carteira.nome && this.carteira.sobrenome && this.carteira.email && this.carteira.valor_carteira)) {
                this.$bvToast.toast('Preencha os campos obrigatórios.', {
                    title: 'Salvar',
                    variant: 'danger',
                    solid: true
                })
                return
            } 
            this.carteiraService.salvar(this.carteira)
            .then(resp => {
                console.log(resp.statusText)
                if(!this.carteira.id) this.$store.state.itens.push(resp.data)
                this.$bvToast.toast('Registro salvo com sucesso!', {
                    title: 'Salvar',
                    variant: 'success',
                    solid: true
                })
                this.fechaModal()
            })
        },
        // Limpa do store a carteira selecionada.
        fechaModal() {
            this.$refs['modal-add-edit'].hide()
            this.valorEntrada = 0
            this.okNome = this.okSobrenome = this.okEmail = this.okValorEntrada = null
            this.$store.commit('limpaCarteira')
        }
    },
    beforeMount() {
        this.modal = this.$store.state.modal
    },
    created() {
        this.conversaoMoedaService = new ConversaoMoedaService()
        this.carteiraService = new CarteiraService()
    },
    mounted() {
        this.listaCombinacoesPossiveis()
    }   

}
</script>

<style>



</style>