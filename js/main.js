import './user-form.js';
import './map.js';
import {getData} from './api.js';
import {createAdvertisementMarker} from './map.js';
import {setUserFormSubmit, clearFormFields} from './user-form.js';
import {ADVERTISEMENTS_QUANTITY} from './data.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData()
  .then((advertisements) => {
    advertisements.slice(0, ADVERTISEMENTS_QUANTITY).forEach(createAdvertisementMarker);
  });

setUserFormSubmit(clearFormFields);
