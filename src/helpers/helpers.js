const normalizeValue = (value) => {
  return String(value).replaceAll('.', '').replace(',', '');
}

export {
  normalizeValue
}