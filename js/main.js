"use strict";
const activateApp = function () {
  if (!window.globalVariables.isAppActive) {
    window.form.enableAdForm();
    window.map.activate();
    window.networkRequests.loadAds(onAddsLoadSuccess, onAddsLoadError);
    window.globalVariables.isAppActive = true;
    window.form.setAddress();
  }
};

const onAddsLoadSuccess = function (pinData) {
  pinData.forEach(function (pin, index) {
    pin.id = index;
    window.globalVariables.data.push(pin);
  });
  window.map.renderPins(window.globalVariables.data);
};

const onAddsLoadError = function (errorMessage) {
  window.messages.showErrorMessage(errorMessage);
};

const initApp = function () {
  window.form.disableAdForm();
  window.form.setAddress();

  window.map.mainPinMap.addEventListener(`keydown`, function (evt) {
    evt.preventDefault();
    if (window.utils.isEnterPressed(evt)) {
      activateApp();
    }
  });

  window.map.mainPinMap.addEventListener(`mousedown`, function (evt) {
    if (window.utils.isLeftMousePressed(evt)) {
      evt.preventDefault();
      activateApp();
    }
  });

  window.form.adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.form.submit();
  });

  window.map.mapPinsContainer.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    window.card.renderCardForElement(evt.target);
  });
};

initApp();
