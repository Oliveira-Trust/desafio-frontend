function handleData() {
  async function fetchData() {
    const url = './js/data.json';
    const req = await fetch(url);
    const res = await req.json();
    renderData(res);
  }
  fetchData();

  function renderData(data) {
    const table = document.querySelector('table tbody');

    for (let element of data) {
      const row = table.insertRow();
      row.setAttribute('id', element.id);
  
      for (key in element) {
        const cell = row.insertCell();
        const text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
}

handleData();