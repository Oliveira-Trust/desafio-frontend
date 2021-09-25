import moment from 'moment'
import { methods } from '@/utils/methods'

export default {
    isEmail(email) {
		if (methods.isEmpty(email)) return true
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase());
    },
    isPhoneNumber(phoneNumber) {
        phoneNumber = methods.phoneMask(phoneNumber)
        const expression = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g
        return expression.test(String(phoneNumber).toLowerCase());
    },
    cpf(cpf) {
        let result = true;
        cpf = String(cpf.replace(/[^0-9]+/g, ''));
        if (cpf.length != 11) return false;
        [9, 10].map((j) => {
            let soma = 0, r;
            cpf.split(/(?=)/).splice(0, j).map((e, i) => {
                soma += parseInt(e) * ((j + 2) - (i + 1));
            });
            r = soma % 11;
            r = (r < 2) ? 0 : 11 - r;
            if (r != cpf.substring(j, j + 1)) result = false;
        })
        return result;
    },
    cnpj(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '')

        if (cnpj == '') return false
        if (cnpj.length != 14) {
            return false
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false

        // Valida DVs
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho)
        var digitos = cnpj.substring(tamanho)
        var soma = 0
        var pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(0)) {
            return false
        }

        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) {
                pos = 9
            }
        }

        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(1)) {
            return false
        }

        return true
    },
    currentYear(year) {
        let cy = parseInt(moment().format('Y'))
        return parseInt(year) > cy
    },
    currentDate(date) {
        if (methods.isEmpty(date)) return true
        if (!methods.isDate(date)) return false
        let cd = moment(), gd = moment(methods.dateBRToISO(date))
        return gd > cd ? false : true
    },
    minDate(date) {
        if (methods.isEmpty(date)) return true
        if (!methods.isDate(date)) return false
        let md = moment('1900-01-01').toDate(), gd = moment(date).toDate()
        return gd >= md
    },
    maxDate(date, max) {
        if (methods.isEmpty(date) || methods.isEmpty(max)) return true
        if (!methods.isDate(date) || methods.isDate(max)) return false
        let md = moment(max).toDate(), gd = moment(date).toDate()
        return gd <= md
    },
    diferenceBetweenDates(date1, date2) {
        if (methods.isEmpty(date1) || methods.isEmpty(date2)) return true
        if (!methods.isDate(date1) || methods.isDate(date2)) return false
        let i = moment(date1).toDate(), f = moment(date2).toDate()
        return i.toDateString() === f.toDateString() ? true : i < f
    },
    isDate(date) {
        if (date === undefined || date === '' || date === null || date.length > 10) return false
        var formatPt = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        var formatIso = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        date = date.slice(0, 10)
        return formatPt.test(date) || formatIso.test(date)
    },
    biggestDate(d, m) {
        d = methods.dateBRToISO(d)
        m = methods.dateBRToISO(m)
        if (methods.isEmpty(d) || methods.isEmpty(m)) return true
        if (!methods.isDate(d) || !methods.isDate(m)) return false
        var gd = moment(d), md = moment(m)
        return gd >= md
    },
    sameDate(date1, date2) {
        if (methods.isEmpty(date1) || methods.isEmpty(date2)) return true
        if (!methods.isDate(date1) || !methods.isDate(date2)) return false
        return moment(date1).isSame(date2)
    },
    duplicateValue(value, arr) {
        arr = arr.split(',');
        let filter = arr.filter(item => item !== "")
        filter = filter.filter(item => parseInt(item) === parseInt(value))
        if (filter.length > 0) {
            return false
        }
        return true
    },
    maxValue(max, value) {
        if (methods.isEmpty(max, false) || methods.isEmpty(value, false) || Number.isNaN(Number(value))) return true
        let m = Number(max), v = Number(value)
        return v <= m
    },
    minValue(min, value) {
        if (methods.isEmpty(min, false) || methods.isEmpty(value, false) || Number.isNaN(Number(value))) return true
        let m = Number(min), v = Number(value)
        return v >= m
    },
    minimumDate(d, m) {
        if (methods.isEmpty(d) || methods.isEmpty(m)) return true
        if (!methods.isDate(d) || !methods.isDate(m)) return false
        var gd = moment(d), md = moment(m)
        return gd >= md
    },
    maximumDate(d, m) {
        if (methods.isEmpty(d) || methods.isEmpty(m)) return true
        if (!methods.isDate(d) || !methods.isDate(m)) return false
        var gd = moment(d), md = moment(m)
        return gd <= md
    },
    minChar(min, value) {
        if (methods.isEmpty(value) || methods.isEmpty(min)) return true
        return String(value).length >= Number(min)
    },
    maxChar(max, value) {
        if (methods.isEmpty(value) || methods.isEmpty(max)) return true
        return String(value).length <= Number(max)
    },
    validate(form, errors, rules) {
        for (let rule in rules) {
            for (let data in rules[rule]) {
                const field = rules[rule][data]
                let func = field.includes(':') ? field.split(':')[0] : field
                let param = field.includes(':') ? field.split(':')[1] : null
                let message = param !== null
                    ? this.callValidateMessage()[func](param)
                    : this.callValidateMessage()[func]
                try {
                    if (!this.callValidateFunction(form[rule])[func](param)) {
                        errors[rule] = message
                        methods.debug({ rule, param, message, func }, 'error')
                        return false
                    }
                } catch (error) {
                    return methods.debug({ rule, param, message, func, error }, 'error')
                }
            }
        }


        return true
    },
    callValidateFunction(value) {
        return {
            required: () => !methods.isEmpty(value),
            cpf: () => this.cpf(value),
            minDate: () => this.minDate(value),
            maxDate: max => this.maxDate(value, max),
            minimumDate: maximum => this.minimumDate(value, maximum),
            maximumDate: minimum => this.maximumDate(value, minimum),
            currentDate: () => this.currentDate(value),
            image: () => value.type === "image/png" || value.type == "image/jpg" ? true : false,
            imageSize: () => value.size > 2097152 ? false : true,
            minYear: () => value > 1900,
            currentYear: () => value <= new Date().getFullYear(),
            email: () => this.isEmail(value),
            phone: () => this.isPhoneNumber(value),
            min: min => value.length >= min,
            max: max => value.length <= max,
            difDate: (date) => this.biggestDate(value, date),
            cnpj: () => this.cnpj(value),
            minValue: min => this.minValue(min, value),
            maxValue: (max) => this.maxValue(max, value),
            minStringInvert: min => String(value) <= String(min),
            exactSize: size => value.length >= size,
            sameString: (str) => value !== str,
            sameDate: (date) => this.sameDate(date, value),
            duplicateValue: arr => this.duplicateValue(value, arr),
            isPhoneNumber: () => this.isPhoneNumber(value),
            minChar: min => this.minChar(min, value),
            maxChar: max => this.maxChar(max, value),

        }
    },
    callValidateMessage() {
        return {
            required: 'Campo obrigatório',
            cpf: 'Formato de cpf inválido',
            minDate: 'A data não pode ser anterior a 1900',
            maxDate: max => {
                let date = max.split('-')
                date = `${date[2]}/${date[1]}/${date[0]}`
                return `A data não pode ser maior que ${date}`
            },
            minimumDate: minimum => {
                const date = moment(minimum).format('DD/MM/YYYY')
                return `A data não pode ser menor que ${date}`
            },
            maximumDate: maximum => {
                const date = moment(maximum).format('DD/MM/YYYY')
                return `A data não pode ser maior que ${date}`
            },
            currentDate: 'A data não pode ser superior a data atual',
            image: 'O arquivo deve ser uma imagem do tipo png ou jpg',
            imageSize: 'O tamanho do arquivo não pode ser maior que 2MB',
            minYear: 'A data não pode ser menor que 1900',
            currentYear: 'A data não pode ser maior que o ano atual',
            email: 'formato de email inválido',
            phone: 'Formato de telefone inválido',
            min: min => `O campo deve conter no mínimo ${min} caracteres`,
            max: max => `O campo deve conter no máximo ${max} caracteres`,
            difDate: date => {
                date = date.includes('-') ? moment(date).format('DD/MM/YYYY') : moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
                return `A data não pode ser menor que ${date}`
            },
            cnpj: 'Formato de cnpj inválido',
            minValue: min => `O campo deve ter um valor maior ou igual a ${min.replace('.', ',')}`,
            maxValue: max => `O campo deve ter um valor menor ou igual a ${max.replace('.', ',')}`,
            minChar: min => `O campo deve ter pelo menos ${min} caracteres.`,
            maxChar: max => `O campo deve ter no máximo ${max} caracteres.`,
            minStringInvert: min => `O campo deve ter um valor maior ou igual a ${min}`,
            exactSize: size => `O campo deve ter ${size} caracteres`,
            sameString: str => 'O campo dever equivalente',
            sameDate: date => {
                date = date.split('-')
                date = `${date[2]}/${date[1]}/${date[0]}`
                return `A data deve ser equivalente a ${date}`
            },
            duplicateValue: () => 'Valor duplicado.',
            isPhoneNumber: 'Formato de telefone inválido.',
        }
    }
}