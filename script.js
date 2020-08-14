
// // Posição do header fixa
// $(window).scroll(function(){
//     var sticky = $('.sticky'),
//         scroll = $(window).scrollTop();
  
//     if (scroll >= 100) sticky.addClass('fixed');
//     else sticky.removeClass('fixed');
//   });

// let dadosDaTabela = 
//     [
//     ['Bruno', 'Xavier', 'Desenvolvedor Front-End', 'TI', '25/10/2005'],
//     ['Renato', 'Caruso','Desenvolvedor Back-End', 'TI', '15/05/1989']
//     ]

$(document).ready(function() {
    $('#tabela-funcionarios').DataTable({
        // data: dadosDaTabela,
        dom: 'rtp',
        language:{
            "sEmptyTable": "Nenhum registro encontrado",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
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
    });
} );

function adicionar_funcionario(event)
{
    let nome = document.getElementById('nome').value
    let sobrenome = document.getElementById('sobrenome').value
    let cargo = document.getElementById('cargo').value
    let setor = document.getElementById('setor').value
    let dataDeEntrada = document.getElementById('dataDeEntrada').value
    let valorDataISO = formataDataBrParaISO(dataDeEntrada)
    let valorTempoDeTrabalho = calculaDiferencaDataEmDias(valorDataISO)

    let listaDeEntradas = []
    let novoFuncionario = [nome, sobrenome, cargo, setor, valorTempoDeTrabalho + ' dia' + (valorTempoDeTrabalho > 1 ? 's' : '')]
    listaDeEntradas.push(novoFuncionario)
    let objetoDataTable = $('#tabela-funcionarios').DataTable()
    objetoDataTable.rows.add(listaDeEntradas).draw()

}



// Date.prototype.formatoBrasileiroString = function(){ return this.toLocaleString('pt-br', {year: 'numeric', month: 'numeric', day: 'numeric'}) }

function formataDataBrParaISO(valorDataBr)
{
    let [ano, mes, dia] = valorDataBr.split('-')
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

// function exibirData()
// {
//     var valorDataInicialBr = document.getElementById("dataInicial").value
//     var valorDataInicialISO = formataDataBrParaISO(valorDataInicialBr)
//     var difDiasParaHoje = calculaDiferencaDataEmDias(valorDataInicialISO)
//     document.getElementById('dias').textContent = difDiasParaHoje
// }

