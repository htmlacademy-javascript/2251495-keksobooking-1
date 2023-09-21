import './user-form.js';
import './map.js';
import {getData} from './api.js';
import {createAdvertisementMarker} from './map.js';
import {setUserFormSubmit, clearFormFields} from './user-form.js';

getData()
  .then((advertisements) => {
    advertisements.slice(0, 10).forEach(createAdvertisementMarker);
  });

setUserFormSubmit(clearFormFields);
