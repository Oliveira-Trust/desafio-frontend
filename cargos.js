$.getJSON('data/cargos.json', function (data) {
    var items = [];
    
    var options = '<option value="">Selecione o Setor</option>';

        $.each(data, function (key, val) {
            options += '<option value="' + val.nome + '">' + val.nome + '</option>';
        });					
        $("#setor").html(options);				
        
        $("#setor").change(function () {
            var options_cargo = '<option value="">Selecione o Cargo</option>';
            var str = "";					
            
            $("#setor option:selected").each(function () {
                str += $(this).text();
            });            
            
            $.each(data, function (key, val) {
                if(val.nome == str) {							
                    $.each(val.cargo, function (key_cargo, val_cargo) {
                        options_cargo += '<option value="' + val_cargo + '">' + val_cargo + '</option>';
                    });
                }
            });

            $("#cargo").html(options_cargo);
            
        }).change();
    });