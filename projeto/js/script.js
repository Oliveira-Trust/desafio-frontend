function handleData() {
  async function fetchData() {
    const url = './js/data.json';
    const req = await fetch(url);
    console.log(req);
    const res = await req.json();
    renderData(res);
  }

  fetchData();

  function addEmployee() {
    const form = document.forms[0];

    function renderEmployee(data) {
      const table = document.querySelector("table tbody");
      const row = table.insertRow();
 
      for (let element of data) {
        const cell = row.insertCell();

        for (value in element) {
          const text = document.createTextNode(element[value]);
          cell.appendChild(text);
        }
      }
      const cellBtn = row.insertCell();
      cellBtn.appendChild(createBtnRemove());
    }


    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(form);
      renderEmployee(formData.values());

      removeEmployee();
    }

    form.addEventListener("submit", handleSubmit);
  }

  addEmployee();

  function createBtnRemove() {
    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "btn-inline btn btn-sm btn-danger");
    btnRemove.innerHTML = "Excluir";

    return btnRemove;
  }

  function renderData(data) {
    const table = document.querySelector("table tbody");

    for (let element of data) {
      const row = table.insertRow();
      row.setAttribute("id", element.id);

      for (key in element) {
        const cell = row.insertCell();
        const text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }

      const cellBtn = row.insertCell();
      cellBtn.appendChild(createBtnRemove());
    }
  }

  function removeEmployee() {
    setTimeout(() => {
      const btnInline = document.querySelectorAll(".btn-inline");

      if (btnInline)
        for (let i = 0; i < btnInline.length; i++) {
          btnInline[i].addEventListener("click", () => {
            btnInline[i].parentNode.parentNode.remove();
          });
        }
    }, 200); // a little time to await DOM render table rows
  }

  removeEmployee();
}

handleData();
