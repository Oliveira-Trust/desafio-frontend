export default function listLength() {
  setTimeout(() => {
    const tableLength = document.querySelectorAll('tbody tr').length;
    const listCounter = document.querySelector('.list-counter');
    listCounter.innerHTML = tableLength;
  }, 200) // Same as the setTimeout in remove function, to await DOM render table
}