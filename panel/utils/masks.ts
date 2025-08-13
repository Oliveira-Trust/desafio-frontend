export const masks = {
	currency: (value: string): string => {
		if (!value) return '';
		
		const numericValue = value.replace(/\D/g, '');
		
		if (numericValue === '') return '';
		
		const floatValue = parseFloat(numericValue) / 100;
		
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(floatValue);
	}
};
