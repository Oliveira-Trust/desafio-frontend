let dadosDaTabela = 
    [
    ['Bruno', 'Xavier', 'Desenvolvedor Front-End', 'TI', '25/10/2005'],
    ['Renato', 'Caruso','Desenvolvedor Back-End', 'TI', '15/05/1989'],
    ['Luan', 'Sapuca', 'Desenvolvedor Front-End', 'TI', '28/06/1999'],
    ['Luan', 'Silva', 'Desenvolvedor Front-End', 'TI', '28/06/1999'],
    ]

$(document).ready(function() {
    $('#tabela-funcionarios').DataTable({
        data: dadosDaTabela,
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
// Função para adicionar funcionário
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
function consultar_funcionario(event)
{
    let nomeConsulta = document.getElementById('nomeConsulta').value
    let sobrenomeConsulta = document.getElementById('sobrenomeConsulta').value
    
    let table = $('#tabela-funcionarios').DataTable()

    let indice = false
    let nomeFuncionario, sobrenomeFuncionario
    table.rows( function (index, data) 
    {
        if(data[0] == nomeConsulta && data[1] == sobrenomeConsulta)
        {
            indice = index
            nomeFuncionario = data[0]
            sobrenomeFuncionario = data[1]
            return             
        } 
    })
    if(!indice){swal("Erro!", "Funcionário não encontrado!", "error")}
    else
    {
        swal({
            title: "Você tem certeza?",
            text: "Uma vez excluído, você não poderá recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete)
            {
                remover_funcionario(indice, table) 
                swal(`${nomeFuncionario} ${sobrenomeFuncionario} foi excluído do registro!`, {icon: "success"}) 
            } 
            else 
            {
                swal(`${nomeFuncionario} ${sobrenomeFuncionario} foi mantido no registro!`)
            }
        })  
    }
}
//Função para excluir funcionário
function remover_funcionario(index, table)
{
    table.row(index).remove().draw()
}

// Função para redefinir o padrão de entrada de ISO para BR
// Date.prototype.formatoBrasileiroString = function(){ return this.toLocaleString('pt-br', {year: 'numeric', month: 'numeric', day: 'numeric'}) }

//Recebe o valor de entrada no formato DD/MM/AAAA e passa para o formato ISO MM/DD/AAAA
function formataDataBrParaISO(valorDataBr)
{
    let [ano, mes, dia] = valorDataBr.split('-')
    return [mes, dia, ano].join('/')
}

//Calcula a diferença das datad de entrada no formato ISO com a data atual que tbm é ISO e transforma o valor em dias de trabalho
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


// 
