import type { Currency, CurrencyConversion } from '~/interfaces'

class CurrencyService {
  private baseURL = 'https://economia.awesomeapi.com.br/json'

  async getAvailableCurrencies(): Promise<Currency[]> {
    try {
      const response = await fetch(`${this.baseURL}/available/uniq`)
      const data = await response.json()
      
      return Object.entries(data).map(([code, name]) => ({
        code,
        name: name as string
      })).sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
      console.error('Erro ao buscar moedas disponíveis:', error)
      return []
    }
  }

  async convertCurrency(from: string, to: string, amount: number): Promise<CurrencyConversion | null> {
    try {
      if (from === 'BRL' && to === 'BTC') {
        // Conversão de BRL para BTC
        const response = await fetch(`${this.baseURL}/last/BTC-BRL`)
        const data = await response.json()
        
        const conversionData = data['BTCBRL']
        
        if (!conversionData) {
          throw new Error('Dados de conversão não encontrados')
        }

        const btcToBrlRate = parseFloat(conversionData.bid)
        const brlToBtcRate = 1 / btcToBrlRate
        const convertedAmount = amount * brlToBtcRate

        return {
          from,
          to,
          amount,
          convertedAmount,
          rate: brlToBtcRate
        }
      } else if (from === 'BTC' && to === 'BRL') {
        // Conversão de BTC para BRL
        const response = await fetch(`${this.baseURL}/last/BTC-BRL`)
        const data = await response.json()
        
        const conversionData = data['BTCBRL']
        
        if (!conversionData) {
          throw new Error('Dados de conversão não encontrados')
        }

        const btcToBrlRate = parseFloat(conversionData.bid)
        const convertedAmount = amount * btcToBrlRate

        return {
          from,
          to,
          amount,
          convertedAmount,
          rate: btcToBrlRate
        }
      } else {
        throw new Error('Par de moedas não suportado')
      }
    } catch (error) {
      console.error('Erro na conversão de moeda:', error)
      return null
    }
  }

  async getConversionRate(from: string, to: string): Promise<number | null> {
    try {
      const response = await fetch(`${this.baseURL}/last/${from}-${to}`)
      const data = await response.json()
      
      const conversionKey = `${from}${to}`
      const conversionData = data[conversionKey]
      
      if (!conversionData) {
        return null
      }

      return parseFloat(conversionData.bid)
    } catch (error) {
      console.error('Erro ao buscar taxa de conversão:', error)
      return null
    }
  }
}

export const currencyService = new CurrencyService()
export default CurrencyService
