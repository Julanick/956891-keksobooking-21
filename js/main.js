"use strict";
const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;

const map = document.querySelector(`.map`);
const mainPinMap = map.querySelector(`.map__pin--main`);


const activateApp = function () {
  window.form.enableAdForm();
  map.classList.remove(`map--faded`);
  window.globalVariables.isAppActive = true;
  window.form.setAddress();
};

const initApp = function () {
  window.form.disableAdForm();
  window.form.setAddress();

  mainPinMap.addEventListener(`keydown`, function (evt) {
    evt.preventDefault();
    if (window.utils.isEnterPressed(evt)) {
      activateApp();
    }
  });

  mainPinMap.addEventListener(`mousedown`, function (evt) {
    if (window.utils.isLeftMousePressed(evt)) {
      evt.preventDefault();
      activateApp();
    }
  });

  window.form.formObject.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.form.sendForm();
  });
};

const onAddsLoadSuccess = function (data) {
  window.map.renderPins(data);
  window.card.renderCard(data);
};

const onAddsLoadError = function (errorMessage) {
  window.messages.showErrorMessage(errorMessage);
};

window.load(URL_DATA, onAddsLoadSuccess, onAddsLoadError);

initApp();
