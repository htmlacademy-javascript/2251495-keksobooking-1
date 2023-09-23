const isEscapeKey = (evt) => evt.key === 'Escape';

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

// получить уникальный номер фотографии

const makePhotoIdGenerator = () => {
  let currentId = 0;
  return () => {
    currentId += 1;
    if (currentId < 10) {
      return `0${currentId}`;
    }

    if (currentId > 10) {
      currentId = 0;
    }
    return `${currentId}`;
  };
};

const generatePhotoId = makePhotoIdGenerator();

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

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomNumber, getRandomArrayElement, getRandomLengthArray, generatePhotoId, getRandomInteger, isEscapeKey, debounce};
