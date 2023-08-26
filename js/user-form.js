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
    errorTextClass: 'error__message'
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

const rooms = advertisementForm.querySelector('[name="rooms"]:selected');
const capacity = advertisementForm.querySelector('[name="capacity"]:selected');

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

const type = advertisementForm.querySelector('[name="type"]:selected');
const price = advertisementForm.querySelector('#price');

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validateMinPrice (value) {
  return Number(value) >= minPrice[type.value];
}

function getPriceErrorMessage () {
  return `минимальная цена за ночь ${minPrice[type.value]}`;
}

pristine.addValidator(price, validateMinPrice, getPriceErrorMessage);

function onTypeChange (evt) {
  price.placeholder = minPrice[evt.target.value];
  pristine.validate(price);
}

advertisementForm.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));

// Время заезда/выезда

const timein = advertisementForm.querySelector('[name="timein"]:selected');
const timeout = advertisementForm.querySelector('[name="timeout"]:selected');

const checkTime = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00'
};

function validateTime (value) {
  return checkTime[value] === timeout.value;
}

pristine.addValidator(timein, validateTime);
pristine.addValidator(timeout, validateTime);

// Валидация перед отправкой формы

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

