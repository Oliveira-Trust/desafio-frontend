// Cadastro de Funcionários ====================================

var pessoas, index;

var ArrayCadastro = [{nome:"Marcio", sobrenome:"Nascimento", cargo:"Desenvolvedor", setor:"Desenvolvimento", tempo:"5 anos"}, {nome:"Jonas", sobrenome:"Castro", cargo:"Aux. Adm.", setor:"ADM", tempo:"2 anos"}, {nome:"Maria", sobrenome:"D'José", cargo:"Gerente", setor:"Gerencia", tempo:"12 anos"}, {nome:"Carla", sobrenome:"Nascimento", cargo:"Fisioterapeuta", setor:"Reabilitação", tempo:"3 anos"}, {nome:"Pedro", sobrenome:"Ferreira", cargo:"Estagiário", setor:"Tecnologia", tempo:"1 ano"}, {nome:"Teresa", sobrenome:"De Jesus", cargo:"Assistente", setor:"RH", tempo:"8 anos"}, {nome:"Davi", sobrenome:"Vieira", cargo:"Instrutor", setor:"Formação", tempo:"10 anos"}, {nome:"Ângelo", sobrenome:"Gabriel", cargo:"Criação", setor:"Marketing", tempo:"7 anos"}, {nome:"Rafael", sobrenome:"Vidal", cargo:"Supervisor", setor:"Gerencial", tempo:"7 anos"}, {nome:"Carla", sobrenome:"Nascimento", cargo:"Fisioterapeuta", setor:"Reabilitação", tempo:"3 anos"}, {nome:"Marcio", sobrenome:"Silva", cargo:"Desenvolvedor", setor:"Desenvolvimento", tempo:"2 anos"}, {nome:"Maria", sobrenome:"D'José", cargo:"Gerente", setor:"Gerencia", tempo:"12 anos"}, {nome:"Pedro", sobrenome:"Ferreira", cargo:"Estagiário", setor:"Tecnologia", tempo:"1 ano"}, {nome:"Teresa", sobrenome:"De Jesus", cargo:"Assistente", setor:"RH", tempo:"8 anos"}, {nome:"Miguel", sobrenome:"Guerra", cargo:"Vigilante", setor:"SEgurança", tempo:"8 anos"}, {nome:"Davi", sobrenome:"Vieira", cargo:"Instrutor", setor:"Formação", tempo:"10 anos"}, {nome:"Carla", sobrenome:"Nascimento", cargo:"Fisioterapeuta", setor:"Reabilitação", tempo:"3 anos"}, {nome:"Rafael", sobrenome:"Vidal", cargo:"Supervisor", setor:"Gerencial", tempo:"7 anos"}, {nome:"Jonas", sobrenome:"Castro", cargo:"Aux. Adm.", setor:"ADM", tempo:"2 anos"}, {nome:"Ângelo", sobrenome:"Gabriel", cargo:"Criação", setor:"Marketing", tempo:"7 anos"}, {nome:"Miguel", sobrenome:"Guerra", cargo:"Vigilante", setor:"SEgurança", tempo:"8 anos"}, {nome:"Teresa", sobrenome:"De Jesus", cargo:"Assistente", setor:"RH", tempo:"8 anos"}, {nome:"Jonas", sobrenome:"Castro", cargo:"Aux. Adm.", setor:"ADM", tempo:"2 anos"}, {nome:"Davi", sobrenome:"Vieira", cargo:"Instrutor", setor:"Formação", tempo:"10 anos"}, {nome:"Edna", sobrenome:"Conceição", cargo:"Gerente", setor:"Gerencia", tempo:"15 anos"}, {nome:"Pedro", sobrenome:"Ferreira", cargo:"Estagiário", setor:"Tecnologia", tempo:"1 ano"}, {nome:"Maria", sobrenome:"D'José", cargo:"Gerente", setor:"Gerencia", tempo:"12 anos"}, {nome:"Marcio", sobrenome:"Silva", cargo:"Desenvolvedor", setor:"Desenvolvimento", tempo:"2 anos"}, {nome:"Ângelo", sobrenome:"Gabriel", cargo:"Criação", setor:"Marketing", tempo:"7 anos"}, {nome:"Miguel", sobrenome:"Guerra", cargo:"Vigilante", setor:"SEgurança", tempo:"8 anos"}, {nome:"Edna", sobrenome:"Conceição", cargo:"Gerente", setor:"Gerencia", tempo:"15 anos"}, {nome:"Rafael", sobrenome:"Vidal", cargo:"Supervisor", setor:"Gerencial", tempo:"7 anos"}, {nome:"Teresa", sobrenome:"De Jesus", cargo:"Assistente", setor:"RH", tempo:"8 anos"}, {nome:"Jonas", sobrenome:"Castro", cargo:"Aux. Adm.", setor:"ADM", tempo:"2 anos"}, {nome:"Edna", sobrenome:"Conceição", cargo:"Gerente", setor:"Gerencia", tempo:"15 anos"}, {nome:"Davi", sobrenome:"Vieira", cargo:"Instrutor", setor:"Formação", tempo:"10 anos"}, {nome:"Marcio", sobrenome:"Silva", cargo:"Desenvolvedor", setor:"Desenvolvimento", tempo:"2 anos"}, {nome:"Miguel", sobrenome:"Guerra", cargo:"Vigilante", setor:"SEgurança", tempo:"8 anos"}, {nome:"Carla", sobrenome:"Nascimento", cargo:"Fisioterapeuta", setor:"Reabilitação", tempo:"3 anos"}, {nome:"Rafael", sobrenome:"Vidal", cargo:"Supervisor", setor:"Gerencial", tempo:"7 anos"}, {nome:"Teresa", sobrenome:"De Jesus", cargo:"Assistente", setor:"RH", tempo:"8 anos"}, {nome:"Maria", sobrenome:"D'José", cargo:"Gerente", setor:"Gerencia", tempo:"12 anos"}, {nome:"Miguel", sobrenome:"Guerra", cargo:"Vigilante", setor:"SEgurança", tempo:"8 anos"}, {nome:"Davi", sobrenome:"Vieira", cargo:"Instrutor", setor:"Formação", tempo:"10 anos"}, {nome:"Ângelo", sobrenome:"Gabriel", cargo:"Criação", setor:"Marketing", tempo:"7 anos"}, {nome:"Jonas", sobrenome:"Castro", cargo:"Aux. Adm.", setor:"ADM", tempo:"2 anos"}, {nome:"Carla", sobrenome:"Nascimento", cargo:"Fisioterapeuta", setor:"Reabilitação", tempo:"3 anos"}, {nome:"Rafael", sobrenome:"Vidal", cargo:"Supervisor", setor:"Gerencial", tempo:"7 anos"}, {nome:"Pedro", sobrenome:"Ferreira", cargo:"Estagiário", setor:"Tecnologia", tempo:"1 ano"}, {nome:"Ângelo", sobrenome:"Gabriel", cargo:"Criação", setor:"Marketing", tempo:"7 anos"}]

