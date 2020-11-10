"use strict";
(function () {

  const MAX_Y = 630;
  const MIN_Y = 130;

  const MAX_X = window.map.getMapWidth();
  const MIN_X = 0;

  const adForm = document.querySelector(`.ad-form`);
  const guestsSelect = adForm.querySelector(`#capacity`);
  const roomsSelect = adForm.querySelector(`#room_number`);
  const titleInput = adForm.querySelector(`#title`);
  const priceInput = adForm.querySelector(`#price`);
  const typeSelect = adForm.querySelector(`#type`);
  const addressInput = adForm.querySelector(`#address`);
  const timeinSelect = adForm.querySelector(`#timein`);
  const timeoutSelect = adForm.querySelector(`#timeout`);

  const validateTitle = function () {
    const value = titleInput.value.trim();

    let error = ``;

    if (!value) {
      error = `Заголовок объявления обязателен для заполнения`;
    } else if (value.length < 30) {
      error = `Минимальная длинна заголовка 30 символов`;
    } else if (value.length > 100) {
      error = `Максимальная длинна заголовка 100 символов`;
    }

    titleInput.setCustomValidity(error);
  };

  const validateTypeAndPrice = function () {
    const value = priceInput.value.trim();
    const typeValue = typeSelect.value;
    const number = Number.parseInt(value, 10);

    let error = ``;

    if (!value) {
      error = `Поле с ценой является обязательным`;
    } if (isNaN(number)) {
      error = `Значение цены должно быть числовым`;
    } else if (number > 1000000) {
      error = `Максимальная цена 1000000 руб.`;
    } else if (typeValue === window.enums.Types.FLAT && number < 1000) {
      error = `Минимальная цена за квартиру 1000 руб.`;
    } else if (typeValue === window.enums.Types.HOUSE && number < 5000) {
      error = `Минимальная цена за дом 5000 руб.`;
    } else if (typeValue === window.enums.Types.PALACE && number < 10000) {
      error = `Минимальная цена за дворец 10000 руб.`;
    }

    priceInput.setCustomValidity(error);
  };

  const validateAddress = function () {
    const addressValue = addressInput.value.trim();

    let error = ``;

    if (!addressValue) {
      error = `Обязательное поле`;
    } else {
      const coordinates = addressValue.split(`,`);
      const x = Number.parseInt(coordinates[0], 10);
      const y = Number.parseInt(coordinates[1], 10);
      if (x <= MIN_X || x >= MAX_X) {
        error = `Значение координаты Х должно быть в диапазоне `;
      } else if (y <= MIN_Y || y >= MAX_Y) {
        error = `Значение координаты Y должно быть в диапазоне от 130 до 630 `;
      }
    }

    addressInput.setCustomValidity(error);
  };

  const updateTimein = function () {
    timeinSelect.value = timeoutSelect.value;
  };

  const updateTimeout = function () {
    timeoutSelect.value = timeinSelect.value;
  };

  const validateCapacity = function () {
    const guestsValue = guestsSelect.value;
    const roomsValue = roomsSelect.value;

    let error = ``;

    if (roomsValue === window.enums.RoomsAmount.ONE && guestsValue !== window.enums.GuestsAmount.ONE) {
      error = `1 комната только для 1-го гостя`;
    } else if (
      roomsValue === window.enums.RoomsAmount.TWO &&
      (guestsValue === window.enums.GuestsAmount.THREE ||
        guestsValue === window.enums.GuestsAmount.NOT_FOR_GUEST)
    ) {
      error = `2 комнаты для 1-го или 2-ух гостей`;
    } else if (
      roomsValue === window.enums.RoomsAmount.THREE &&
      guestsValue === window.enums.GuestsAmount.NOT_FOR_GUEST
    ) {
      error = `3 комнаты для 1-го, 2-ух или 3-ех гостей`;
    } else if (
      roomsValue === window.enums.RoomsAmount.HUNDRED &&
      guestsValue !== window.enums.GuestsAmount.NOT_FOR_GUEST
    ) {
      error = `Это помещение не для гостей`;
    }

    guestsSelect.setCustomValidity(error);
  };

  const updatePricePlaceholder = function () {
    const typeValue = typeSelect.value;

    let placeholder = `5000`;
    if (typeValue === window.enums.Types.BUNGALOW) {
      placeholder = `0`;
    } else if (typeValue === window.enums.Types.FLAT) {
      placeholder = `1000`;
    } else if (typeValue === window.enums.Types.HOUSE) {
      placeholder = `5000`;
    } else if (typeValue === window.enums.Types.PALACE) {
      placeholder = `10000`;
    }

    priceInput.placeholder = placeholder;
  };

  adForm.addEventListener(`change`, function (evt) {
    switch (evt.target) {
      case guestsSelect:
      case roomsSelect:
        validateCapacity();
        break;
      case titleInput:
        validateTitle();
        break;
      case priceInput:
        validateTypeAndPrice();
        break;
      case typeSelect:
        updatePricePlaceholder();
        validateTypeAndPrice();
        break;
      case addressInput:
        validateAddress();
        break;
      case timeinSelect:
        updateTimeout();
        break;
      case timeoutSelect:
        updateTimein();
        break;
    }
  });
})();
