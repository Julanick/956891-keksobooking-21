"use strict";

const ADS_NUM = 8;

const ENTER_KEYCODE = 13;

const BIG_PIN_WIDTH = 65;

const BIG_PIN_HEIGHT = 65;

const LEFT_MOUSE_BUTTON_CODE = 0;

const pinTemplate = document.querySelector(`#pin`).content;

const map = document.querySelector(`.map`);

const mapPinsContainer = map.querySelector(`.map__pins`);

const mapFiltersContainer = map.querySelector(`.map__filters-container`);

const adForm = document.querySelector(`.ad-form`);

const fieldsets = adForm.querySelectorAll(`fieldset`);

const address = document.querySelector(`#address`);

const mainPinMap = document.querySelector(`.map__pin--main`);

const guestsSelect = adForm.querySelector(`#capacity`);

const roomsSelect = adForm.querySelector(`#room_number`);

let isAppActive = false;

const RoomsAmount = {
  ONE: `1`,
  TWO: `2`,
  THREE: `3`,
  HUNDRED: `100`
};

const GuestsAmount = {
  ONE: `1`,
  TWO: `2`,
  THREE: `3`,
  NOT_FOR_GUEST: `0`
};

const validateCapacity = () => {
  const guestsValue = guestsSelect.value;
  const roomsValue = roomsSelect.value;

  let error = ``;

  if (roomsValue === RoomsAmount.ONE && guestsValue !== GuestsAmount.ONE) {
    error = `1 комната только для 1-го гостя`;
  } else if (roomsValue === RoomsAmount.TWO && (guestsValue === GuestsAmount.THREE || guestsValue === GuestsAmount.NOT_FOR_GUEST)) {
    error = `2 комнаты для 1-го или 2-ух гостей`;
  } else if (roomsValue === RoomsAmount.THREE && guestsValue === GuestsAmount.NOT_FOR_GUEST) {
    error = `3 комнаты для 1-го, 2-ух или 3-ех гостей`;
  } else if (roomsValue === RoomsAmount.HUNDRED && guestsValue !== GuestsAmount.NOT_FOR_GUEST) {
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

  map.insertBefore(element, mapFiltersContainer);
};

const disableAdForm = function () {
  adForm.classList.add(`ad-form--disabled`);
  fieldsets.forEach(function (fieldset) {
    fieldset.setAttribute(`disabled`, `true`);
  });
};

const enableAdForm = function () {
  fieldsets.forEach(function (fieldset) {
    fieldset.removeAttribute(`disabled`);
  });
  adForm.classList.remove(`ad-form--disabled`);
};

const activateApp = function () {
  enableAdForm();
  map.classList.remove(`map--faded`);
  isAppActive = true;
  setAddress();
};

const setAddress = function () {
  let x = Number.parseInt(mainPinMap.style.left, 10);
  let y = Number.parseInt(mainPinMap.style.top, 10);
  if (isAppActive === false) {
    x += BIG_PIN_WIDTH / 2;
    y += BIG_PIN_HEIGHT / 2;
  } else {
    x += BIG_PIN_WIDTH / 2;
    y += BIG_PIN_HEIGHT;
  }
  address.value = `${x}, ${y}`;
};

const adsData = createAdsData(ADS_NUM);

renderPins(adsData);
renderCard(adsData);

const initApp = function () {
  disableAdForm();
  setAddress();

  mainPinMap.addEventListener(`keydown`, function (evt) {
    evt.preventDefault();
    if (ENTER_KEYCODE) {
      activateApp();
    }
  });

  mainPinMap.addEventListener(`mousedown`, function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      evt.preventDefault();
      activateApp();
    }
  });
};

initApp();
