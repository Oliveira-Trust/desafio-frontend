import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:3004",
   });

const get = async (url)=>{
	const response = await axiosInstance.get(url)
	return response.data;				
}


const api = {
    get
}

export default api