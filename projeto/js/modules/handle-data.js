import listLength from "./list-length.js";

export default function handleData() {
  async function fetchData() {
    const url = "./js/data.json";
    const req = await fetch(url);
    const res = await req.json();

    renderData(res);
  }

  fetchData();

  function addEmployee() {
    const form = document.querySelector(".employee-form");

    function userAddedSuccessfully() {
      const toast = document.querySelector(".toast");
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1500);
    }

    function renderEmployee(data) {
      const table = document.querySelector("table tbody");
      const row = table.insertRow();

      [data].map((item) => {
        for (let element in item) {
          const cell = row.insertCell();
          const text = document.createTextNode(item[element]);
          cell.appendChild(text);
        }
        const cellBtn = row.insertCell();
        cellBtn.appendChild(createBtnRemove());
      });

      userAddedSuccessfully();
    }

    function removeEmployee() {
      setTimeout(() => {
        const btnInline = document.querySelectorAll(".btn-inline");

        if (btnInline)
          for (let i = 0; i < btnInline.length; i++) {
            btnInline[i].addEventListener("click", () => {
              btnInline[i].parentNode.parentNode.remove();
              listLength();
            });
          }
      }, 200); // a little timer to await DOM render table rows
    }

    removeEmployee();

    function handleSubmit(e) {
      e.preventDefault();

      const formData = new FormData(form);
      renderEmployee(Object.fromEntries(formData.entries()));

      listLength();
      removeEmployee();
    }

    form.addEventListener("submit", handleSubmit);
  }

  addEmployee();

  function createBtnRemove() {
    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "btn-inline btn btn-sm btn-danger");
    btnRemove.innerHTML = "Excluir <i class='ms-2 fas fa-user-slash'></i>";

    return btnRemove;
  }

  function renderData(data) {
    const table = document.querySelector("table tbody");

    data.map((item) => {
      const row = table.insertRow();

      for (let element in item) {
        const cell = row.insertCell();
        const text = document.createTextNode(item[element]);
        cell.appendChild(text);
      }

      const cellBtn = row.insertCell();
      cellBtn.appendChild(createBtnRemove());
    });
  }
}
