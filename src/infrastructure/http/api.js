import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3004",
   });

const get = async (url, params)=>{
	const response = await axiosInstance.get(url, params)
	return response.data;				
}
const post = async (url, params)=>{
	const response = await axiosInstance.post(url, params)
	return response.data;				
}
const put = async (url, params)=>{
	const response = await axiosInstance.put(url + '/' + params.id, params)
	return response.data;				
}

const remove = async (url, params)=>{
	const response = await axiosInstance.delete(url + '/' + params)
	return response.data;				
}

const api = {
    get,
    post,
		put,
    remove
}

export default api