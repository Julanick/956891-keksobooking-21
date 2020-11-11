"use strict";
(function () {
  const cardTemplate = document.querySelector(`#card`).content;

  const map = document.querySelector(`.map`);

  const mapFiltersContainer = map.querySelector(`.map__filters-container`);

  let activeCard = null;

  const hideElement = function (element) {
    element.style.display = `none`;
  };

  const getFeatureElement = function (featureName) {
    const element = document.createElement(`li`);
    element.classList.add(`popup__feature`);
    element.classList.add(`popup__feature--` + featureName);

    return element;
  };

  const removeActiveCard = function () {
    if (activeCard) {
      window.map.deactivatePin();
      activeCard.remove();
      activeCard = null;
    }
  };

  const onDocumentEscKeydown = (evt) => {
    if (window.utils.isEscPressed(evt)) {
      removeActiveCard();
      document.removeEventListener(`keydown`, onDocumentEscKeydown);
    }
  };

  const renderCard = function (dataElement) {
    removeActiveCard();
    const element = cardTemplate.cloneNode(true);
    activeCard = element.firstElementChild;
    const offer = dataElement.offer;
    const author = dataElement.author;

    const title = element.querySelector(`.popup__title`);
    if (offer.title) {
      title.innerText = offer.title;
    } else {
      hideElement(title);
    }

    const addressPopup = element.querySelector(`.popup__text--address`);
    if (offer.address) {
      addressPopup.innerText = offer.address;
    } else {
      hideElement(addressPopup);
    }

    const price = element.querySelector(`.popup__text--price`);
    if (offer.price) {
      price.innerText = offer.price + `₽/ночь`;
    } else {
      hideElement(price);
    }

    let typeText = ``;
    const type = element.querySelector(`.popup__type`);
    if (offer.type) {
      switch (offer.type) {
        case window.enums.Types.FLAT:
          typeText = window.enums.TypesRus.FLAT;
          break;
        case window.enums.Types.BUNGALOW:
          typeText = window.enums.TypesRus.BUNGALOW;
          break;
        case window.enums.Types.HOUSE:
          typeText = window.enums.TypesRus.HOUSE;
          break;
        case window.enums.Types.PALACE:
          typeText = window.enums.TypesRus.PALACE;
          break;
      }

      type.innerText = typeText;
    } else {
      hideElement(type);
    }

    const capacity = element.querySelector(`.popup__text--capacity`);
    if (offer.rooms && offer.guests) {
      capacity.innerText = `${offer.rooms} комнаты для ${offer.guests} человек`;
    } else {
      hideElement(capacity);
    }

    const time = element.querySelector(`.popup__text--time`);
    if (offer.checkin && offer.checkout) {
      time.innerText = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
    } else {
      hideElement(time);
    }

    const featureContainer = element.querySelector(`.popup__features`);
    featureContainer.innerHTML = ``;
    if (offer.features.length > 0) {
      offer.features.forEach(function (feature) {
        const featureElement = getFeatureElement(feature);
        featureContainer.appendChild(featureElement);
      });
    } else {
      hideElement(featureContainer);
    }

    const description = element.querySelector(`.popup__description`);
    if (offer.description) {
      description.innerText = offer.description;
    } else {
      hideElement(description);
    }

    const avatar = element.querySelector(`.popup__avatar`);
    if (author.avatar) {
      avatar.src = author.avatar;
    } else {
      hideElement(avatar);
    }

    const photosContainer = element.querySelector(`.popup__photos`);
    if (offer.photos.length > 0) {
      const imgTemplate = photosContainer.querySelector(`img`);

      const createImg = function (src) {
        const imgElement = imgTemplate.cloneNode(true);
        imgElement.src = src;
        return imgElement;
      };

      photosContainer.innerHTML = ``;
      offer.photos.forEach(function (photo) {
        const img = createImg(photo);
        photosContainer.appendChild(img);
      });
    } else {
      hideElement(photosContainer);
    }

    const closeButton = element.querySelector(`.popup__close`);
    closeButton.addEventListener(`click`, removeActiveCard);
    document.addEventListener(`keydown`, onDocumentEscKeydown);

    map.insertBefore(element, mapFiltersContainer);
  };

  const renderCardForElement = function (element) {
    const pinElement = element.closest(`.map__pin`);
    if (pinElement && !pinElement.classList.contains(`map__pin--main`) && !element.classList.contains(`map__pin--active`)) {
      const id = pinElement.dataset.id;
      const adData = window.globalVariables.data.find((pinData) => {
        return pinData.id === Number(id);
      });
      if (adData) {
        renderCard(adData);
        window.map.activatePin(pinElement);
      }
    }
  };

  window.card = {
    renderCardForElement,
  };
})();
