$('#modal-login').modal('show')


function Login(event) {

    event.preventDefault();
    
    var usuario = document.getElementsByName('username')[0].value;
        usuario = usuario.toLowerCase();

    var senha = document.getElementsByName('password')[0].value;
        senha = senha.toLowerCase();
  
    if (usuario == "123" && senha == "123") {
        window.location = "home.html";
    }
    
    else{

        alert("Dados incorretos, tente novamente");

    }
  }