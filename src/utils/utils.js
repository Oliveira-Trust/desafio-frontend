export const convertToBrl = (valueWallet, valueBtc) => {
    return (valueWallet * valueBtc).toFixed(3);
}

export const convertBrlToBtc = (valueBrl, valueBtc) => {
    let brl = valueBrl.toString().replace(',', '.');
    const value = brl / valueBtc;
    return value && valueBrl >= 1 ? value : 0;
}