for (var i=0; i<ArrayCadastro.length; i++) {

    cadPessoa (ArrayCadastro[i].nome, ArrayCadastro[i].sobrenome, ArrayCadastro[i].cargo, ArrayCadastro[i].setor, ArrayCadastro[i].tempo)

}


function cadPessoa(nome, sobrenome, cargo, setor, tempo) {
    pessoas = document.getElementById("tbPessoas");    
    var qtdlLinhas = pessoas.rows.length;
    var linha = pessoas.insertRow(qtdlLinhas);
    var linhaParam;

    var cellCodigo = linha.insertCell(0);
    var cellNome = linha.insertCell(1);
    var cellSobrenome = linha.insertCell(2);
    var cellCargo = linha.insertCell(3);
    var cellSetor = linha.insertCell(4);
    var cellTempo = linha.insertCell(5);

    cellCodigo.innerHTML = qtdlLinhas;
    cellNome.innerHTML = nome;
    cellSobrenome.innerHTML = sobrenome;
    cellCargo.innerHTML = cargo;
    cellSetor.innerHTML = setor;
    cellTempo.innerHTML = tempo;

    preencheCamposForm();
    limparCampos();
}

// Alterar tabela ====================================

function altPessoa(nome, sobrenome, cargo, setor, tempo) {

    pessoas.rows[index].cells[1].innerHTML = nome;
    pessoas.rows[index].cells[2].innerHTML = sobrenome;
    pessoas.rows[index].cells[3].innerHTML = cargo;
    pessoas.rows[index].cells[4].innerHTML = setor;
    pessoas.rows[index].cells[5].innerHTML = tempo;

    limparCampos();
}

// Preencher formulário ====================================

function preencheCamposForm() {

    for(var i = 0; i < pessoas.rows.length; i++) 
    {
        pessoas.rows[i].onclick = function() 
        {
            index = this.rowIndex;
            document.getElementById("txtCodigo").value = pessoas.rows[index].cells[0].innerText;
            document.getElementById("txtNome").value = pessoas.rows[index].cells[1].innerText;
            document.getElementById("txtSobrenome").value = pessoas.rows[index].cells[2].innerText;
            document.getElementById("txtCargo").value = pessoas.rows[index].cells[3].innerText;
            document.getElementById("txtSetor").value = pessoas.rows[index].cells[4].innerText;
            document.getElementById("txtTempo").value = pessoas.rows[index].cells[5].innerText;
        }
    }
}

// Apagar registro da tabela ====================================

function delRegistro() {

    if(confirm("Você irá EXCLUIR o cadastro: " +pessoas.rows[index].cells[1].innerText)){
    
        for(var i = 0; i < pessoas.rows.length; i++) 
    	{
        	if (index == i) {
            		pessoas.deleteRow(index);
            		return;
        	}

        	limparCampos();
    	}
        return true;
    }
    
    else{
    
        return false;   
    }

}

// Limpar os inputs após ação ===================

function limparCampos(){

    // document.getElementById("txtCodigo").value = "";
    // document.getElementById("txtNome").value = "";
    // document.getElementById("txtSobrenome").value = "";
    // document.getElementById("txtCargo").value = "";
    // document.getElementById("txtSetor").value = "";
    // document.getElementById("txtTempo").value = "";

    document.getElementById("myForm").reset();

}

// Submit Files ==================================

var form = document.getElementById('formulario');
var file = document.getElementById('file');

form.addEventListener('submit', function(e) {
    
    alert(("Anexo enviado com sucesso: "+file.value));

    e.preventDefault();

});

//Upload files ==================================

$('.btn-4').on('click', function() {

    $('.arquivo').trigger('click');

    });
  
$('.arquivo').on('change', function() {

    var fileName = $(this)[0].files[0].name;

    $('#file').val(fileName);

});

//  ==============================================