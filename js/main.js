/* eslint-disable no-unused-vars */
"use strict";

const ADS_NUM = 8;

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

const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomArrayElements = function (arr) {
  const shuffledArray = shuffle(arr);
  const rand = getRandomInteger(1, shuffledArray.length - 1);
  return shuffledArray.slice(0, rand);
};

const createAdsData = (length) => {
  const array = [];
  for (let index = 1; index <= length; index++) {
    const object = {
      author: {
        avatar: `img/avatars/user0` + index + `.png`,
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

const template = document.querySelector(`#pin`).content;

const fragment = document.createDocumentFragment();

const data = createAdsData(ADS_NUM);

data.forEach((elementData) => {
  let element = template.cloneNode(true);

  let button = element.querySelector(`.map__pin`);
  button.setAttribute(`style`, `left: ` + elementData.location.x + `px; top: ` + elementData.location.y + `px`);

  let img = element.querySelector(`img`);
  img.src = elementData.author.avatar;
  img.alt = elementData.offer.title;

  fragment.appendChild(element);
});

const mapPins = document.querySelector(`.map__pins`);

mapPins.appendChild(fragment);
