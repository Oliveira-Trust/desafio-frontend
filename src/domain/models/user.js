class User {
  constructor(args) {      
    this.id = args?.id || null,
    this.nome = args?.nome || null,
    this.sobrenome = args?.sobrenome || null,
    this.email = args?.email || null 
    this.valor_carteira = args?.valor_carteira || null   
    this.valor_currency = args?.valor_currency || args?.valor_carteira || null   
    this.endereco = args?.endereco || null,
    this.data_nascimento = args?.data_nascimento || null,
    this.data_abertura = args?.data_abertura || null,
    this.endereco_carteira = args?.endereco_carteira || null
  } 
}
module.exports = User;