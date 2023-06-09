import { GenericObject } from "../types/utils";

export const columns = [
    {
        column: 'Nome',
        key: 'nome'
    },
    {
        column: 'Sobrenome',
        key: 'sobrenome'
    },
    {
        column: 'Email',
        key: 'email'
    },
    {
        column: 'Bitcoin',
        key: 'valor_carteira'
    },
]

export const currencies = ['BTC-BRL']



export const addColumnsSize = (size: number) => {
    return {
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr)) 50px`
    }
}

export const actions = [
    {
        icon: ['fas', 'pencil'],
        tooltip: 'Editar'
    },
    {
        icon: ['fas', 'trash'],
        tooltip: 'Remover'
    }
]

export const fixedNumber = (num: number, step: number) => {
    return Number(num.toFixed(step))
}

export const renameProperty = function (oldName: string, newName: string, obj: GenericObject) {

    if (oldName === newName) {
        return obj;
    }
    if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
    }
    return obj;
};