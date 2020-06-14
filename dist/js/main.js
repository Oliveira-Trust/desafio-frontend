
const toggleNavbar = collapseID => {
  document.getElementById(collapseID).classList.toggle("hidden");
  document.getElementById(collapseID).classList.toggle("bg-white");
  document.getElementById(collapseID).classList.toggle("m-2");
  document.getElementById(collapseID).classList.toggle("py-3");
  document.getElementById(collapseID).classList.toggle("px-6");
}

const openDropdown = (event, dropdownID) => {
  let element = event.target;
  while (element.nodeName !== "A") {
    element = element.parentNode;
  }
  let popper = new Popper(element, document.getElementById(dropdownID), {
    placement: "bottom-end"
  });
  document.getElementById(dropdownID).classList.toggle("hidden");
  document.getElementById(dropdownID).classList.toggle("block");
}

let elEmployeers = document.querySelector('.funcionarios');
fetch('./json/funcionarios.json')
  .then(response => response.json())
  .then(
    data => {
      for (employee in data.funcionario) {
        elEmployeers.innerHTML += `<tr>
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">${data.funcionario[employee].id}</th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"> ${data.funcionario[employee].name} </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"> ${data.funcionario[employee].lastname} </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"> ${data.funcionario[employee].position} </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"> ${data.funcionario[employee].sector} </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"> ${data.funcionario[employee].datetime} </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"> <i class="far fa-edit pr-4 text-orange-500"></i> <i class="far fa-trash-alt text-red-500"></i> </td>
        </tr>`
      }
    }
  )