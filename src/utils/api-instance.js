import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { backendBaseURL } from '@/utils/end-points';

// Caso entre algum token no cabeçalho
export const headerAxios = () => {
    return {};
};

// converter para o padrão do js Camel Case
export const configAxios = () =>
    applyCaseMiddleware(
        axios.create({
            headers: headerAxios(),
            baseURL: backendBaseURL,
        })
    );
