import axios from "axios";
export async function carregarUsuarios() {
    try {
        const response = await axios.get('http://localhost:3004/users');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error; 
    }
}

export async function deletarUsuario(id) {
    try {

        await axios.delete(`http://localhost:3004/users/${id}`);
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}

export async function buscarPrecoBitcoin() {
    try {
        const response = await axios.get('https://economia.awesomeapi.com.br/json/last/BTC-BRL');
        const data = response.data.BTCBRL;
        const bid = parseFloat(data.bid);
        const ask = parseFloat(data.ask);
        console.log('bid é '+ bid)
        console.log('ask é '+ ask)
        return { bid, ask };
    } catch (error) {
        console.error('Erro ao buscar preço do Bitcoin:', error);
        throw error;
    }
}

export async function adicionarUsuario(usuario) {
    try {
        await axios.post('http://localhost:3004/users', usuario);
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        throw error;
    }
}

export async function buscarUsuarioPorId(id) {
    try {
        const response = await axios.get(`http://localhost:3004/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw error;
    }
}

export async function editarUsuario(id, usuario) {
    try {
        await axios.put(`http://localhost:3004/users/${id}`, usuario);
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        throw error;
    }
}