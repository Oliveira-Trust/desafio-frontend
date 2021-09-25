import axios from '@/http/interceptor'

export default {
	getUsers: query => axios.get('/users?_sort=id&_order=desc' + query),
	storeUser: data => axios.post('/users', data),
	deleteUser: id => axios.delete(`/users/${id}`),
	updateUser: (data, id) => axios.put(`/users/${id}`, data),
}