"use strict";
(function () {
  const BIG_PIN_WIDTH = 65;

  const BIG_PIN_HEIGHT = 65;

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
      x += BIG_PIN_WIDTH / 2;
      y += BIG_PIN_HEIGHT / 2;
    } else {
      x += BIG_PIN_WIDTH / 2;
      y += BIG_PIN_HEIGHT;
    }
    address.value = `${Math.round(x)}, ${Math.round(y)}`;
  };

  window.form = {
    disableAdForm,
    enableAdForm,
    setAddress,
    adForm
  };
})();
