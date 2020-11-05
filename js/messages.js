"use strict";
(function () {

  const wrapper = document.querySelector(`#errorMessageWrapper`);
  const error = document.querySelector(`#errorMessage`).content;
  const formError = document.querySelector(`#error`).content;
  const formSuccess = document.querySelector(`#success`).content;

  let activeMessage = null;

  const removeActiveMessage = () => {
    wrapper.innerHTML = ``;
    activeMessage = null;
  };

  const showErrorMessage = (text) => {
    activeMessage = error.cloneNode(true);
    activeMessage.querySelector(`.additional__message`).innerText = text;
    const closeButton = activeMessage.querySelector(`.ok-button`);
    document.addEventListener(`keydown`, onDocumentEscKeydown);
    closeButton.addEventListener(`click`, removeActiveMessage);
    wrapper.appendChild(activeMessage);
  };

  const showFormSubmitSuccesMessage = () => {
    activeMessage = formSuccess.cloneNode(true);
    document.addEventListener(`keydown`, onDocumentEscKeydown);
    document.addEventListener(`click`, onDocumentleftMouseClick);
    wrapper.appendChild(activeMessage);
  };

  const showFormSubmitErrorMessage = () => {
    activeMessage = formError.cloneNode(true);
    const closeButton = activeMessage.querySelector(`.error__button`);
    document.addEventListener(`keydown`, onDocumentEscKeydown);
    closeButton.addEventListener(`click`, removeActiveMessage);
    wrapper.appendChild(activeMessage);
  };

  const onDocumentEscKeydown = (evt) => {
    if (window.utils.isEscPressed(evt)) {
      removeActiveMessage();
      document.removeEventListener(`keydown`, onDocumentEscKeydown);
    }
  };

  const onDocumentleftMouseClick = (evt) => {
    if (window.utils.isLeftMousePressed(evt)) {
      removeActiveMessage();
      document.removeEventListener(`keydown`, onDocumentleftMouseClick);
    }
  };

  window.messages = {
    showErrorMessage,
    showFormSubmitSuccesMessage,
    showFormSubmitErrorMessage
  };
})();
