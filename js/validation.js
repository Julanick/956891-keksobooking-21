"use strict";
(function () {
  const adForm = document.querySelector(`.ad-form`);
  const guestsSelect = adForm.querySelector(`#capacity`);
  const roomsSelect = adForm.querySelector(`#room_number`);
  const titleInput = adForm.querySelector(`#title`);
  const priceInput = adForm.querySelector(`#price`);
  const typeSelect = adForm.querySelector(`#type`);
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
    } else if (number > window.enums.Price.MAX_PRICE) {
      error = `Максимальная цена 1000000 руб.`;
    } else if (typeValue === window.enums.Types.FLAT && number < window.enums.Price.FLAT) {
      error = `Минимальная цена за квартиру 1000 руб.`;
    } else if (typeValue === window.enums.Types.HOUSE && number < window.enums.Price.HOUSE) {
      error = `Минимальная цена за дом 5000 руб.`;
    } else if (typeValue === window.enums.Types.PALACE && number < window.enums.Price.PALACE) {
      error = `Минимальная цена за дворец 10000 руб.`;
    }

    priceInput.setCustomValidity(error);
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

    let placeholder = window.enums.Price.FLAT;
    if (typeValue === window.enums.Types.BUNGALOW) {
      placeholder = window.enums.Price.BUNGALOW;
    } else if (typeValue === window.enums.Types.FLAT) {
      placeholder = window.enums.Price.FLAT;
    } else if (typeValue === window.enums.Types.HOUSE) {
      placeholder = window.enums.Price.HOUSE;
    } else if (typeValue === window.enums.Types.PALACE) {
      placeholder = window.enums.Price.PALACE;
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
      case timeinSelect:
        updateTimeout();
        break;
      case timeoutSelect:
        updateTimein();
        break;
    }
  });
})();
