const BASE_URL = 'https://28.javascript.pages.academy/keksobooking';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorFragment = document.createDocumentFragment();

// ------- Получение данных -------

//Доработайте модуль для отрисовки меток на карте так, чтобы в качестве данных использовались не случайно сгенерированные объекты, а те данные,
//которые вы загрузите с сервера.

const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(ErrorText.GET_DATA); // здесь текст из шаблона?
  });

//Добавьте обработку возможных ошибок при загрузке.

//Реализуйте переход фильтров в активное состояние при успешной загрузке данных.*/


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
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз'); // какое сообщение? как выводить, фрагментом?
  });

export {getData, sendData};


//Добавьте обработчик отправки формы, если ещё этого не сделали, который бы отменял действие формы по умолчанию и отправлял
//данные формы посредством fetch на сервер.

//Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.

//Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.

//Похожим образом обработайте нажатие на кнопку сброса.*/

