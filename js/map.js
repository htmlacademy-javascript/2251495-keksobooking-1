import { getAdvertisements } from './data.js';
import { advertisementForm } from './user-form.js';
import { formElements } from './user-form.js';
import { mapForm } from './user-form.js';
import { mapFilters } from './user-form.js';
import { offerTypes } from './popup.js';

// ------- Карта -------

const map = L.map('map-canvas')
  .on('load', () => {
    advertisementForm.classList.remove('ad-form--disabled'); // активация формы

    for (let i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }

    mapForm.classList.remove('map__filters--disabled');

    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }
  }).setView({
    lat: 35.6895,
    lng: 139.692,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const address = advertisementForm.querySelector('[name="address"]');

mainPinMarker.on('moveend', (evt) => {
  address.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const advertisements = getAdvertisements();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdvertisementPopup = (offer) => {

  const popupFragment = document.createDocumentFragment();

  const popup = cardTemplate.cloneNode(true);

  if (offer.title) {
    popup.querySelector('.popup__title').textContent = offer.title;
  }
  if (offer.address) {
    popup.querySelector('.popup__text--address').textContent = offer.address;
  }
  if (offer.price) {
    popup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }
  if (offer.type) {
    popup.querySelector('.popup__type').textContent = offerTypes[offer.type];
  }
  if (offer.rooms && offer.guests) {
    popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }
  if (offer.checkin && offer.checkout) {
    popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }
  if (offer.features) {
    popup.querySelector('.popup__features').textContent = offer.features;
  }
  if (offer.description) {
    popup.querySelector('.popup__description').textContent = offer.description;
  }
  if (offer.photos) {
    popup.querySelector('.popup__photos').setAttribute('src', offer.photos);
  }
  if (offer.author.avatar) {
    popup.querySelector('.popup__avatar').setAttribute('src', offer.author.avatar);
  }

  cardTemplate.appendChild(popupFragment);

  return popup;
};


advertisements.forEach((offer) => {
  const {location} = offer;
  const {lat, lng} = location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createAdvertisementPopup(offer));
});

