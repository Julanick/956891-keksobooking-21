"use strict";

// const ADS_NUM = 8;

const ENTER_KEYCODE = 13;

const LEFT_MOUSE_BUTTON_CODE = 0;

const map = document.querySelector(`.map`);
const mainPinMap = document.querySelector(`.map__pin--main`);


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
    if (ENTER_KEYCODE) {
      activateApp();
    }
  });

  mainPinMap.addEventListener(`mousedown`, function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      evt.preventDefault();
      activateApp();
    }
  });
};

// const adsData = window.data.createAdsData(ADS_NUM);

window.load(`https://21.javascript.pages.academy/keksobooking/datah`,
    function (data) {
      window.map.renderPins(data);
      window.card.renderCard(data);
    },
    function (errorMessage) {
      window.messages.showErrorMessage(errorMessage);
    }
);

initApp();
