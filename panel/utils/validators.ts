export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}

export const validators = {
	required: (value: string, fieldName: string): string | null => {
		if (!value || !value.trim()) {
			return `${fieldName} é obrigatório`;
		}
		return null;
	},

	minLength: (value: string, minLength: number, fieldName: string): string | null => {
		if (value && value.trim().length < minLength) {
			return `${fieldName} deve ter pelo menos ${minLength} caracteres`;
		}
		return null;
	},

	email: (value: string): string | null => {
		if (value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				return 'E-mail inválido';
			}
		}
		return null;
	},

	number: (value: string, fieldName: string): string | null => {
		if (value) {
			const numValue = parseFloat(value);
			if (isNaN(numValue)) {
				return `${fieldName} deve ser um número válido`;
			}
		}
		return null;
	},

	positiveNumber: (value: string, fieldName: string): string | null => {
		if (value) {
			const numValue = parseFloat(value);
			if (isNaN(numValue) || numValue <= 0) {
				return `${fieldName} deve ser maior que zero`;
			}
		}
		return null;
	},

	currency: (value: string, fieldName: string): string | null => {
		if (value) {
			const numericValue = value.replace(/\D/g, '');
			if (numericValue === '') {
				return `${fieldName} é obrigatório`;
			}
			const numValue = parseFloat(numericValue) / 100;
			if (isNaN(numValue) || numValue <= 0) {
				return `${fieldName} deve ser maior que zero`;
			}
		}
		return null;
	},

	walletForm: (data: {
		nome: string;
		sobrenome: string;
		email: string;
		valor_compra: string;
		moeda_origem?: string;
		moeda_destino?: string;
	}): ValidationResult => {
		const errors: Record<string, string> = {};

		const nomeError = validators.required(data.nome, 'Nome') || 
						 validators.minLength(data.nome, 2, 'Nome');
		if (nomeError) errors.nome = nomeError;

		const sobrenomeError = validators.required(data.sobrenome, 'Sobrenome') || 
							  validators.minLength(data.sobrenome, 2, 'Sobrenome');
		if (sobrenomeError) errors.sobrenome = sobrenomeError;

		const emailError = validators.required(data.email, 'E-mail') || 
						  validators.email(data.email);
		if (emailError) errors.email = emailError;

		const valorError = validators.currency(data.valor_compra, 'Valor de compra');
		if (valorError) errors.valor_compra = valorError;

		if (data.moeda_destino) {
			const moedaDestinoError = validators.required(data.moeda_destino, 'Moeda de destino');
			if (moedaDestinoError) errors.moeda_destino = moedaDestinoError;
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors
		};
	},

	searchForm: (data: {
		nome?: string;
		sobrenome?: string;
		email?: string;
	}): ValidationResult => {
		const errors: Record<string, string> = {};

		if (data.email) {
			const emailError = validators.email(data.email);
			if (emailError) errors.email = emailError;
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors
		};
	}
};
