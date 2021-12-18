export const appendQueryString = (url, value) => {
    if (!value) {
        return url;
    } else if (url.indexOf('?') === -1) {
        return url + '?' + value;
    } else {
        return url + '&' + value;
    }
};