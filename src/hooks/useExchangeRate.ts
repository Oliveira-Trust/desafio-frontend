import { useState, useEffect, useCallback } from 'react'

import { list } from '../apis/currency'
import ExchangeRate from '../classes/ExchangeRate'
import { ensureError, CurrencyApiErrors } from '../utils/utils'

interface UseCurrencyConfig {
	exchangeCurrency: string
	onFailed: (message: string) => void
}
export default function useExchangeRate({
	exchangeCurrency,
	onFailed,
}: UseCurrencyConfig) {
	const [exchangeRate, setExchangeRate] = useState(new ExchangeRate())

	const handleError = (err: Error) => {
		console.error(err)
		onFailed(CurrencyApiErrors.LOAD_CURRENCY_EXCEPTION)
	}
	const getExchangeRate = useCallback(() => {
		if (exchangeCurrency) {
			try {
				const key = exchangeCurrency.replace('-', '')
				list(exchangeCurrency).then((res) => {
					setExchangeRate(new ExchangeRate(res.data[key]))
				})
			} catch (err) {
				const error = ensureError(err)
				handleError(error)
			}
		}
		// eslint-disable-next-line
	}, [exchangeCurrency])

	useEffect(() => {
		getExchangeRate()
	}, [getExchangeRate])

	return {
		exchangeRate,
	}
}
