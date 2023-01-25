import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://economia.awesomeapi.com.br/json",
   });

const get = async (currency)=>{
	const response = await axiosInstance.get(currency)    
	return response.data;				
}

const apiExchange = {
  get,
}

export default apiExchange