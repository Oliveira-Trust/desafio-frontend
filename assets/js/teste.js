
function testTable(nome, sobrenome, cargo, setor, tempo) {

    var nome = "seu nome";
    var sobrenome = "seu sobrenome";
    var cargo = "seu cargo";
    var setor = "seu setor";
    var tempo = "seu tempo";

    var cellNome = document.getElementById("txtNome");
    var cellSobrenome = document.getElementById("txtSobrenome");
    var cellCargo = document.getElementById("txtCargo");
    var cellSetor = document.getElementById("txtSetor");
    var cellTempo = document.getElementById("txtTempo");


    cellNome.value = nome;
    window.setTimeout(function() {
        cellSobrenome.value = sobrenome;
        window.setTimeout(function() {
            cellCargo.value = cargo;
            window.setTimeout(function() {
                cellSetor.value = setor;
                window.setTimeout(function() {
                    cellTempo.value = tempo;
                    window.setTimeout(function() {
                    },50);
                },50);
            },50);
        },50);
    },50);

    preencheCamposForm();
}
