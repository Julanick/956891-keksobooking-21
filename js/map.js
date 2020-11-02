"use strict";
(function () {

  const pinTemplate = document.querySelector(`#pin`).content;

  const map = document.querySelector(`.map`);

  const mapPinsContainer = map.querySelector(`.map__pins`);

  const renderPins = function (data) {
    const fragment = document.createDocumentFragment();

    data.forEach(function (dataElement) {
      const element = pinTemplate.cloneNode(true);
      const button = element.querySelector(`.map__pin`);
      button.setAttribute(`style`, `left: ` + dataElement.location.x + `px; top: ` + dataElement.location.y + `px`);

      const img = element.querySelector(`img`);
      img.src = dataElement.author.avatar;
      img.alt = dataElement.offer.title;

      fragment.appendChild(element);
    });


    mapPinsContainer.appendChild(fragment);
  };

  window.map = {
    renderPins
  };

})();
