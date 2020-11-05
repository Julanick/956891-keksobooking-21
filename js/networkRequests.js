"use strict";
const ERROR_200 = 200;
const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_404 = 404;
const TIMEOUT_MS = 10000;


(function () {

  const subscribeCallbacks = function (xhr, onSuccess, onError) {
    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case ERROR_200:
          onSuccess(xhr.response);
          break;
        case ERROR_400:
          error = `Неверный запрос`;
          break;
        case ERROR_401:
          error = `Пользователь не авторизован`;
          break;
        case ERROR_404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
  };

  window.sendForm = function (url, onSuccess, onError, formElement) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_MS;

    subscribeCallbacks(xhr, onSuccess, onError);

    xhr.open(`POST`, url);
    xhr.send(new FormData(formElement));
  };

  window.load = function (url, onSuccess, onError) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_MS;

    subscribeCallbacks(xhr, onSuccess, onError);

    xhr.open(`GET`, url);
    xhr.send();
  };
})();
