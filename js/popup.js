import {getAdvertisements} from './data.js';

const advertisementsList = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const advertisements = getAdvertisements();

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const renderAdvertisements = () => {
  const advertisementsListFragment = document.createDocumentFragment();

  advertisements.forEach(({author, offer}) => {
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

    advertisementsListFragment.appendChild(popup);
  });

  advertisementsList.appendChild(advertisementsListFragment);

};
renderAdvertisements();


