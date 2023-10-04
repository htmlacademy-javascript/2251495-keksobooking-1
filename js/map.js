const defaultCoordinates = {
  LAT: 35.68948,
  LNG: 139.69170
};

const MAP_ZOOM = 10;

const advertisementForm = document.querySelector('.ad-form');
const formElements = advertisementForm.querySelectorAll('fieldset');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const OfferType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const activateForm = () => {
  advertisementForm.classList.remove('ad-form--disabled');

  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  }
  );
};


const address = advertisementForm.querySelector('[name="address"]');

address.value = `${defaultCoordinates.LAT}, ${defaultCoordinates.LNG}`;

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderAdvertisementsFeatures = (advertisement, popup) => {
  if (advertisement.offer.features) {
    advertisement.offer.features.forEach((feature) => {
      const li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(`popup__feature--${feature}`);
      popup.querySelector('.popup__features').appendChild(li);
    });
  }
};

const renderAdvertisementsPhotos = (advertisement, popup) => {
  if (advertisement.offer.photos) {
    advertisement.offer.photos.forEach((photo) => {
      const img = document.createElement('img');
      img.src = photo;
      img.width = '45';
      img.height = '40';
      img.classList.add('popup__photo');
      popup.querySelector('.popup__photos').appendChild(img);
    });
  }
};

const createAdvertisementPopup = (advertisement) => {

  const popupFragment = document.createDocumentFragment();

  const popup = cardTemplate.cloneNode(true);

  const appendAdvertisementInfo = (
    selector,
    condition,
    text
  ) => {
    if (condition) {
      popup.querySelector(selector).textContent = text;
    }

  };

  appendAdvertisementInfo('.popup__title', advertisement.offer.title, advertisement.offer.title);
  appendAdvertisementInfo('.popup__text--address', advertisement.offer.address, advertisement.offer.addresse);
  appendAdvertisementInfo('.popup__text--price', advertisement.offer.price, `${advertisement.offer.price} ₽/ночь`);
  appendAdvertisementInfo('.popup__type', advertisement.offer.type, OfferType[advertisement.offer.type]);
  appendAdvertisementInfo(
    '.popup__text--capacity',
    advertisement.offer.rooms && advertisement.offer.guests,
    `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`
  );
  appendAdvertisementInfo(
    '.popup__text--time',
    advertisement.offer.checkin && advertisement.offer.checkout,
    `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`
  );

  renderAdvertisementsFeatures(advertisement, popup);

  appendAdvertisementInfo('.popup__description', advertisement.offer.description,advertisement.offer.description);

  renderAdvertisementsPhotos(advertisement, popup);

  popup.querySelector('.popup__avatar').src = advertisement.author.avatar;

  cardTemplate.appendChild(popupFragment);

  return popup;
};

let mapCanvas;

L.Map.addInitHook(function () {
  mapCanvas = this;
});

const loadMap = () => new Promise((resolve) => {
  const map = L.map('map-canvas')
    .on('load', (e) => {
      activateForm();
      const mainPinIcon = L.icon({
        iconUrl: './img/main-pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      });

      const mainPinMarker = L.marker(
        {
          lat: defaultCoordinates.LAT,
          lng: defaultCoordinates.LNG,
        },
        {
          draggable: true,
          icon: mainPinIcon,
        },
      );

      mainPinMarker.on('moveend', (evt) => {
        address.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
      });

      mainPinMarker.addTo(e.target);
      resolve(e.target);
    }).setView({
      lat: defaultCoordinates.LAT,
      lng: defaultCoordinates.LNG,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
});

const createAdvertisementMarker = (advertisement, map) => {
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

const clearMap = () => {
  let layerIndex = 0;

  mapCanvas.eachLayer((layer) => {
    if (layerIndex < 2) {
      layerIndex += 1;
      return;
    }

    layerIndex += 1;
    layer.remove();
  });

  mapCanvas.closePopup();
};


export {createAdvertisementMarker, loadMap, address, activateForm, defaultCoordinates, mapCanvas, clearMap};
