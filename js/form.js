"use strict";
(function () {
  const mainPinMap = document.querySelector(`.map__pin--main`);

  const address = document.querySelector(`#address`);

  const adForm = document.querySelector(`.ad-form`);

  const fieldsets = adForm.querySelectorAll(`fieldset`);

  const disableAdForm = function () {
    adForm.classList.add(`ad-form--disabled`);
    fieldsets.forEach(function (fieldset) {
      fieldset.setAttribute(`disabled`, `true`);
    });
  };

  const enableAdForm = function () {
    fieldsets.forEach(function (fieldset) {
      fieldset.removeAttribute(`disabled`);
    });
    adForm.classList.remove(`ad-form--disabled`);
  };

  const setAddress = function () {
    let x = Number.parseInt(mainPinMap.style.left, 10);
    let y = Number.parseInt(mainPinMap.style.top, 10);
    if (window.globalVariables.isAppActive) {
      x += window.enums.PinSize.WIDTH / 2;
      y += window.enums.PinSize.HEIGHT;
    } else {
      x += window.enums.PinSize.WIDTH / 2;
      y += window.enums.PinSize.HEIGHT / 2;
    }
    address.value = `${Math.round(x)}, ${Math.round(y)}`;
  };

  const onSendFormSuccess = function () {
    window.messages.showFormSubmitSuccessMessage();
  };

  const onSendFormError = function (error) {
    window.messages.showFormSubmitErrorMessage(error);
  };

  const submit = function () {
    const formData = new FormData(adForm);
    window.networkRequests.uploadAd(onSendFormSuccess, onSendFormError, formData);
  };

  window.form = {
    disableAdForm,
    enableAdForm,
    setAddress,
    submit,
    adForm
  };
})();
