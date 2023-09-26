import {map} from './map.js';

// Фильтрация для объявлений

const filterMapFilters = (advertisement) => {
  const housingType = document.querySelector('#housing-type');
  const housingPrice = document.querySelector('#housing-price');
  const housingRooms = document.querySelector('#housing-rooms');
  const housingGuests = document.querySelector('#housing-guests');
  const housingFeatures = document.getElementsByName('[name="features"]:checked');

  if ((advertisement.offer.type.value === housingType.value &&
      advertisement.offer.rooms.value === housingRooms.value &&
      advertisement.offer.guests.value === housingGuests.value) &&
      ((advertisement.offer.price > 10000 && advertisement.offer.price <= 50000)
      || advertisement.offer.price < 10000 || advertisement.offer.price > 50000)) {

    if (housingType.value === ('any' || undefined), housingRooms.value === ('any' || undefined),
    housingGuests.value === ('any' || undefined), housingPrice.value === ('any' || undefined)) {
      return advertisement;
    }

    if (Array.from(housingFeatures).every((feature) => advertisement.offer.features.contains(feature))) {
      return advertisement;
    }
  }
};

const setFilterClick = () => {
  const filterElements = document.querySelectorAll('.map__filter');
  for (let i = 0; i <= filterElements.length; i++) {
    filterElements[i].addEventListener('click', () => {
    // перерисовка объявлений - advertisements.forEach(createAdvertisementMarker (advertisement)) ????
      map.closePopup(); // чтобы скрыть балун при изменении фильтров?
    });
  }
};

const setFeaturesClick = () => {
  const featuresElements = document.querySelectorAll('.map__checkbox');
  for (let i = 0; i <= featuresElements.length; i++) {
    featuresElements[i].addEventListener('click', () => {

      map.closePopup(); // чтобы скрыть балун при изменении фильтров?
    });
  }
};

export {filterMapFilters, setFilterClick, setFeaturesClick};
