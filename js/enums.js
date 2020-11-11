"use strict";
(function () {
  window.enums = {
    Types: {
      PALACE: `palace`,
      FLAT: `flat`,
      HOUSE: `house`,
      BUNGALOW: `bungalow`,
    },
    Price: {
      MAX_PRICE: 1000000,
      PALACE: 10000,
      FLAT: 1000,
      HOUSE: 5000,
      BUNGALOW: 0,
    },
    TypesRus: {
      PALACE: `Дворец`,
      FLAT: `Квартира`,
      HOUSE: `Дом`,
      BUNGALOW: `Бунгало`,
    },
    RoomsAmount: {
      ONE: `1`,
      TWO: `2`,
      THREE: `3`,
      HUNDRED: `100`,
    },
    GuestsAmount: {
      ONE: `1`,
      TWO: `2`,
      THREE: `3`,
      NOT_FOR_GUEST: `0`,
    },
    XhrStatus: {
      OK: 200,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      NOT_FOUND: 404,
    },
    PinSize: {
      WIDTH: 66,
      HEIGHT: 66
    }
  };
})();
