"use strict";
const map = document.querySelector(`.map`);
const mainPinMap = map.querySelector(`.map__pin--main`);

const activateApp = function () {
  window.form.enableAdForm();
  window.networkRequests.loadAds(onAddsLoadSuccess, onAddsLoadError);
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

  window.form.adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.networkRequests.uploadAd(onSendFormSuccess, onSendFormError, window.form.adForm);
  });
};

const onAddsLoadSuccess = function (data) {
  window.map.renderPins(data);
  window.card.renderCard(data);
};

const onAddsLoadError = function (errorMessage) {
  window.messages.showErrorMessage(errorMessage);
};

const onSendFormSuccess = function () {
  window.messages.showFormSubmitSuccessMessage();
};

const onSendFormError = function (error) {
  window.messages.showFormSubmitErrorMessage(error);
};

initApp();
