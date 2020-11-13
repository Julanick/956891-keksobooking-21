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

const deactivateApp = function () {
  window.form.disableAdForm();
  window.filters.deactivate();
  window.map.deactivate();
  window.card.removeActiveCard();
  window.globalVariables.isAppActive = false;
  window.globalVariables.data = [];
  window.form.setAddress();
};

const onAddsLoadSuccess = function (pinData) {
  window.filters.activate();
  pinData.forEach(function (pin, index) {
    pin.id = index;
    window.globalVariables.data.push(pin);
  });
  const filteredData = window.filters.filter(window.globalVariables.data);
  window.map.renderPins(filteredData);
};

const onAddsLoadError = function (errorMessage) {
  window.messages.showErrorMessage(errorMessage);
};

const onSendFormSuccess = function () {
  window.messages.showFormSubmitSuccessMessage();
  deactivateApp();
};

const onSendFormError = function (error) {
  window.messages.showFormSubmitErrorMessage(error);
};

const onFilterChange = window.utils.debounce(function (evt) {
  evt.preventDefault();
  window.card.removeActiveCard();
  window.map.removePins();
  const filteredData = window.filters.filter(window.globalVariables.data);
  window.map.renderPins(filteredData);
});

const initApp = function () {
  deactivateApp();

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
    const formData = new FormData(window.form.adForm);
    window.networkRequests.uploadAd(onSendFormSuccess, onSendFormError, formData);
  });

  window.form.resetButton.addEventListener(`click`, deactivateApp);

  window.map.mapPinsContainer.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.card.renderCardForElement(evt.target);
  });

  window.filters.adFilter.addEventListener(`change`, onFilterChange);
};

initApp();
