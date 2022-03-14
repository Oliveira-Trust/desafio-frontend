import http from '@/plugins/axios'

export default class ConversaoMoedaService {    

    listaCombinacoesPossiveis() {       
        return http.get('https://economia.awesomeapi.com.br/json/available')
    }
    buscaValorCompra(cotacaoSelecionada) {       
        return http.get('https://economia.awesomeapi.com.br/json/last/'+cotacaoSelecionada)
    }   

}