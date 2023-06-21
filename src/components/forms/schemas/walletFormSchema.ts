import { z } from 'zod'

export const walletFormSchema = z.object({
	nome: z
		.string()
		.nonempty('Este campo precisa ser preenchido.')
		.trim()
		.regex(/^[A-Za-z]+$/i, 'Insira um nome valido.'),
	sobrenome: z
		.string()
		.nonempty('Este campo precisa ser preenchido.')
		.regex(/^[A-Za-z][A-Za-z.\s]+$/i, 'Insira um sobrenome valido.'),
	email: z
		.string()
		.nonempty('Este campo precisa ser preenchido.')
		.email('Insira um e-mail valido'),
	value: z
		.string()
		.regex(
			/^R\$(\s?)(0|[1-9][0-9]{0,2})(\.\d{3})*(,\d{1,2})?$/,
			'Insira um valor valido'
		),
})

export type WalletFormData = z.infer<typeof walletFormSchema>
