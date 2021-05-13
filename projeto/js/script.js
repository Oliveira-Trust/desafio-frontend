function handleData() {
  async function fetchData() {
    const url = './js/data.json';
    const req = await fetch(url);
    const res = await req.json();
    renderData(res);
  }

  fetchData();

  function addEmployee() {
    const form = document.querySelector('.employee-form');

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
      userAddedSuccessfully();
    }

    function userAddedSuccessfully() {
      const toast = document.querySelector('.toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1500);
    }


    function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(form);
      renderEmployee(formData.values());

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
            listLength();
          });
        }
    }, 200); // a little timer to await DOM render table rows

  }

  removeEmployee();
}

handleData();


function handleModalUserName() {
  const formUserName = document.querySelector('.user-form');

  function invalidFeedback() {
    const invalidElement = document.querySelector('.invalid-feedback');
    invalidElement.style.display = 'block';
    setTimeout(() => invalidElement.style.display = 'none', 1500)
  }

  function disableModal() {
    const modal = document.querySelector('.modal-user');
    modal.style.display = 'none';
  }

  function showUserName(userName) {
    const userDisplay = document.querySelector('.user-display');
    userDisplay.innerHTML = userName;
  }

  function storeUserName(userName) {
    localStorage.setItem('username', userName);
 }

  function handleSubmitUserName(e) {
    e.preventDefault();

    if (formUserName.username.value === '') {
      invalidFeedback();
    } else {
      storeUserName(formUserName.username.value)
      showUserName(formUserName.username.value)
      disableModal();
    } 
  }

  formUserName.addEventListener('submit', handleSubmitUserName);
}

function handleLocalStorage() {
  if (localStorage.length < 1)
    handleModalUserName();
  else {
    disableModal();
    showUserName();
  }

  function disableModal() {
    const modal = document.querySelector('.modal-user');
    modal.style.display = 'none';
  }

  function showUserName() {
    const userDisplay = document.querySelector('.user-display');
    userDisplay.innerHTML = localStorage.getItem('username');
  }
}

handleLocalStorage();


function showSendFilesContainer() {
  const btnLink = document.querySelector('.send-files-link');

  btnLink.addEventListener('click', (e) => {
    e.preventDefault();
    const sendFilesContainer = document.querySelector('.send-files-container');
    sendFilesContainer.classList.add('active');
    console.log('ok');
  })
}

function listLength() {
  setTimeout(() => {
    const tableLength = document.querySelectorAll('tbody tr').length;
    const listCounter = document.querySelector('.list-counter');
    listCounter.innerHTML = tableLength;
  }, 200) // Same as the setTimeout in remove function, to await DOM render table
}

showSendFilesContainer();
listLength();
