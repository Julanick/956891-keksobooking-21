"use strict";
(function () {
  const MAX_PIN_NUMBER = 5;

  const adFilter = document.querySelector(`.map__filters`);
  const filters = adFilter.querySelectorAll(`.map__filter`);
  const features = adFilter.querySelectorAll(`.map__features`);
  const typeFilter = adFilter.querySelector(`#housing-type`);
  const priceFilter = adFilter.querySelector(`#housing-price`);
  const roomsFilter = adFilter.querySelector(`#housing-rooms`);
  const guestsFilter = adFilter.querySelector(`#housing-guests`);

  const wifi = adFilter.querySelector(`#filter-wifi`);
  const dishwasher = adFilter.querySelector(`#filter-dishwasher`);
  const parking = adFilter.querySelector(`#filter-parking`);
  const washer = adFilter.querySelector(`#filter-washer`);
  const elevator = adFilter.querySelector(`#filter-elevator`);
  const conditioner = adFilter.querySelector(`#filter-conditioner`);

  const desableElements = function (elements) {
    elements.forEach(function (element) {
      element.setAttribute(`disabled`, `true`);
    });
  };

  const enableElements = function (elements) {
    elements.forEach(function (element) {
      element.removeAttribute(`disabled`);
    });
  };

  const filterByType = function (data) {
    const filterValue = typeFilter.value;

    if (filterValue === window.enums.Types.ANY) {
      return true;
    }

    return data.offer.type === filterValue;
  };

  const filterByPrice = function (data) {
    const filterValue = priceFilter.value;

    if (filterValue === window.enums.HousingPrice.ANY) {
      return true;
    }

    let minPrice = window.enums.HousingPriceRange.MIN;
    let maxPrice = window.enums.HousingPriceRange.MAX;

    if (filterValue === window.enums.HousingPrice.LOW) {
      maxPrice = window.enums.HousingPriceRange.MIDDLE;
    }

    if (filterValue === window.enums.HousingPrice.MIDDLE) {
      minPrice = window.enums.HousingPriceRange.MIDDLE;
      maxPrice = window.enums.HousingPriceRange.MAX;
    }

    if (filterValue === window.enums.HousingPrice.HIGH) {
      minPrice = window.enums.HousingPriceRange.HIGH;
      maxPrice = window.enums.HousingPriceRange.MAX;
    }

    return data.offer.price >= minPrice && data.offer.price <= maxPrice;
  };

  const filterByRooms = function (data) {
    const filterValue = roomsFilter.value;

    if (filterValue === window.enums.HousingRooms.ANY) {
      return true;
    }

    return data.offer.rooms === Number.parseInt(filterValue, 10);
  };

  const filterByGuests = function (data) {
    const filterValue = guestsFilter.value;

    if (filterValue === window.enums.HousingGuests.ANY) {
      return true;
    }

    return data.offer.guests === Number.parseInt(filterValue, 10);
  };

  const filterByFeatures = function (data) {
    return (!wifi.checked || data.offer.features.includes(wifi.value))
      && (!dishwasher.checked || data.offer.features.includes(dishwasher.value))
      && (!parking.checked || data.offer.features.includes(parking.value))
      && (!washer.checked || data.offer.features.includes(washer.value))
      && (!elevator.checked || data.offer.features.includes(elevator.value))
      && (!conditioner.checked || data.offer.features.includes(conditioner.value));
  };

  const deactivate = function () {
    adFilter.classList.add(`.map__filters--disabled`);
    desableElements(filters);
    desableElements(features);
  };

  const activate = function () {
    adFilter.classList.remove(`.map__filters--disabled`);
    enableElements(filters);
    enableElements(features);
  };

  const filter = function (dataArray) {
    const result = [];

    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i];

      if (filterByPrice(data)
      && filterByType(data)
      && filterByPrice(data)
      && filterByRooms(data)
      && filterByGuests(data)
      && filterByFeatures(data)) {
        result.push(data);
      }

      if (result.length === MAX_PIN_NUMBER) {
        break;
      }
    }

    return result;
  };

  window.filters = {
    deactivate,
    activate,
    filter,
    adFilter
  };
})();
