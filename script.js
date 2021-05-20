let id;
let currentPage = 1;
let numberOfFiles = 0;
const employeesPerPage = 10;
let employees = [[1, "Fabiana", "Silva", "Desenvolvedora Back-End", "TI", "1095 dias"],
[2, "Gerson", "Barroso", "Gerente", "Vendas", "342 dias"],
[3, "Arthur", "Valls", "Estagiário", "TI", "27 dias"],
[4, "Rosângela", "Viana", "Diretora", "Vendas", "2793 dias"],
[5, "Igor", "Souza", "Auxiliar", "Marketing", "198 dias"],
[6, "Jorge", "Canuto", "Trainee", "RH", "12 dias"],
[7, "Lívia", "Costa", "Desenvolvedora Front-End", "TI", "1025 dias"],
[8, "Rafael", "Bezerra", "Trainee", "Cobrança", "90 dias"],
[9, "Gabriel", "Barbosa", "Gerente", "Finanças", "942 dias"],
[10, "Guilherme", "Paz", "Web Designer", "TI", "297 dias"]];

// Vai para a página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

// Vai para o próxima página
function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        changePage(currentPage);
    }
}

// Altera o conteúdo da página
function changePage(page) {
    var btnPrev = document.getElementById("previous");
    var btnNext = document.getElementById("next");
    var table = document.getElementById("employee-table");
    var pageSpan = document.getElementById("employee-showed");
    var pageTotal = document.getElementById("employee-total");
    var employeeTotal = document.getElementById("numberOfEmployees");
    var filesTotal = document.getElementById("numberOfFiles");
    var contador = 0;

    if (page < 1) { page = 1; }
    if (page > numPages()) { page = numPages(); }

    table.innerHTML = "";
    pageSpan.innerHTML = "";
    pageTotal.innerHTML = "";
    pageTotal.innerHTML = employees.length;
    employeeTotal.innerHTML = employees.length;
    filesTotal.innerHTML = numberOfFiles;

    if (page == 1) {
        btnPrev.classList.add("disabled");
        btnPrev.classList.remove("text-dark");
        btnPrev.classList.add("text-muted");
    } else {
        btnPrev.classList.remove("disabled");
        btnPrev.classList.remove("text-muted");
        btnPrev.classList.add("text-dark");
    }
    if (page == numPages()) {
        btnNext.classList.add("disabled");
        btnNext.classList.remove("text-dark");
        btnNext.classList.add("text-muted");
    } else {
        btnNext.classList.remove("disabled");
        btnNext.classList.remove("text-muted");
        btnNext.classList.add("text-dark");
    }

    for (var i = (page - 1) * employeesPerPage; i < (page * employeesPerPage); i++) {
        table.innerHTML += `<tr><th scope="row">${employees[i][0]}</th><td>${employees[i][1]}</td><td>${employees[i][2]}</td><td>${employees[i][3]}</td><td>${employees[i][4]}</td><td>${employees[i][5]}</td><td><button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="selectEmployeeId(${i})">Excluir</button></td></tr>`;
        contador++;
        pageSpan.innerHTML = "";
        pageSpan.innerHTML = contador;
    }
}

// Retorna o número total de paginas
function numPages() {
    return Math.ceil(employees.length / employeesPerPage);
}

// Seleciona o id do funcionário
function selectEmployeeId(i) {
    id = i;
}

// Adiciona funcionário
function addEmployee(event) {
    var name = document.forms["addForm"].elements["fname"].value;
    var lastname = document.forms["addForm"].elements["flastname"].value;
    var cargo = document.forms["addForm"].elements["fcargo"].value;
    var sector = document.forms["addForm"].elements["fsector"].value;
    var time = document.forms["addForm"].elements["ftime"].value;
    var id = employees.length + 1;

    employees.push([id, `${name}`, `${lastname}`, `${cargo}`, `${sector}`, `${time} dias`]);

    changePage(currentPage);
}

// Exclui o funcionário selecionado
function deleteEmployee() {
    employees.splice(id, 1);
    changePage(currentPage);
}

// Carrega a paginação
window.onload = function () {
    changePage(1);
};

// Altera o número de arquivos
function addFile() {
    numberOfFiles++;
    console.log("chegou");
    changePage(currentPage);
}