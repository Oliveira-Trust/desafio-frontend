const jsonToCSV = function(dataSource){
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += [
    Object.keys(dataSource[0]).join(";"),
    ...dataSource.map(item => Object.values(item).join(";"))
    ]
    .join("\n")
    .replace(/(^\[)|(\]$)/gm, "");
    const data = encodeURI(csvContent);
    return data
}
export default jsonToCSV
