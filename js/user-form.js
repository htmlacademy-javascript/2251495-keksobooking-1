const advertisementForm = document.querySelector('.ad-form');
const formElements = advertisementForm.children;
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.children;

// ------- Дезактивация формы -------

const disableForm = () => {

  advertisementForm.classList.add('ad-form--disabled');

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', true);
  }

  mapForm.classList.add('map__filters--disabled');

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled', true);
  }
};

disableForm();

// ------- Активация формы -------

const activateForm = () => {

  advertisementForm.classList.remove('ad-form--disabled');

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
};

activateForm();

const activateFilters = () => {

  mapForm.classList.remove('map__filters--disabled');

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  }
};

activateFilters();

// ------- Валидация формы -------

const pristine = new Pristine(advertisementForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'p',
    errorTextClass: 'ad-form__error'
  }, false);

// Валидация заголовка

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  advertisementForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

// Валидация цены

function validatePrice (value) {
  return Number(value) <= 100000;
}

pristine.addValidator(
  advertisementForm.querySelector('#price'),
  validatePrice,
  'Максимальная цена — 100000'
);

// Валидация количества комнат и количества мест

const rooms = advertisementForm.querySelector('[name="rooms"]:checked');
const capacity = advertisementForm.querySelector('[name="capacity"]:checked');

const quantityRoomsForGuests = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

function validateCapacity () {
  return quantityRoomsForGuests[rooms.value].includes(capacity.value);
}

pristine.addValidator(capacity, validateCapacity);
pristine.addValidator(rooms, validateCapacity);

// Код, который реализует логику обработки пользовательского ввода для полей

// Тип жилья

const price = advertisementForm.querySelector('#price');
let type;

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validateMinPrice (value) {
  return Number(value) >= minPrice[type];
}

function getPriceErrorMessage () {
  return `минимальная цена за ночь ${minPrice[type]}`;
}

pristine.addValidator(price, validateMinPrice, getPriceErrorMessage);

function onTypeChange (evt) {
  price.placeholder = minPrice[evt.target.value];
  type = evt.target.value;
  pristine.validate(price);
}

advertisementForm.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));

// Время заезда/выезда

const timein = advertisementForm.querySelector('#timein');
const timeout = advertisementForm.querySelector('#timeout');

function validateTimeIn (value) {
  return value === timeout.value;
}

function validateTimeout(value) {
  return value === timein.value;
}

function getTimeErrorMessage() {
  return 'Время заезда должно совпадать с временем выезда';
}

pristine.addValidator(timein, validateTimeIn, getTimeErrorMessage);
pristine.addValidator(timeout, validateTimeout, getTimeErrorMessage);

// Валидация перед отправкой формы

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// ------- Карта -------

const map = L.map('map-canvas')
.on('load', () =>
  advertisementForm.classList.remove('ad-form--disabled'); // активация формы

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }

  mapForm.classList.remove('map__filters--disabled');

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  })
  .setView({
  lat: 35.6895,
  lng: 139.692,
}, 10);

L.tileLayer(
'http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}',
  {
    attribution: '&copy; Предоставлено <a href="https://dev.2gis.ru/">2ГИС</a>', // это правильно???
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
  address.value = evt.target.getLatLng() // так можно сделать? - Содержимое поля адреса должно всегда соответствовать координатам метки.
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createAdvertisementPopup = (advertisement) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
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
    if (author.avatar) {
      popup.querySelector('.popup__avatar').setAttribute('src', author.avatar);
    }

    return popup;
  };

advertisements.forEach((advertisement) => {
  const {lat, lng} = advertisement;
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
});

// ------- Слайдер -------

const priceSlider = document.querySelector('ad-form__slider');

valueElement.value = 0;

noUiSlider.create(priceSlider, {
  range: {
    min: minPrice[type], // так можно для разных типов жилья или нет?
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});
