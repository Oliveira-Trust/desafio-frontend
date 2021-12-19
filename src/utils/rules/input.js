export const validateInput = (rule, value) => {
    switch (rule.type) {
        case 'email':
            return emailValidate(rule, value);
        case 'text':
            return textValidate(rule, value);
        default:
            return textValidate(rule, value);
    }
};
export const emailValidate = (rule, value) => {
    if (rule.required) {
        if (value.trim('').split('').length == 0) {
            return `O campo ${rule.name} é obrigatório.`;
        }
    }
    const user = value.substring(0, value.indexOf('@'));
    const domain = value.substring(value.indexOf('@') + 1, value.length);
    // essse algoritomo valida se o email é valido, por isso, estamos negando a equação,
    // precisamos saber se o email é inválido
    if (!(
        (user.length >= 1) &&
        (domain.length >= 3) &&
        (user.search('@') == -1) &&
        (domain.search('@') == -1) &&
        (user.search(' ') == -1) &&
        (domain.search(' ') == -1) &&
        (domain.search('.') != -1) &&
        (domain.indexOf('.') >= 1) &&
        (domain.lastIndexOf('.') < domain.length - 1))) {
        return `Insira um ${rule.name} válido.`;
    }

    return '';
};
export const textValidate = (rule, value) => {
    if (value == undefined) {
        return `O campo ${rule.name} é obrigatório.`;
    }
    if (rule.required) {
        if (value.trim('').split('').length == 0) {
            return `O campo ${rule.name} é obrigatório.`;
        }
    }
    if (value.trim('').split('').length > 0 && rule.length) {
        if (rule.length > value.split('').length) {
            return `Por favor, forneça ao menos ${rule.length} caracteres.`;
        }
    }
    if (value.trim('').split('').length > 0 && rule.lengthMax) {
        if (rule.lengthMax < value.split('').length) {
            return `Por favor, forneça até ${rule.lengthMax} caracteres.`;
        }
    }
    return '';
};
