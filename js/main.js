import './user-form.js';
import './map.js';
import {getData} from './api.js';
import {ADVERTISEMENTS_QUANTITY} from './data.js';

getData()
  .then((advertisements) => {
    advertisements.forEach(createAdvertisementPopup); // почему не экспортируется функция и переменная?
  });
