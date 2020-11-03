"use strict";
(function () {

  const main = document.querySelector(`main`);
  const map = main.querySelector(`.map`);
  const error = document.querySelector(`#errorMessage`).content;

  const showErrorMessage = function (text) {
    const errorElement = error.cloneNode(true);
    errorElement.querySelector(`.additional__message`).innerText = text;
    main.insertBefore(errorElement, map);

    setTimeout(function () {
      main.querySelector(`.error`).remove();
    }, 2000);
  };

  window.messages = {
    showErrorMessage
  };
})();
