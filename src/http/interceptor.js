import axios from 'axios'
import {
	Notification
} from 'element-ui';
import store from '@/store'

let http = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 180000
})

http.interceptors.request.use(
	config => {
		store.dispatch('request/setLoadingRequest', true)
		config.headers['Accept'] = 'application/json'
		config.headers['Content-Type'] = 'application/json'
		return config;
	},
	error => {
		store.dispatch('request/setLoadingRequest', false)
		console.log(error);
		return Promise.reject(new Error(error));
	}
);

http.interceptors.response.use(
	res => {
		store.dispatch('request/setLoadingRequest', false)
		const {
			method
		} = res.config
		//Para Debugar as requisições POST
		if (process.env.NODE_ENV !== 'production' && method === 'post') {
			console.log(res);
		}
		return res.data
	},
	error => {
		store.dispatch('request/setLoadingRequest', false)
		if (error.response) {
			let msg = error.response ?
				error.response.message :
				error.message
			throwError(msg)
			return Promise.reject(new Error(msg))
		}

	}
)

const throwError = message => {
	Notification.error({
		title: 'Erro!',
		message: message,
		type: 'error',
		duration: 5 * 1000,
	})
}

export default http
