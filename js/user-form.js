import {sendData, showErrorMessage} from './api.js';
import {address, defaultCoordinates, mapCanvas} from './map.js';
import {ErrorText} from './const.js';
import {photoPreview, imagePreview} from './pictures.js';
import{filterElements, featuresElements} from './filter.js';

const QuantityValue = {
  MIN_QUANTITY_SYMBOLS: 30,
  MAX_QUANTITY_SYMBOLS: 100,
  MAX_PRICE: 100000,
  MIN_PRICE: 0
};

const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const DEFAULT_PREVIEW = 'img/muffin-grey.svg';

const advertisementForm = document.querySelector('.ad-form');
const formElements = advertisementForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('select, fieldset');
const submitButton = document.querySelector('.ad-form__submit');

const mainPinMarkerlatLng =
  {
    lat: defaultCoordinates.LAT,
    lng: defaultCoordinates.LNG,
  };

const timein = advertisementForm.querySelector('#timein');
const timeout = advertisementForm.querySelector('#timeout');

const resetButton = document.querySelector('.ad-form__reset');

// ------- Активация фильтров -------

const activateFilters = () => {
  mapForm.classList.remove('map__filters--disabled');

  mapFilters.forEach((mapFilter)=> {
    mapFilter.removeAttribute('disabled');
  });
};

// ------- Дезактивация формы -------

const disableForm = () => {

  advertisementForm.classList.add('ad-form--disabled');

  const formControls = [...formElements, ...mapFilters];

  formControls.forEach ((formControl) => {
    formControl.disabled = true;
  });

  mapForm.classList.add('map__filters--disabled');

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

const validateTitle = (value) => value.length >= QuantityValue.MIN_QUANTITY_SYMBOLS && value.length <= QuantityValue.MAX_QUANTITY_SYMBOLS;

pristine.addValidator(
  advertisementForm.querySelector('#title'),
  validateTitle,
  `От ${QuantityValue.MIN_QUANTITY_SYMBOLS} до ${QuantityValue.MAX_QUANTITY_SYMBOLS} символов`
);

// Валидация цены

const validatePrice = (value) => Number(value) <= QuantityValue.MAX_PRICE;

pristine.addValidator(
  advertisementForm.querySelector('#price'),
  validatePrice,
  `Максимальная цена — ${QuantityValue.MAX_PRICE}`
);

// Валидация количества комнат и количества мест

const rooms = advertisementForm.querySelector('#room_number');
const capacity = advertisementForm.querySelector('#capacity');

const quantityRoomsForGuests = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

const validateCapacity = () => quantityRoomsForGuests[rooms.value].includes(capacity.value);

const getCapacityErrorMessage = () => 'количество мест не соответствует количеству комнат';

pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(rooms, validateCapacity, getCapacityErrorMessage);

// Код, который реализует логику обработки пользовательского ввода для полей

// Тип жилья

const price = advertisementForm.querySelector('#price');
const houseType = advertisementForm.querySelector('#type');
let type = houseType.value;

const validateMinPrice = (value) => Number(value) >= MinPrice[houseType.value];

const getPriceErrorMessage = () => `минимальная цена за ночь ${MinPrice[type]}`;

pristine.addValidator(price, validateMinPrice, getPriceErrorMessage);

// ------- Слайдер -------

const priceSlider = document.querySelector('.ad-form__slider');

noUiSlider.create(priceSlider, {
  range: {
    min: QuantityValue.MIN_PRICE,
    max: QuantityValue.MAX_PRICE,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

const onTypeChange = (evt) => {
  price.placeholder = MinPrice[evt.target.value];

  type = evt.target.value;
  pristine.validate(price);
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: MinPrice[type],
      max: QuantityValue.MAX_PRICE,
    }
  });
};

advertisementForm.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));

// Время заезда/выезда

const validateTimeIn = (value) => value === timeout.value;

const validateTimeout = (value) => value === timein.value;

const getTimeErrorMessage = () => 'Время заезда должно совпадать с временем выезда';

pristine.addValidator(timein, validateTimeIn, getTimeErrorMessage);
pristine.addValidator(timeout, validateTimeout, getTimeErrorMessage);

timein.addEventListener('change', (evt) => {
  timeout.value = evt.target.value;
});

timeout.addEventListener('change', (evt) => {
  timein.value = evt.target.value;
});
// ------- Очистка формы после отправки -------

const onFormReset = (evt) => {
  evt?.preventDefault();

  priceSlider.noUiSlider.reset();

  let layerIndex = 0;
  mapCanvas.eachLayer((layer) => {

    if (layerIndex < 1) {
      layer.setLatLng(mainPinMarkerlatLng);
      layerIndex += 1;
    }

  });

  mapCanvas.closePopup();

  pristine.reset();

  featuresElements.forEach((featuresElement) => {
    featuresElement.checked = false;
  });

  filterElements.forEach((filterElement) => {
    filterElement.selectedIndex = 0;
  });

  advertisementForm.reset();

  address.value = `${defaultCoordinates.LAT}, ${defaultCoordinates.LNG}`;

  document.querySelector(photoPreview).src = DEFAULT_PREVIEW;
  document.querySelector(imagePreview).src = null;

  price.placeholder = MinPrice.flat;
};

resetButton.addEventListener('click', onFormReset);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

// ------- Валидация перед отправкой формы -------

const setUserFormSubmit = (onSuccess) => {
  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData, onSuccess)
        .catch(() => {
          showErrorMessage(ErrorText.Send);

        })
        .finally(unblockSubmitButton);
    }
  });
};

export {advertisementForm, formElements, mapForm, mapFilters, activateFilters, setUserFormSubmit, onFormReset};
