export const validationRules = {
  required: value => !!value || 'Required.',
  counter: value => value.length <= 50 || 'Max 50 characters',
  number: value => !isNaN(parseFloat(value)) && isFinite(value),
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
  date: value => {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    return pattern.test(value) || 'Invalid date (format: dd/mm/yy or dd/mm/yyyy)'
  },
}