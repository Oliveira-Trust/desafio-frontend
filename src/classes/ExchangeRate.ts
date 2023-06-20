import { IExchangeRate } from '../types/context'

export default class ExchangeRate implements IExchangeRate {
	base: string = ''
	to: string = ''
	value: number = 0

	constructor(exchangeRate?: Record<string, any>) {
		if (exchangeRate) {
			this.base = exchangeRate.code
			this.to = exchangeRate.codein
			this.value = exchangeRate.bid
		}
	}
}
