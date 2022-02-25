export const csvExport = arrData => {
  let csvContent = 'data:text/csv;charset=utf-8,'
  csvContent += [
    Object.keys(arrData[0]).join(';'),
    ...arrData.map(item => Object.values(item).join(';'))
  ]
    .join('\n')
    .replace(/(^\[)|(\]$)/gm, '')

  const data = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', 'export.csv')
  link.click()
}
