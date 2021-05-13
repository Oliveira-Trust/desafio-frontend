export default function handleLocalStorage() {
  function disableModal() {
    const modal = document.querySelector(".modal-user");
    modal.style.display = "none";
  }

  function showUserName() {
    const userDisplay = document.querySelector(".user-display");
    userDisplay.innerHTML = localStorage.getItem("username");
  }

  function handleModalUserName() {
    const formUserName = document.querySelector(".user-form");

    function invalidFeedback() {
      const invalidElement = document.querySelector(".invalid-feedback");
      invalidElement.style.display = "block";
      setTimeout(() => (invalidElement.style.display = "none"), 1500);
    }

    function disableModal() {
      const modal = document.querySelector(".modal-user");
      modal.style.display = "none";
    }

    function showUserName(userName) {
      const userDisplay = document.querySelector(".user-display");
      userDisplay.innerHTML = userName;
    }

    function storeUserName(userName) {
      localStorage.setItem("username", userName);
    }

    function handleSubmitUserName(e) {
      e.preventDefault();

      if (formUserName.username.value === "") {
        invalidFeedback();
      } else {
        storeUserName(formUserName.username.value);
        showUserName(formUserName.username.value);
        disableModal();
      }
    }

    formUserName.addEventListener("submit", handleSubmitUserName);
  }

  if (localStorage.length < 1) handleModalUserName();
  else {
    disableModal();
    showUserName();
  }
}
