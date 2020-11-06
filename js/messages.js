"use strict";
(function () {

  const main = document.querySelector(`main`);
  const error = document.querySelector(`#errorMessage`).content;
  const formError = document.querySelector(`#error`).content;
  const formSuccess = document.querySelector(`#success`).content;

  let activeMessage = null;

  const removeActiveMessage = () => {
    activeMessage.remove();
    activeMessage = null;
  };

  const showErrorMessage = (text) => {
    const message = error.cloneNode(true);
    activeMessage = message.firstElementChild;
    activeMessage.querySelector(`.additional__message`).innerText = text;
    const closeButton = activeMessage.querySelector(`.ok-button`);
    document.addEventListener(`keydown`, onDocumentEscKeydown);
    document.addEventListener(`click`, onDocumentleftMouseClick);
    closeButton.addEventListener(`click`, removeActiveMessage);
    main.appendChild(activeMessage);
  };

  const showFormSubmitSuccessMessage = () => {
    const message = formSuccess.cloneNode(true);
    activeMessage = message.firstElementChild;
    document.addEventListener(`keydown`, onDocumentEscKeydown);
    document.addEventListener(`click`, onDocumentleftMouseClick);
    main.appendChild(activeMessage);
  };

  const showFormSubmitErrorMessage = () => {
    const message = formError.cloneNode(true);
    activeMessage = message.firstElementChild;
    const closeButton = activeMessage.querySelector(`.error__button`);
    document.addEventListener(`keydown`, onDocumentEscKeydown);
    document.addEventListener(`click`, onDocumentleftMouseClick);
    closeButton.addEventListener(`click`, removeActiveMessage);
    main.appendChild(activeMessage);
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
    showFormSubmitSuccessMessage,
    showFormSubmitErrorMessage
  };
})();
