export const convertDate = function(dateString) {
  const date = new Date(dateString.split("/").reverse().join("-"));
  return date.toISOString();
  }
export const reconvertDate = function(date) {
  const dateObject = new Date(date);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${day}/${month}/${year}`;
}