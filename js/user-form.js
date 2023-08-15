const advertisementForm = document.querySelector('.ad-form');
const formElements = advertisementForm.children;
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.children;


const disableForm = () => {

  advertisementForm.classList.add('ad-form--disabled'); // Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled'); //Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled,
  //добавленного на них или на их родительские блоки fieldset. Слайдер также должен быть заблокирован;
  }

  mapForm.classList.add('map__filters--disabled'); //Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled'); //класс, а на её интерактивные элементы атрибуты disabled.
  }
};

disableForm();
