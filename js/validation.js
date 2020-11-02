"use strict";

(function () {
  const RoomsAmount = {
    ONE: `1`,
    TWO: `2`,
    THREE: `3`,
    HUNDRED: `100`,
  };

  const GuestsAmount = {
    ONE: `1`,
    TWO: `2`,
    THREE: `3`,
    NOT_FOR_GUEST: `0`,
  };

  const adForm = document.querySelector(`.ad-form`);
  const guestsSelect = adForm.querySelector(`#capacity`);
  const roomsSelect = adForm.querySelector(`#room_number`);

  const validateCapacity = function () {
    const guestsValue = guestsSelect.value;
    const roomsValue = roomsSelect.value;

    let error = ``;

    if (roomsValue === RoomsAmount.ONE && guestsValue !== GuestsAmount.ONE) {
      error = `1 комната только для 1-го гостя`;
    } else if (
      roomsValue === RoomsAmount.TWO &&
      (guestsValue === GuestsAmount.THREE ||
        guestsValue === GuestsAmount.NOT_FOR_GUEST)
    ) {
      error = `2 комнаты для 1-го или 2-ух гостей`;
    } else if (
      roomsValue === RoomsAmount.THREE &&
      guestsValue === GuestsAmount.NOT_FOR_GUEST
    ) {
      error = `3 комнаты для 1-го, 2-ух или 3-ех гостей`;
    } else if (
      roomsValue === RoomsAmount.HUNDRED &&
      guestsValue !== GuestsAmount.NOT_FOR_GUEST
    ) {
      error = `Это помещение не для гостей`;
    }

    guestsSelect.setCustomValidity(error);
  };

  adForm.addEventListener(`change`, function (evt) {
    switch (evt.target) {
      case guestsSelect:
      case roomsSelect:
        validateCapacity();
        break;
    }
  });
})();
