import {sendData, showErrorMessage} from './api.js';

const advertisementForm = document.querySelector('.ad-form');
const formElements = advertisementForm.children;
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.children;
const submitButton = document.querySelector('.ad-form__submit');

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

// ------- Слайдер -------

const priceSlider = document.querySelector('.ad-form__slider');

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

function onTypeChange (evt) {
  price.placeholder = minPrice[evt.target.value];
  type = evt.target.value;
  pristine.validate(price);
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: minPrice[type],
      max: 100000,
    }
  });
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

// Очистка формы после отправки

const clearFormFields = () => {
  const selectElements = document.querySelectorAll('select');
  const textareaElement = document.querySelector('#description');
  const inputTextElements = document.querySelectorAll('input[type="text"]');
  const inputCheckboxElements = document.querySelectorAll('input[type="checkbox"]');
  const inputFileElements = document.querySelectorAll('input[type="file"]');


  for (let i = 0; i < selectElements.length; i++) {
    selectElements[i].selectedIndex = 0;
  }

  textareaElement.value = '';

  for (let i = 0; i < inputTextElements.length; i++) {
    inputTextElements[i].value = '';
  }

  for (let i = 0; i < inputCheckboxElements.length; i++) {
    inputCheckboxElements[i].checked = false;
  }

  for (let i = 0; i < inputFileElements.length; i++) {
    inputFileElements[i].value = '';
  }

  priceSlider.noUiSlider.reset();
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', clearFormFields);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

// Валидация перед отправкой формы

const setUserFormSubmit = (onSuccess) => {
  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(onSuccess)
        .catch((err) => {
          showErrorMessage(err.message);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {advertisementForm, formElements, mapForm, mapFilters, setUserFormSubmit, clearFormFields};

