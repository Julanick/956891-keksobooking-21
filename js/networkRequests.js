"use strict";

const ADS_LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;

const AD_UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

const TIMEOUT_MS = 10000;

const XhrStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

(function () {
  const prepareXhr = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case XhrStatus.OK:
          onSuccess(xhr.response);
          break;
        case XhrStatus.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case XhrStatus.UNAUTHORIZED:
          error = `Пользователь не авторизован`;
          break;
        case XhrStatus.NOT_FOUND:
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

    return xhr;
  };

  const uploadAd = function (onSuccess, onError, formData) {
    const xhr = prepareXhr(onSuccess, onError);
    xhr.open(`POST`, AD_UPLOAD_URL);
    xhr.send(formData);
  };

  const loadAds = function (onSuccess, onError) {
    const xhr = prepareXhr(onSuccess, onError);
    xhr.open(`GET`, ADS_LOAD_URL);
    xhr.send();
  };

  window.networkRequests = {
    loadAds,
    uploadAd,
  };
})();
