const advertisementForm = document.querySelector('.ad-form');
const formElements = advertisementForm.children;

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const activateForm = () => {
  advertisementForm.classList.remove('ad-form--disabled');

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
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

address.value = '35.6895, 139.692';

mainPinMarker.on('moveend', (evt) => {
  address.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdvertisementPopup = (advertisement) => {

  const popupFragment = document.createDocumentFragment();

  const popup = cardTemplate.cloneNode(true);

  if (advertisement.offer.title) {
    popup.querySelector('.popup__title').textContent = advertisement.offer.title;
  }
  if (advertisement.offer.address) {
    popup.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  }
  if (advertisement.offer.price) {
    popup.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь`;
  }
  if (advertisement.offer.type) {
    popup.querySelector('.popup__type').textContent = offerTypes[advertisement.offer.type];
  }
  if (advertisement.offer.rooms && advertisement.offer.guests) {
    popup.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  }
  if (advertisement.offer.checkin && advertisement.offer.checkout) {
    popup.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  }
  if (advertisement.offer.features) {
    popup.querySelector('.popup__features').textContent = advertisement.offer.features;
  }
  if (advertisement.offer.description) {
    popup.querySelector('.popup__description').textContent = advertisement.offer.description;
  }
  if (advertisement.offer.photos) {
    popup.querySelector('.popup__photos').setAttribute('src', advertisement.offer.photos);
  }
  popup.querySelector('.popup__avatar').setAttribute('src', advertisement.author.avatar);

  cardTemplate.appendChild(popupFragment);

  return popup;
};

const createAdvertisementMarker = (advertisement) => {
  const {location} = advertisement;
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
    .bindPopup(createAdvertisementPopup(advertisement));
};

export {createAdvertisementMarker, mainPinMarker, map, address, activateForm};
