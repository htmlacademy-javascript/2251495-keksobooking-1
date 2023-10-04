import {createAdvertisementMarker, mapCanvas, clearMap} from './map.js';
import {debounce} from './util.js';
import { advertisementForm } from './user-form.js';

const housingType = document.querySelector('#housing-type');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');

const filterPrice = {
  LOW: 10000,
  HIGH: 50000
};

// Фильтрация для объявлений

const verifyPrice = (advertisement) => {
  const housingPrice = document.querySelector('#housing-price').value;

  if (housingPrice === 'any') {
    return true;
  }

  if (housingPrice === 'low') {
    return advertisement.offer.price < filterPrice.LOW;
  }

  if (housingPrice === 'middle') {
    return advertisement.offer.price > filterPrice.LOW && advertisement.offer.price <= filterPrice.HIGH;
  }

  if (housingPrice === 'high') {
    return advertisement.offer.price > filterPrice.HIGH;
  }
};


const filterMapFilters = (advertisement) => {
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

  return isHousingTypeMatches && isRoomsMatches && isGuestsMatches && isFeaturesMatches && isPriceMatches;
};

const featuresElements = document.querySelectorAll('.map__checkbox');
const filterElements = document.querySelectorAll('.map__filter');

const prepareFilterChangeHandlers = (advertisements) => {

  const filters = [...featuresElements, ...filterElements];
  const FILTERED_OFFERS_QUANTITY = 10;

  const onFilterChange = debounce(() => {

    clearMap();
    advertisements
      .filter(filterMapFilters)
      .slice(0, FILTERED_OFFERS_QUANTITY)
      .forEach((advertisement) => createAdvertisementMarker(advertisement, mapCanvas));
  });

  filters.forEach((filter) => {
    filter.addEventListener('change',onFilterChange);
  });
  advertisementForm.addEventListener('reset', onFilterChange);

};

export {filterMapFilters, prepareFilterChangeHandlers, filterElements, featuresElements};
