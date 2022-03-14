<template>
    <section>
        <div class="menu">
            <Menu />
        </div>
        <div class="mt-4 container">
            <adicionar-carteira />
        </div>
        <div class="box mt-4 container">
            <filtro-busca />
        </div>
        <div class="box mt-4 container">
            <tabela-carteiras />
        </div>
        <modal-add-edit/>
        <modal-excluir/>
    </section>
</template>

<script>

import Menu from "@/components/widgets/Menu"
import AdicionarCarteira from "@/components/widgets/AdicionarCarteira"
import FiltroBusca from "@/components/widgets/FiltroBusca"
import ModalAddEdit from "@/components/widgets/ModalAddEdit"
import TabelaCarteiras from "@/components/widgets/TabelaCarteiras"
import ModalExcluir from "@/components/widgets/ModalExcluir"

export default {
    components: { Menu, AdicionarCarteira, FiltroBusca, ModalAddEdit, TabelaCarteiras, ModalExcluir },

}
</script>

<style>
/* Apenas estilos globais, como a customizacao do botao cancelar. Normalmente deixo os css em arquivo separado. */
.menu, .box {
    background-color: white;
}

.box {
    padding-bottom: 20px;
    padding-top: 20px;
}

.btn-cancelar {
    background-color: white !important;
    color: #007BFF !important;
    border-color: white !important;
}

</style>