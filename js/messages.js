"use strict";
(function () {

  const wrapper = document.querySelector(`#errorMessageWrapper`);
  const error = document.querySelector(`#errorMessage`).content;

  let activeMessage = null;

  const removeActiveMessage = () => {
    wrapper.innerHTML = ``;
    activeMessage = null;
  };

  const showErrorMessage = (text) => {
    activeMessage = error.cloneNode(true);
    activeMessage.querySelector(`.additional__message`).innerText = text;
    const closeButton = activeMessage.querySelector(`.ok-button`);
    document.addEventListener(`keydown`, onDocumentKeydown);
    closeButton.addEventListener(`click`, removeActiveMessage);
    wrapper.appendChild(activeMessage);
  };

  const onDocumentKeydown = (evt) => {
    if (window.utils.isEscPressed(evt)) {
      removeActiveMessage();
      document.removeEventListener(`keydown`, onDocumentKeydown);
    }
  };

  window.messages = {
    showErrorMessage
  };
})();
