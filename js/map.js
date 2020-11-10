"use strict";
(function () {

  let data = [];

  const pinTemplate = document.querySelector(`#pin`).content;

  const map = document.querySelector(`.map`);
  const mainPinMap = map.querySelector(`.map__pin--main`);

  const mapPinsContainer = map.querySelector(`.map__pins`);

  const renderPins = function () {
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

  const setMapData = function (pinData) {
    pinData.forEach(function (pin, index) {
      pin.id = index;
      data.push(pin);
    });
  };

  const onAddsLoadSuccess = function (pinData) {
    setMapData(pinData);
    renderPins();
  };

  const onAddsLoadError = function (errorMessage) {
    window.messages.showErrorMessage(errorMessage);
  };

  const activate = function () {
    map.classList.remove(`map--faded`);
    window.networkRequests.loadAds(onAddsLoadSuccess, onAddsLoadError);
  };

  const deactivate = function () {
    map.classList.add(`map--faded`);
  };

  const getMapWidth = function () {
    return mapPinsContainer.width;
  };

  window.map = {
    activate,
    deactivate,
    data,
    mainPinMap,
    mapPinsContainer,
    getMapWidth
  };

})();
