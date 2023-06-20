import axios from 'axios'

const baseURL = 'https://economia.awesomeapi.com.br'
const api = axios.create({ baseURL })

export const list = async (urlParams: string) => {
	return await api.get('/last/' + urlParams)
}
