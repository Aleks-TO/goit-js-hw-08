// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Створюємо розмітку з допомогою методів мар, після якого визодить масив з елементів розмітки, додаємо метод join для обэднання в одну
const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) => `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
    `
  )
  .join('');

console.log(galleryMarkup);

// Знайдемо посилання на дів галереї
const galleryEl = document.querySelector('.gallery');

// Додамо нашу розмітку в документ
galleryEl.insertAdjacentHTML('afterbegin', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  showCounter: false,
});
