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
const TITLES = ['Radisson Royal', 'Grand Hotel', 'Best Western Zoom Hotel', 'Hello hostel', 'Good Apartement', 'Friends', 'HomeSweethome', 'Beautiful weekend', 'Luxury apart', 'Keksohouse'];
const DESCRIPTIONS = [
  'Отель - который имеет чудесный небольшой центральный двор - находится в отличном месте.',
  'Прекрасное местоположение, в самом центре всех достопримечательностей.',
  'Очень уютное расположение рядом с рекой.',
  'Отель просто замечательный. Очень красиво оформлен.',
  'Внешний вид не похож на другие здания, расположение в центре города.',
  'Этот красивый бутик-отель идеально расположен в нескольких минутах ходьбы от многих основных достопримечательностей.',
  'Ресторан с завтраком и ужином (ничего необычного), детская игровая площадка, основной бар.',
  'Очень красивый уютный и комфортабельный отель, очень близко к центру города.',
  '«Величественный» отель с изысканными комфортабельными номерами.',
  'Хостел имеет очень хорошее расположение.'
];


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

// сгенерировать объявление

const createAdvertisement = () => ({
  author: {
    avatar: `img/avatars/user/${generatePhotoId()}.png`,
  },

  offer: {
    title: getRandomArrayElement(TITLES),
    address: String(getRandomNumber(35.65, 35.7, 5), getRandomNumber(139.7, 139.8, 5)),
    price: getRandomInteger(1000, 80000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 10),
    checkin: getRandomArrayElement(HOURS),
    checkout: getRandomArrayElement(HOURS),
    features: getRandomLengthArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomLengthArray(PHOTOS),
  },

  location: {
    lat: getRandomNumber(35.65, 35.7, 5),
    lng: getRandomNumber(139.7, 139.8, 5),
  },
});

// сгенерировать массив из 10 объявлений

const getAdvertisements = () => Array.from({length: ADVERTISEMENTS_QUANTITY}, createAdvertisement);

getAdvertisements();
