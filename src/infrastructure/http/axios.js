import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:3004",
   });

const get = async (url, params)=>{
	const response = await axiosInstance.get(url, params)
	return response.data;				
}

const api = {
    get
}

export default api