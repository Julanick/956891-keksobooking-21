"use strict";

const ADS_NUM = 8;

const pinTemplate = document.querySelector(`#pin`).content;

const mapPins = document.querySelector(`.map__pins`);

const cardTemplate = document.querySelector('#card').content;

const map = document.querySelector('.map');

const mapContainer = document.querySelector(`.map__filters-container`);

const titles = [`title01`, `title02`, `title03`];

const types = [`palace`, `flat", "house`, `bungalow`];

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

  mapPins.appendChild(fragment);
};

const renderCards = function (data) {
  const fragment = document.createDocumentFragment();

  const element = cardTemplate.cloneNode(true);
  const dataElement = data[0];
  const offer = dataElement.offer;
  const author = dataElement.author;

  const title = element.querySelector(`.popup__title`);
  if (offer.title) {
    title.innerText = offer.title;
  } else {
    title.style.display = "none";
  }

  const address = element.querySelector(".popup__text--address");
  if (offer.address) {
    address.innerText = offer.address;
  } else {
    address.style.display = "none";
  }

  const price = element.querySelector(".popup__text--price");
  if (offer.price) {
    price.innerText = offer.price + '₽/ночь';
  } else {
    price.style.display = "none";
  }

  const type = element.querySelector('.popup__type');
  if (offer.type) {
    switch (offer.type) {
      case 'flat': type.innerText = 'Квартира';
        break;
      case 'bungalow': type.innerText = 'Бунгало';
        break;
      case 'house': type.innerText = 'Дом';
        break;
      case 'palace': type.innerText = 'Дворец';
        break;
    }
  } else {
    type.style.display = "none";
  }

  const capacity = element.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    let roomsWord = '';
    switch (offer.rooms) {
      case 1: roomsWord = 'комната';
        break;
      case 2: roomsWord = 'комнаты';
        break;
      case 3: roomsWord = 'комнаты';
        break;
      case 4: roomsWord = 'комнаты';
        break;
      case 5: roomsWord = 'комнат';
        break;
    }

    let guetsWord = 'гостя';

    if (offer.guests > 1) {
      guetsWord = 'гостей';
    }

    capacity.innerText = offer.rooms + ' ' + roomsWord + ' для ' + offer.guests + ' ' + guetsWord + '.';
  } else {
    capacity.style.display = "none";
  }

  const time = element.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    time.innerText = 'Заезд после ' + offer.checkin + ',' + ' выезд до ' + offer.checkout + '.';
  } else {
    time.style.display = "none";
  }

  const features = element.querySelector('.popup__features');
  if (offer.features.length > 0) {
    features.innerText = offer.features.join(', ');
  } else {
    features.style.display = "none";
  }


  const description = element.querySelector('.popup__description');
  if (offer.description) {
    description.innerText = offer.description;
  } else {
    description.style.display = "none";
  }

  const avatar = element.querySelector('.popup__avatar');
  if (author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.style.display = "none";
  }

  const photos = element.querySelector(".popup__photos");
  if (offer.photos.length > 0) {
    const imgTemplate = photos.querySelector("img");

    const createImg = function (src) {
      const imgElement = imgTemplate.cloneNode(true);
      imgElement.src = src;
      return imgElement;
    };

    photos.innerHTML = "";

    for (let i = 0; i < offer.photos.length; i++) {
      const img = createImg(offer.photos[i]);
      photos.appendChild(img);
    }
  } else {
    photos.style.display = "none";
  }

  fragment.appendChild(element);

  map.insertBefore(fragment, mapContainer);
};

const adsData = createAdsData(ADS_NUM);

renderPins(adsData);
renderCards(adsData);
