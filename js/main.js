import './user-form.js';
import './map.js';
import {ErrorText} from './const.js';
import {getData, showErrorMessage} from './api.js';
import {createAdvertisementMarker, activateForm} from './map.js';
import {setUserFormSubmit, clearFormFields} from './user-form.js';
import {filterMapFilters, onFilterChange} from './filter.js';
import './pictures.js';

const ADVERTISEMENTS_QUANTITY = 10;

getData()
  .then((advertisements) => {
    advertisements
      .slice()
      .sort(filterMapFilters)
      .slice(0, ADVERTISEMENTS_QUANTITY)
      .forEach(createAdvertisementMarker);
    activateForm();
    onFilterChange(advertisements);
  })
  .catch(() => {
    showErrorMessage(ErrorText.Get);
  });

setUserFormSubmit(clearFormFields);
