class User {
  constructor(args) {    
    this.id = args.id || null,
    this.nome = args.nome || null,
    this.sobrenome = args.sobrenome || null,
    this.email = args.email || null 
    this.bitcoin = args.bitcoin || null    
  }
}
module.exports = User;