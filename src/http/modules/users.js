import axios from '@/http/interceptor'

export default {
	getUsers: () => axios.get('/users')
}