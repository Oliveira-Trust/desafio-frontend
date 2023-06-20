import axios from 'axios'

const baseURL = 'https://economia.awesomeapi.com.br'
const api = axios.create({ baseURL })

export const list = (urlParams: string) => {
	return api.get('/last/' + urlParams)
}
