export const convertToBrl = (value) => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export const convertBrlToBtc = (valueBrl, valueBtc) => {
    console.log(valueBrl.toString().replace(',', '.')/valueBtc);
    let brl = valueBrl.toString().replace(',', '.');
    const value = brl / valueBtc;
    return value && valueBrl >= 1 ? value : 0;
}