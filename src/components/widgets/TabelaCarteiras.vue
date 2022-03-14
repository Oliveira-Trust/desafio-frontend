<template>
  <div>
        <div class="d-flex justify-content-between mb-5">
            <h4>Carteiras</h4>
            <b-button variant="outline-primary"><download-csv class= "" :data = "itens" name = "carteiras.csv">Exportar CSV</download-csv></b-button>
        </div>
        <b-table id="tabela-carteiras" per-page="10" :current-page="paginaAtual" striped hover :items="itens" :fields="fields"  responsive="sm">
            <template #cell(acoes)="row">
                <div class="d-flex justify-content-end">
                    <b-icon class="mr-2" icon="pencil" scale="1" v-b-modal.modal-adicionar-carteira @click="editar(row.item)" v-b-tooltip.hover title="Editar"></b-icon>
                    <b-icon icon="trash" scale="1" v-b-modal.modal-excluir @click="excluir(row.item)" v-b-tooltip.hover title="Excluir"></b-icon>
                </div>
            </template>
        </b-table>
        <div class="d-flex justify-content-between">
            <div>{{ itens.length }} Registro(s)</div>
            <b-pagination v-model="paginaAtual" :total-rows="itens.length" per-page="10" aria-controls="tabela-carteiras"></b-pagination>
        </div>
  </div>
</template>

<script>
import CarteiraService from '@/service/CarteiraService.js'

export default {

    carteiraService: null,

    data() {
        return {
            paginaAtual: 1,
            porPagina:10,
            fields: [
                {
                    label:'Nome', key:'nome'
                },
                {
                    label:'Sobrenome', key:'sobrenome'
                },
                {
                    label:'E-mail', key:'email'
                },
                {
                    label:'Bitcoin', key:'valor_carteira'
                },
                {
                    label: '', key: "acoes" 
                }
            ],
        }
    },
    computed: {
        itens() {
            return this.$store.state.itens
        }
    },
    methods: {
        listar() {
            this.carteiraService.listar()
            .then(resp => {
                this.$store.state.itens = resp.data
            })
        },
        editar(linha) {
            this.$store.state.modal = {titulo: 'Editar Carteira'}
            this.$store.state.carteira = linha
        },
        excluir(linha) {
            this.$store.state.carteira = linha
        }
    },
    created() {
        this.carteiraService = new CarteiraService() 
    },
    mounted() {
        this.listar()
    } 

}
</script>

<style>

tbody > tr:hover {
    border-left: 2px solid #007BFF;
}

</style>