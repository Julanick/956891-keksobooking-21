"use strict";

const avatars = [
  `img/avatars/user01.png`,
  `img/avatars/user02.png`,
  `img/avatars/user03.png`,
  `img/avatars/user04.png`,
  `img/avatars/user05.png`,
  `img/avatars/user06.png`,
  `img/avatars/user07.png`,
  `img/avatars/user08.png`,
];

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

const randomInteger = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomFromArray = function (arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

const getRandomElements = function (arr, length) {
  let result = [];

  for (let i = 0; i < length; i++) {
    let randomElement = getRandomFromArray(arr);
    result.push(randomElement);
  }

  return result;
};

const createArray = (length) => {
  let array = [];
  for (let index = 1; index <= length; index++) {
    let object = {
      author: {
        avatar: getRandomFromArray(avatars),
      },
      offer: {
        title: getRandomFromArray(titles),
        address: `{{location.x}}, {{location.y}}`,
        price: randomInteger(100, 1000),
        type: getRandomFromArray(types),
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 10),
        checkin: getRandomFromArray(times),
        checkout: getRandomFromArray(times),
        features: getRandomElements(features, randomInteger(1, features.length)),
        description: getRandomFromArray(descriptions),
        photos: getRandomElements(photos, randomInteger(1, photos.length)),
      },
      location: {
        x: randomInteger(130, 630),
        y: randomInteger(130, 630),
      },
    };
    array.push(object);
  }
  return array;
};

let makeElement = function (tagName, className) {
  let element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

let createElement = function (elementData) {
  let listItem = makeElement(`button`, `map__pin`);
  listItem.setAttribute(`style`, `left: ` + elementData.location.x + `px; top: ` + elementData.location.y + `px`);

  let img = makeElement(`img`);
  img.src = elementData.author.avatar;
  img.alt = elementData.offer.title;
  img.setAttribute(`height`, 40);
  img.setAttribute(`width`, 40);
  img.setAttribute(`draggable`, false);

  listItem.appendChild(img);

  return listItem;
};

let mapPins = document.querySelector(`.map__pins`);

createArray(8).forEach((element) => {
  let htmlElement = createElement(element);
  mapPins.appendChild(htmlElement);

});
