export const appendQueryString = (url, value) => {
    if (!value) {
        return url;
    } else if (url.indexOf('?') === -1) {
        return url + '?' + value;
    } else {
        return url + '&' + value;
    }
};
export const convertBrlInNumber = value => {
    return value
        .replace(/[^\d,]+/g, '') // Remove unnecessary characters.
        .replace(',', '.');      // Change the decimal separator(`,` -> `.`)
}
export const convertBtcToNumber = value => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}