import './user-form.js';
import './map.js';
import {ErrorText} from './const.js';
import {getData, showErrorMessage} from './api.js';
import {createAdvertisementMarker, activateForm, loadMap} from './map.js';
import {setUserFormSubmit, onFormReset, activateFilters} from './user-form.js';
import {prepareFilterChangeHandlers} from './filter.js';
import './pictures.js';

const ADVERTISEMENTS_QUANTITY = 10;

loadMap()
  .then((map) => {
    activateForm();
    getData()
      .then((advertisements) => {

        advertisements
          .slice()
          .slice(0, ADVERTISEMENTS_QUANTITY)
          .forEach((offer) => createAdvertisementMarker(offer, map));
        prepareFilterChangeHandlers(advertisements);
        activateFilters();
      })
      .catch(() => {
        showErrorMessage(ErrorText.Get);
      });
  })
  .catch(() => {
    showErrorMessage(ErrorText.Get);
  });

setUserFormSubmit(onFormReset);
