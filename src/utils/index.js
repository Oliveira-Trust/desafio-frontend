import { ExportToCsv } from 'export-to-csv';
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

export const convertNumberToBRL = number => {
    return Number(number).toLocaleString('pt-BR')
};

export const downloadBlobCsv = (name, data) => {
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        filename: name,
        title: 'Usuários da Oliveira Trust',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
};