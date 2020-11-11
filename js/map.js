"use strict";
(function () {

  let activePin = null;

  const pinTemplate = document.querySelector(`#pin`).content;
  const map = document.querySelector(`.map`);
  const mainPinMap = map.querySelector(`.map__pin--main`);
  const mapPinsContainer = map.querySelector(`.map__pins`);

  const MIN_Y_COORDINATE = 130 - window.enums.PinSize.HEIGHT;
  const MAX_Y_COORDINATE = 630 - window.enums.PinSize.HEIGHT;
  const MIN_X_COORDINATE = 0 - window.enums.PinSize.WIDTH / 2;
  const MAX_X_COORDINATE = 1200 - window.enums.PinSize.WIDTH / 2;

  mainPinMap.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let top = mainPinMap.offsetTop - shift.y;
      let left = mainPinMap.offsetLeft - shift.x;

      window.form.setAddress();

      if (top <= MIN_Y_COORDINATE) {
        top = MIN_Y_COORDINATE;
      }
      if (top >= MAX_Y_COORDINATE) {
        top = MAX_Y_COORDINATE;
      }
      if (left <= MIN_X_COORDINATE) {
        left = MIN_X_COORDINATE;
      }
      if (left >= MAX_X_COORDINATE) {
        left = MAX_X_COORDINATE;
      }

      mainPinMap.style.top = top + `px`;
      mainPinMap.style.left = left + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPinMap.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPinMap.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const renderPins = function (data) {
    const fragment = document.createDocumentFragment();

    data.forEach(function (dataElement) {
      const element = pinTemplate.cloneNode(true);
      element.firstElementChild.dataset.id = dataElement.id;
      const button = element.querySelector(`.map__pin`);
      const left = dataElement.location.x - window.enums.PinSize.WIDTH / 2;
      const top = dataElement.location.y - window.enums.PinSize.HEIGHT;
      button.setAttribute(`style`, `left: ` + left + `px; top: ` + top + `px`);

      const img = element.querySelector(`img`);
      img.src = dataElement.author.avatar;
      img.alt = dataElement.offer.title;

      fragment.appendChild(element);
    });


    mapPinsContainer.appendChild(fragment);
  };

  const activate = function () {
    map.classList.remove(`map--faded`);
  };

  const deactivate = function () {
    map.classList.add(`map--faded`);
  };

  const activatePin = function (pinElement) {
    pinElement.classList.add(`map__pin--active`);
    activePin = pinElement;
  };

  const deactivatePin = function () {
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
      activePin = null;
    }
  };

  window.map = {
    activate,
    deactivate,
    renderPins,
    mainPinMap,
    mapPinsContainer,
    activatePin,
    deactivatePin
  };

})();
