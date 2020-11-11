"use strict";
(function () {

  let activePin = null;

  const pinTemplate = document.querySelector(`#pin`).content;

  const map = document.querySelector(`.map`);
  const mainPinMap = map.querySelector(`.map__pin--main`);

  const mapPinsContainer = map.querySelector(`.map__pins`);

  const renderPins = function (data) {
    const fragment = document.createDocumentFragment();

    data.forEach(function (dataElement) {
      const element = pinTemplate.cloneNode(true);
      element.firstElementChild.dataset.id = dataElement.id;
      const button = element.querySelector(`.map__pin`);
      button.setAttribute(`style`, `left: ` + dataElement.location.x + `px; top: ` + dataElement.location.y + `px`);

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
