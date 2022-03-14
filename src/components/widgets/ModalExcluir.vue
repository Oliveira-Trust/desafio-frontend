<template>
  <div>
    <b-modal id="modal-excluir" centered  ref="modal-excluir" @hidden="fechaModal">
        <template #modal-header style="border-color: white !important;">
            <div class="d-flex justfy-content-end">                    
                <!-- Apenas para fazer o override do componente -->
            </div>
        </template>
        <div class="d-flex justify-content-center mb-4" style="font-size: 4rem;">
            <b-icon icon="trash" class="border border-danger rounded-circle p-2" variant="danger"></b-icon>
        </div>
        <div class="d-flex justify-content-center">
            <h4>Excluir Carteira</h4>
        </div>
        <div class="text-center">
            <p class="mb-auto">Tem certeza que deseja excluir essa carteira?</p>
            <p>Essa ação não pode ser desfeita.</p>
        </div>
        <div class="text-center container">
            <b-button squared variant="danger" class="w-100" @click="excluir">Excluir</b-button>
        </div>
        <div class="text-center container">
            <b-button variant="outline-secondary" class="w-100 mr-2 btn-cancelar" @click="fechaModal">Cancelar</b-button>
        </div>
        <template #modal-footer>
            <div class="d-flex justfy-content-end">                    
                <!-- Apenas para fazer o override do componente -->
            </div>
        </template>
    </b-modal>
  </div>
</template>

<script>
import CarteiraService from '@/service/CarteiraService.js'

export default {

    carteiraService: null,

    computed: {
        carteira() {
            return this.$store.state.carteira
        }
    },

    methods: {
        excluir() {
            this.carteiraService.excluir(this.carteira)
            .then(resp => {
                console.log(resp.statusText)
                this.$bvToast.toast('Registro excluído com sucesso!', {
                    title: 'Salvar',
                    variant: 'success',
                    solid: true
                })
                this.$store.state.itens.splice(this.$store.state.itens.findIndex(e => e.id == this.carteira.id),1);
                this.fechaModal()
            })
        },
        // Limpa do store a carteira selecionada.
        fechaModal() {
            this.$refs['modal-excluir'].hide()
            this.$store.commit('limpaCarteira')
        }
    },
    created() {
        this.carteiraService = new CarteiraService()
    }

}
</script>

<style>

#modal-exluir > header, footer {
    border-color: white !important;
}



</style>