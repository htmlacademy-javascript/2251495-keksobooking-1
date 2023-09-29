// загрузка фото для аватара и фото жилья

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileUploader = document.querySelector('#avatar');
const photoPreview = document.querySelector('.ad-form-header__preview img');
const fileChooser = document.querySelector('.ad-form__upload input[type="file"]');
const imagePreview = document.querySelector('.ad-form__photo img');

const showPreview = (fileInput, previewElement) => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
};

fileUploader.addEventListener('change', () => showPreview(fileUploader, photoPreview));
fileChooser.addEventListener('change', () => showPreview(fileChooser, imagePreview));

