import moment from 'moment'
import validator from '@/utils/validator'

export const methods = {
    globalSort(data, prop, order) {
        return data.sort((a, b) => {
            if (order === null) {
                return a.index !== undefined ? ((a['index'] > b['index'] ? 1 : -1)) : 0
            } else if (a[prop] === b[prop])
                return 0;
            else if (a[prop] === null || a[prop] === '')
                return 1;
            else if (b[prop] === null || b[prop] === '')
                return -1;
            else {
                if (this.isNumber(a[prop])) {
                    let aNumber = this.isNumber(a[prop])
                    let bNumber = this.isNumber(b[prop])
                    if (order.includes('asc')) return aNumber - bNumber
                    return bNumber - aNumber
                }
                if (this.isDate(a[prop].slice(0, 10))) {
                    var c = moment(a[prop].substr(0, 10).split('/').reverse().join('-')).format('X')
                    var d = moment(b[prop].substr(0, 10).split('/').reverse().join('-')).format('X')
                    if (order.includes('asc')) return c - d
                    return d - c
                }
                if (order.includes('asc')) return a[prop].localeCompare(b[prop])
                return b[prop].localeCompare(a[prop])
            }
        })
    },
    isNumber(string) {
        let validation = /^\d+(,\d\d)?$/
        if (!validation.test(string)) return false
        if (typeof string == 'string' && string.match(/(\d+[,.]\d+)/)) return parseFloat(string)
        else if (typeof string == 'string' && string.match(/(\d+)/)) return parseInt(string)
        else if (typeof string == 'number') return string % 1 == 0 ? parseInt(string) : parseFloat(string)
    },
    isDate(d) {
        if (this.isEmpty(d)) return false
        if (d.includes('/')) {
            return moment(d, 'DD/MM/YYYY').isValid() ? true : false
        }
        return moment(d).isValid() ? true : false
    },
    isEmpty(v, validateZero = true) {
        v = this.isNumber(v) ? Number(v) : v
        if (validateZero && v === 0) return true
        return v === undefined || v === null || v === '' || v.length === 0
    },
    dateBRToISO(date) {
        if (this.isEmpty(date) || !this.isDate(date)) return date
        return date.slice(0, 10).split('/').reverse().join('-')
    },
    dateISOToBR(date) {
        if (this.isEmpty(date) || !this.isDate(date)) return ''
        return date.slice(0, 10).split('-').reverse().join('/')
    },
    formatPhoneNumber(phone) {
        if (this.isEmpty(phone)) return ''
        phone = String(phone).replace(/\D/g, '')
        let match = ''
        match = phone.length === 8 ? phone.match(/^(\d{4})(\d{4})$/) : match
        match = phone.length === 9 ? phone.match(/^(\d{5})(\d{4})$/) : match
        match = phone.length === 10 ? phone.match(/^(\d{2})(\d{4})(\d{4})$/) : match
        match = phone.length === 11 ? phone.match(/^(\d{2})(\d{5})(\d{4})$/) : match
        if (match.length > 0) return `(${match[1]}) ${match[2]}-${match[3]}`
        return match
    },
    getDatesByPeriod(start, end) {
        if (this.isEmpty(start) || this.isEmpty(end)) return []
        if (!this.isDate(start) || !this.isDate(end)) return []
        let dates = []
        start = moment(start)
        end = moment(end)

        while (start <= end) {
            dates.push(moment(start).format('YYYY-MM-DD'))
            start = moment(start).add(1, 'days')
        }

        return dates
    },
    treatNullFor(data) {
        let ret = data === null || data === undefined ? {} : data
        if (typeof ret === 'object')
            ret = Object.entries(ret).map(([k, v], i) => ret[k] = v === null ? '' : v)
        if (Array.isArray(ret))
            ret.map((item) => item = item === null ? '' : item)
        return ret

    },
    formatMoney(value) {
        value = String(value).replace(/\D/g, '')
        value = String((Number(value) / 100).toFixed(2))
        value = value.replace('.', ',')
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        return `R$ ${value.replace('R$ ', '')}`
    },
    formatBTC(value) {
        value = String(value).replace(/\D/g, '')
        value = String((Number(value) / 100).toFixed(2))
        value = value.replace('.', ',')
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        return `BTC ${value.replace('BTC ', '')}`
    },
    treatBooleanFor(data) {
        let ret = data
        if (typeof ret === 'object')
            ret = Object.entries(ret).map(([k, v], i) => {
                if (!isNaN(Number(v))) {
                    ret[k] = Number(v) === 1 ? true : (Number(v) === 0 ? false : v)
                }
            })
        if (Array.isArray(ret))
            ret.map((item) => {
                if (!isNaN(Number(item))) {
                    item = Number(item) === 1 ? true : (Number(item) === 0 ? false : item)
                }
            })
        return ret
    },
    clearErrors(field = null) {
        let { errors } = this.form
        if (field !== null) {
            return this.form.errors[field] = ''
        }
        Object.entries(errors).map(([k, v]) => this.form.errors[k] = '')
    },
    clearAllErrors() {
        if (this.isEmpty(this.form.errors)) return false
        Object.entries(this.form.errors).map(([k, v], i) => this.form.errors[k] = '')
    },
    phoneMask(v) {
        let r = v.replace(/\D/g, "");
        r = r.replace(/^0/, "");
        if (r.length > 10) {
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (r.length > 9) {
            r = r.replace(/^(\d\d)(\d{4})(\d{4}).*/, "($1) $2-$3");
        } else if (r.length > 7) {
            r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
        } else if (r.length > 2) {
            r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else if (v.trim() !== "") {
            r = r.replace(/^(\d*)/, "($1");
        }
        return r;
    },
    validateWithRules(field, rules){
        this.clearAllErrors()
        return validator.validate(this.form, this.form.errors, {
            [String(field)]: rules,
        }) && this.clearErrors(field)
    },
    validateDate(field, rules = null) {
        this.clearAllErrors()
        let f = this.form[field], r = rules === null ? ['minDate', 'currentDate'] : rules
        return validator.validate(this.form, this.form.errors, {
            [field]: f !== '' ? r : [],
        }) && this.clearErrors(field)
    },
    validateCPF() {
        this.clearAllErrors()
        return validator.validate(this.form, this.form.errors, {
            cpf: this.form.cpf !== "" ? ['cpf'] : []
        }) && this.clearErrors('cpf')
    },
    validateCNPJ() {
        return validator.validate(this.form, this.form.errors, {
            cpf_cnpj: this.form.cpf_cnpj !== "" ? ['cnpj'] : []
        }) && this.clearErrors('cpf_cnpj')
    },
    validatePhoneNumber(field = null) {
        field = field === null ? 'telefone' : field
        return validator.validate(this.form, this.form.errors, {
            [field]: this.form[field] !== "" ? ['isPhoneNumber'] : []
        }) && this.clearErrors(field)
    },
    validateMatricula() {
        this.clearAllErrors()
        return (
            validator.validate(this.form, this.form.errors, {
                matricula:
                    this.form.matricula !== '' ? ['min:5', 'max:5'] : []
            }) && this.clearErrors('matricula')
        )
    },
    validateEmail(field = null) {
        field = field === null ? 'email' : field
        let rules = {
            [field]: this.form[field] !== "" ? ['email'] : []
        }
        return validator.validate(this.form, this.form.errors, rules) && this.clearErrors(field)
    },
    validateCEP(field = null) {
        field = field === null ? 'cep' : field
        let rules = {
            [field]: this.form[field] !== "" ? ['minChar:8'] : []
        }
        return validator.validate(this.form, this.form.errors, rules) && this.clearErrors(field)
    },
    debug(params, type= 'info') {
        const { NODE_ENV:env } = process.env

        if (env !== 'production') {
            return type === 'info' 
            ? console.log('INFO LOG', params) 
            : console.error('ERROR LOG: ', params)
        }
        return null
    },
}