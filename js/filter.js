import {map, createAdvertisementMarker} from './map.js';
import {debounce} from './util.js';

// Фильтрация для объявлений

const verifyPrice = (advertisement) => {
  const housingPrice = document.querySelector('#housing-price').value;

  if (housingPrice === 'any') {
    return true;
  }

  if (housingPrice === 'low') {
    return advertisement.offer.price < 10000;
  }

  if (housingPrice === 'middle') {
    return advertisement.offer.price > 10000 && advertisement.offer.price <= 50000;
  }

  if (housingPrice === 'high') {
    return advertisement.offer.price > 50000;
  }
};

const filterMapFilters = (advertisement) => {
  const housingType = document.querySelector('#housing-type');
  const housingRooms = document.querySelector('#housing-rooms');
  const housingGuests = document.querySelector('#housing-guests');
  const housingFeatures = document.querySelectorAll('.map__checkbox:checked');

  const isHousingTypeMatches = housingType.value === 'any' || advertisement.offer.type === housingType.value;
  const isRoomsMatches = housingRooms.value === 'any' || advertisement.offer.rooms === Number(housingRooms.value);
  const isGuestsMatches = housingGuests.value === 'any' || advertisement.offer.guests === Number(housingGuests.value);
  const isPriceMatches = verifyPrice(advertisement);

  const isFeaturesMatches = Array.from(housingFeatures).every((feature) => {
    if (advertisement.offer.features) {
      return advertisement.offer.features.includes(feature.value);
    }
    return false;
  });

  if (isHousingTypeMatches && isRoomsMatches && isGuestsMatches && isFeaturesMatches && isPriceMatches) {
    return true;
  }

  return false;
};

const onFilterChange = (advertisements) => {
  const featuresElements = document.querySelectorAll('.map__checkbox');
  const filterElements = document.querySelectorAll('.map__filter');
  const filters = [...featuresElements, ...filterElements];

  const filterChangeHandler = debounce(() => {
    let layerIndex = 0;
    map.eachLayer((layer) => {
      if (layerIndex < 2) {
        layerIndex += 1;
        return;
      }

      layerIndex += 1;
      layer.remove();
    });
    map.closePopup();

    advertisements
      .filter(filterMapFilters)
      .slice(0, 9)
      .forEach((advertisement) => createAdvertisementMarker(advertisement));
  });

  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', filterChangeHandler);
  }
};

export {filterMapFilters, onFilterChange};
