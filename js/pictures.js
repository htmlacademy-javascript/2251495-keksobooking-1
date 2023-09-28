// загрузка фото для аватара и фото жилья

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileUploader = document.querySelector('.ad-form__field input[type="file"]');
const photoPreview = document.querySelector('.ad-form-header__preview');
const fileChooser = document.querySelector('.ad-form__upload input[type="file"]');
const imagePreview = document.querySelector('.ad-form__photo');

fileUploader.addEventListener('change', () => {
  const file = fileUploader.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
  }
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
});
