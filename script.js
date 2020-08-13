$(document).ready(function() {
    $('.tabela-funcionarios').DataTable({
        language:{
            "sEmptyTable": "Nenhum registro encontrado",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        "searching": false,
        "info":     false,
        "sLengthMenu": false
        
    });



    
} );

// Date.prototype.formatoBrasileiroString = function(){ return this.toLocaleString('pt-br', {year: 'numeric', month: 'numeric', day: 'numeric'}) }

function formataDataBrParaISO(valorDataBr)
{
    const [dia, mes, ano] = valorDataBr.split('/')
    return [mes, dia, ano].join('/')
}

function calculaDiferencaDataEmDias(valorDataInicial)
{
	var objetoDataInicial = new Date(valorDataInicial)
    var objetoDataHoje = new Date()

	var difTempo = objetoDataHoje.getTime() - objetoDataInicial.getTime()
    var difDiasParaHoje = Math.ceil(difTempo / (1000 * 3600 * 24))-1

    return difDiasParaHoje
}

function exibirData()
{
    var valorDataInicialBr = document.getElementById("dataInicial").value
    var valorDataInicialISO = formataDataBrParaISO(valorDataInicialBr)
    var difDiasParaHoje = calculaDiferencaDataEmDias(valorDataInicialISO)
    document.getElementById('dias').textContent = difDiasParaHoje
}

