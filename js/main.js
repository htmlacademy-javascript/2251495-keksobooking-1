import './user-form.js';
import './map.js';
import {ErrorText} from './const.js';
import {getData, showErrorMessage} from './api.js';
import {createAdvertisementMarker, activateForm, loadMap} from './map.js';
import {setUserFormSubmit, onFormReset} from './user-form.js';
import {prepareFilterChangeHandlers} from './filter.js';
import './pictures.js';

const ADVERTISEMENTS_QUANTITY = 10;

getData()
  .then((advertisements) => {
    loadMap()
      .then((map) => {
        advertisements
          .slice()
          .slice(0, ADVERTISEMENTS_QUANTITY)
          .forEach((offer) => createAdvertisementMarker(offer, map));
        activateForm();
        prepareFilterChangeHandlers(advertisements);
      });

  })
  .catch(() => {
    showErrorMessage(ErrorText.Get);
  });

setUserFormSubmit(onFormReset);
