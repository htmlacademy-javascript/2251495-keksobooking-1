import {getAdvertisements} from './data.js';

const advertisementsList = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const advertisements = getAdvertisements();


const renderAdvertisements = () => {
  const advertisementsListFragment = document.createDocumentFragment();

  advertisements.forEach(({author, offer}) => {
    const popup = cardTemplate.cloneNode(true);
    popup.querySelector('.popup__title').textContent = offer.title;
    popup.querySelector('.popup__text--address').textContent = offer.address;
    popup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    popup.querySelector('.popup__type').textContent = offer.type; // сопоставить с подписями!! Квартира - flat, Бунгало - bungalow, Дом - house, Дворец - palace, Отель - hotel
    popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    popup.querySelector('.popup__features').textContent = offer.features;
    popup.querySelector('.popup__description').textContent = offer.description;
    popup.querySelector('.popup__photos').setAttribute('src', offer.photos);
    popup.querySelector('.popup__avatar').setAttribute('src', author.avatar);
    advertisementsListFragment.appendChild(popup);
  });

  advertisementsList.appendChild(advertisementsListFragment);

};
renderAdvertisements();

// Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

