import { IUser } from '../types/user'
export default class User implements IUser {
	readonly id?: number
	readonly nome?: string
	readonly sobrenome?: string
	readonly email?: string
	readonly endereco?: string
	readonly data_nascimento?: string
	readonly data_abertura?: string
	readonly valor_carteira?: number
	readonly endereco_carteira?: string

	constructor(user: IUser) {
		this.id = user.id
		this.nome = user.nome
		this.sobrenome = user.sobrenome
		this.email = user.email
		this.endereco = user.endereco
		this.data_nascimento = user.data_nascimento
		this.data_abertura = user.data_abertura
		this.valor_carteira = user.valor_carteira
		this.endereco_carteira = user.endereco_carteira
	}

	csvView() {
		const { nome, sobrenome, email, valor_carteira } = this
		return {
			nome,
			sobrenome,
			email,
			bitcoin: valor_carteira,
		}
	}
}
