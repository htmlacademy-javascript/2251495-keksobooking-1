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
    successClass: 'success__message', // ??????????????????
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

pristine.validateTitle(
  advertisementForm.querySelector('#price'),
  validatePrice,
  'Максимальная цена — 100000'
);

// Валидация количества комнат и количества мест

const rooms = advertisementForm.querySelector('#room_number');
const capacity = advertisementForm.querySelector('#capacity');

const quantityRoomsForGuests = {
  '1 комната': 'для 1 гостя',
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': 'не для гостей'
};

function validateCapacity () {
  return quantityRoomsForGuests[rooms.value].includes(capacity.value);
}

pristine.addValidator(capacity, validateCapacity); // Надо ли выводить какое-то сообщение об ошибке и где его брать?
pristine.addValidator(rooms, validateCapacity);

// Код, который реализует логику обработки пользовательского ввода для полей

// Тип жилья

const type = advertisementForm.querySelector('[name="type"]:selected');
const price = advertisementForm.querySelector('#price');

const minPrice = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000
};

function validateMinPrice (value) {
  return Number(price.value) && Number(price.placeholder) >= minPrice[type.value]; // ??????????????????
}

function getPriceErrorMessage () {
  return `минимальная цена за ночь ${minPrice[type.value]}`;
}

pristine.addValidator(price, validateMinPrice, getPriceErrorMessage);

function onTypeChange () {
  price.placeholder >= minPrice[this.value];
  pristine.validate(price);
}

advertisementForm.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));

// Время заезда/выезда

const timein = advertisementForm.querySelector('[name="timein":selected]');
const timeout = advertisementForm.querySelector('[name="timeout"]:selected');

const checkTime = {
  'После 12': 'Выезд до 12',
  'После 13': 'Выезд до 13',
  'После 14': 'Выезд до 14'
};

function validateTime (value) {
  return checkTime[timein.value] = timeout.value;
}

pristine.addValidator(timein, validateTime);
pristine.addValidator(timeout, validateTime);

// Валидация перед отправкой формы

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

