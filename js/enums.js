"use strict";
(function () {
  window.enums = {
    Types: {
      PALACE: `palace`,
      FLAT: `flat`,
      HOUSE: `house`,
      BUNGALOW: `bungalow`,
      ANY: `any`,
    },
    Price: {
      MAX_PRICE: 1000000,
      PALACE: 10000,
      FLAT: 1000,
      HOUSE: 5000,
      BUNGALOW: 0,
    },
    HousingPrice: {
      ANY: `any`,
      MIDDLE: `middle`,
      LOW: `low`,
      HIGH: `high`,
    },
    HousingPriceRange: {
      MIN: 0,
      MIDDLE: 10000,
      HIGH: 50000,
      MAX: 1000000
    },
    HousingRooms: {
      ANY: `any`,
      ONE: `1`,
      TWO: `2`,
      THREE: `3`,
    },
    HousingGuests: {
      ANY: `any`,
      NOT_FOR_GUESTS: `0`,
      ONE: `1`,
      TWO: `2`,
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
