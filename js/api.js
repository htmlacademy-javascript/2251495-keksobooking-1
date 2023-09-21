import {isEscapeKey} from './util.js';
import {activateFilters} from './user-form.js';

const BASE_URL = 'https://28.javascript.pages.academy/keksobooking';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successFragment = document.createDocumentFragment();

const errorButton = document.querySelector('.error__button');

const showSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  document.body.appendChild(successFragment);

  document.addEventListener('click', () => {
    success.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      success.classList.add('hidden');
    }
  });
};

const showErrorMessage = () => {
  const error = errorTemplate.cloneNode(true);
  document.body.appendChild(errorFragment);

  errorButton.addEventListener('click', () => {
    error.classList.add('hidden');
  });

  document.addEventListener('click', () => {
    error.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      error.classList.add('hidden');
    }
  });
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
    throw new Error('Не удалось загрузить данные'); // какое сообщение? придумать текст и стили?
  });


// ------- Отправка данных -------

const sendData = (body) => fetch(
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
  })
  .catch(() => {
    showErrorMessage();
  });

export {getData, sendData, showSuccessMessage, showErrorMessage};


