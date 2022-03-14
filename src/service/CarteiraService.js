import http from '@/plugins/axios'

export default class carteira {    

    listar() {       
        return http.get('http://localhost:3004/users')
    }
    
    buscar(nome, sobrenome, email) {
        // Permitir a busca com pelo menos um dos valores preenchidos (qualquer um)
        let complemento = '?'
        if(nome) complemento += 'nome='+nome+'&'
        if(sobrenome) complemento += 'sobrenome='+sobrenome+'&'
        if(email) complemento += 'email='+email+'&'
        
        return http.get('http://localhost:3004/users'+complemento)
    }

    salvar(carteira) {
        console.log(carteira)
        return carteira.id ? http.put('http://localhost:3004/users/'+carteira.id, carteira) : http.post('http://localhost:3004/users', carteira)
    }

    excluir(carteira) {
        return http.delete('http://localhost:3004/users/'+carteira.id)
    }

}