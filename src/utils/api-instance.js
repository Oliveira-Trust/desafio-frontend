import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { backendBaseURL, coinsUrl } from '@/utils/end-points';

// If you enter any token without a header
export const headerAxios = () => {
    return {};
};

// convert to the default of js Camel Case
export const configAxios = () =>
    applyCaseMiddleware(
        axios.create({
            headers: headerAxios(),
            baseURL: backendBaseURL,
        })
    );

export const configCoins = () =>
    applyCaseMiddleware(
        axios.create({
            headers: headerAxios(),
            baseURL: coinsUrl,
        })
    );
