// module4-task1 генерация массива из объектов

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const HOURS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const ADVERTISEMENTS_QUANTITY = 10;

// получение случайного числа из диапазона с плавающей точкой

const getRandomNumber = (startNumber, lastNumber, quantitySymbols) => {
  if (startNumber >= 0 && lastNumber >= 0) {
    const randomNumber = Number((Math.random() * (lastNumber - startNumber) +
startNumber).toFixed(quantitySymbols));
    return randomNumber;
  }
  return NaN;
};

// получение целого случайного числа из диапазона

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// генератор случайных уникальных идентификаторов из диапазона

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// нарастить строку

const extendString = (string, length, extender) => {
  if (string.length >= length) {
    return string;
  }
  const extendLength = length - string.length;
  let newString = extender.repeat(extendLength) + string;
  if (newString.length > length) {
    newString = extender.slice(0, extendLength % extender.length) + extender.repeat(extendLength / extender.length) + string;
  }

  return newString;
};

// уникальный номер фотографии

const PhotoId = extendString (createRandomIdFromRangeGenerator(1, 10), 2, 0);

// получить случайный элемент массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// получить массив случайной длины

const getRandomLengthArray = (array) => {
  const randomLengthArray = [];
  for (let i = 0; i <= getRandomInteger(0, array.length); i++){
    randomLengthArray.push(array[i]);
  }
  return randomLengthArray;
};

// сгенерировать объявление

const createAdvertisement = () => ({
  author: {
    avatar: `img/avatars/user${PhotoId}.png`, // 'img/avatars/user{{xx}}.png', УНИКАЛЬНЫЕ ЗНАЧЕНИЯ
  },

  offer: {
    title: '',
    address: String(getRandomNumber(35.65, 35.7, 5), getRandomNumber(139.7, 139.8, 5)),
    price: getRandomInteger, // Случайное целое положительное число,
    type: getRandomArrayElement(TYPES), // одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel,
    rooms: getRandomInteger, // Случайное целое положительное число,
    guests: getRandomInteger,// Случайное целое положительное число,
    checkin: getRandomArrayElement(HOURS), // одно из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    checkout: getRandomArrayElement(HOURS), // одно из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    features: getRandomLengthArray(FEATURES), // массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться,
    description: '',
    photos: getRandomLengthArray(PHOTOS), // массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg
  },

  location: {
    lat: getRandomNumber(35.65, 35.7, 5), // число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000,
    lng: getRandomNumber(139.7, 139.8, 5), // число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000,
  },
});

// сгенерировать массив из 10 объявлений

const getAdvertisements = () => Array.from({length: ADVERTISEMENTS_QUANTITY}, createAdvertisement);

getAdvertisements();
