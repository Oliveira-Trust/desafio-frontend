const fileExporter = function(file, fileName){  
  const link = document.createElement("a");
  link.setAttribute("href", file);
  link.setAttribute("download", fileName);
  link.click();    
}
export default fileExporter