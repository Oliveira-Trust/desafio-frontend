export default function showSendFilesContainer() {
  const btnLink = document.querySelector('.send-files-link');

  btnLink.addEventListener('click', (e) => {
    e.preventDefault();
    const sendFilesContainer = document.querySelector('.send-files-container');
    sendFilesContainer.classList.add('active');
  });
}
