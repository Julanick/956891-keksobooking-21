"use strict";
(function () {
  const MAX_PIN_NUMBER = 5;

  const adFilter = document.querySelector(`.map__filters`);
  const filters = adFilter.querySelectorAll(`.map__filter`);
  const features = adFilter.querySelectorAll(`.map__features`);
  const typeFilter = adFilter.querySelector(`#housing-type`);

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

  const filterByCount = function (data) {
    return data.slice(0, MAX_PIN_NUMBER);
  };

  const filterByType = function (data) {
    const filterValue = typeFilter.value;

    if (filterValue === window.enums.Types.ANY) {
      return data;
    }

    return data.filter(function (appartmet) {
      return appartmet.offer.type === filterValue;
    });
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

  const filter = function (data) {
    let filteredData = filterByType(data);
    filteredData = filterByCount(filteredData);
    return filteredData;
  };

  window.filters = {
    deactivate,
    activate,
    filter,
    adFilter
  };
})();
