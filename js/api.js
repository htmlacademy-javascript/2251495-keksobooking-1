import {isEscapeKey} from './util.js';
import {activateFilters} from './user-form.js';
import {ErrorText} from './const.js';

const BASE_URL = 'https://28.javascript.pages.academy/keksobooking';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const showSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  document.body.appendChild(success);

  const onSuccessMessageClick = () => {
    success.classList.add('hidden');
    document.removeEventListener('click', onSuccessMessageClick);
  };

  document.addEventListener('click', onSuccessMessageClick);


  const onSuccessMessageKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      success.classList.add('hidden');
      document.removeEventListener('keydown', onSuccessMessageKeydown);
    }

  };
  document.addEventListener('keydown', onSuccessMessageKeydown);
};


const showErrorMessage = (errorText) => {
  const error = errorTemplate.cloneNode(true);
  document.body.appendChild(error);
  const errorButton = document.querySelector('.error__button');
  const errorMessage = document.querySelector('.error__message');

  errorMessage.textContent = errorText;

  errorButton.addEventListener('click', () => {
    error.classList.add('hidden');
  });

  const onErrorMessageClick = () => {
    error.classList.add('hidden');
    document.removeEventListener('click', onErrorMessageClick);
  };

  document.addEventListener('click', onErrorMessageClick);

  const onErrorMessageKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      error.classList.add('hidden');
      document.removeEventListener('keydown', onErrorMessageKeydown);
    }
  };

  document.addEventListener('keydown', onErrorMessageKeydown);
};

// ------- Получение данных -------

const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    activateFilters();
    return response.json();
  })
  .catch(() => {
    throw new Error();
  });

// ------- Отправка данных -------

const sendData = (body, onSuccess) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    showSuccessMessage();
    onSuccess();
  })
  .catch(() => {
    showErrorMessage(ErrorText.Send);
  });

export {getData, sendData, showSuccessMessage, showErrorMessage};


