"use strict";

const ADS_NUM = 8;

const pinTemplate = document.querySelector(`#pin`).content;

const map = document.querySelector(`.map`);

const mapPinsContainer = map.querySelector(`.map__pins`);

const mapFiltersContainer = map.querySelector(`.map__filters-container`);

const mapFiltersForm = mapFiltersContainer.querySelector(`.map__filters`);

const adFormNotice = document.querySelector(`.ad-form`);

const address = document.querySelector(`#address`);

const mainPinMap = document.querySelector(`.map__pin--main`);

const form = document.querySelector(`.ad-form`);

const guestsSelect = form.querySelector(`#capacity`);

const roomsSelect = form.querySelector(`#room_number`);


const validateCapacity = function () {
  const guestsValue = Number.parseInt(guestsSelect.value, 10);
  const roomsValue = Number.parseInt(roomsSelect.value, 10);

  if (roomsValue === 1 && guestsValue >= 3) {
    guestsSelect.setCustomValidity(`Слишком много гостей для этого количества комнат`);
  } else {
    guestsSelect.setCustomValidity(``);
  }

};

form.addEventListener(`change`, function (evt) {
  switch (evt.target) {
    case guestsSelect:
    case roomsSelect:
      validateCapacity();
      break;
  }
});

const cardTemplate = document.querySelector(`#card`).content;

const titles = [`title01`, `title02`, `title03`];

const types = [`palace`, `flat", "house`, `bungalow`];

const typesEnum = {
  PALACE: `palace`,
  FLAT: `flat`,
  HOUSE: `house`,
  BUNGALOW: `bungalow`,
};

const typesEnumRus = {
  PALACE: `Дворец`,
  FLAT: `Квартира`,
  HOUSE: `Дом`,
  BUNGALOW: `Бунгало`,
};

const times = [`12:00`, `13:00`, `14:00`];

const features = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];

const descriptions = [
  `descriptions01`,
  `descriptions02`,
  `descriptions03`,
  `descriptions04`,
  `descriptions05`,
  `descriptions06`,
  `descriptions07`,
  `descriptions08`,
];

const photos = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];

const getRandomInteger = function (min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomFromArray = function (arr) {
  const rand = getRandomInteger(0, arr.length - 1);
  return arr[rand];
};

const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomArrayElements = function (arr) {
  const shuffledArray = shuffleArray(arr);
  const rand = getRandomInteger(1, shuffledArray.length - 1);
  return shuffledArray.slice(0, rand);
};

const createAdsData = (length) => {
  const array = [];
  for (let i = 1; i <= length; i++) {
    const object = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`,
      },
      offer: {
        title: getRandomFromArray(titles),
        address: `600, 350`,
        price: getRandomInteger(100, 1000),
        type: getRandomFromArray(types),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: getRandomFromArray(times),
        checkout: getRandomFromArray(times),
        features: getRandomArrayElements(features),
        description: getRandomFromArray(descriptions),
        photos: getRandomArrayElements(photos),
      },
      location: {
        x: getRandomInteger(130, 630),
        y: getRandomInteger(130, 630),
      },
    };
    array.push(object);
  }
  return array;
};

const renderPins = function (data) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {

    const element = pinTemplate.cloneNode(true);
    const elementData = data[i];

    const button = element.querySelector(`.map__pin`);
    button.setAttribute(`style`, `left: ` + elementData.location.x + `px; top: ` + elementData.location.y + `px`);

    const img = element.querySelector(`img`);
    img.src = elementData.author.avatar;
    img.alt = elementData.offer.title;

    fragment.appendChild(element);
  }

  mapPinsContainer.appendChild(fragment);
};

const hideElement = function (element) {
  element.style.display = `none`;
};

const getFeatureElement = function (featureName) {
  const element = document.createElement(`li`);
  element.classList.add(`popup__feature`);
  element.classList.add(`popup__feature--` + featureName);

  return element;
};

const renderCard = function (data) {

  const element = cardTemplate.cloneNode(true);
  const dataElement = data[0];
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
      case typesEnum.FLAT: typeText = typesEnumRus.FLAT;
        break;
      case typesEnum.BUNGALOW : typeText = typesEnumRus.BUNGALOW;
        break;
      case typesEnum.HOUSE: typeText = typesEnumRus.HOUSE;
        break;
      case typesEnum.PALACE: typeText = typesEnumRus.PALACE;
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

    for (let i = 0; i < offer.features.length; i++) {
      const featureElement = getFeatureElement(offer.features[i]);
      featureContainer.appendChild(featureElement);
    }

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

    for (let i = 0; i < offer.photos.length; i++) {
      const img = createImg(offer.photos[i]);
      photosContainer.appendChild(img);
    }
  } else {
    hideElement(photosContainer);
  }

  map.insertBefore(element, mapFiltersContainer);
};

const disableElements = function () {
  const fieldsets = document.querySelectorAll(`fieldset`);
  for (let i = 0; i < fieldsets.length; i++) {
    const element = fieldsets[i];
    element.setAttribute(`disabled`, `true`);
  }
  document.querySelector(`.map__filters`).classList.add(`map__filters--disabled`);
  document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
};

const enableFieldsets = function () {
  const fieldsets = document.querySelectorAll(`fieldset`);
  for (let i = 0; i < fieldsets.length; i++) {
    const element = fieldsets[i];
    element.removeAttribute(`disabled`);
  }
};

const activatePage = function () {
  enableFieldsets();
  map.classList.remove(`map--faded`);
  mapFiltersForm.classList.remove(`map__filters--disabled`);
  adFormNotice.classList.remove(`ad-form--disabled`);
};

const setAddress = function (x, y) {
  address.value = `${x}, ${y}`;
};


mainPinMap.addEventListener(`keydown`, function (evt) {
  evt.preventDefault();
  if (evt.keyCode === 13) {
    activatePage();
  }
});

const adsData = createAdsData(ADS_NUM);
renderPins(adsData);

const mapPins = document.querySelectorAll(`.map__pin`);

renderCard(adsData);

disableElements();

(function () {
  const ENTER_KEYCODE = 13;

  mainPinMap.addEventListener(`keydown`, function (evt) {
    evt.preventDefault();
    if (ENTER_KEYCODE) {
      activatePage();
    }
  });
  mapPins.forEach(function (mapPin) {
    mapPin.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();
      let x = parseInt(evt.currentTarget.style.left, 10);
      let y = parseInt(evt.currentTarget.style.top, 10);
      if (mapPin.classList.contains(`map__pin--main`)) {
        x += 32.5;
        y += 32.5;
      } else {
        x += 25;
        y += 70;
      }
      setAddress(x, y);
    });
  });

  mainPinMap.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    activatePage();
  });

})();

