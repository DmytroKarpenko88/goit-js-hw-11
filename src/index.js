// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { galleryPictureCard } from './templates/galleryPictureCard';
import fetchPhoto from './js/api';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('button.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  animationSlide: false,
  captionsData: 'alt',
  captionDelay: 250,
});

let searchValue = '';
let numberPage = 1;
let totalHits = null;
refs.btnLoadMore;
refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.classList.toggle('visually-hidden');
refs.btnLoadMore.addEventListener('click', onLoad);

async function onSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  searchValue = e.target.searchQuery.value.trim();

  try {
    const response = await fetchPhoto(searchValue);
    numberPage += 1;
    totalHits = response.data.totalHits;
    refs.btnLoadMore.classList.toggle('visually-hidden');

    if (!totalHits) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (totalHits === 1) {
      Notify.info(`Hooray! We found ${totalHits} image.`);
    } else {
      Notify.info(`Hooray! We found ${totalHits} images.`);
    }

    if (response.name === 'AxiosError') {
      throw new Error(response.message);
    }

    const photos = await response.data.hits;

    if (photos.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderCard(photos);
  } catch (error) {
    Notify.failure(error);
  }
}

async function onLoad() {
  const totalCounts = document.querySelectorAll('.photo-card').length;
  console.log('totalCounts:', totalCounts);

  if (totalHits === totalCounts) {
    refs.btnLoadMore.classList.toggle('visually-hidden');

    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  try {
    const response = await fetchPhoto(searchValue, numberPage);

    if (response.name === 'AxiosError') {
      throw new Error(response.message);
    }

    const photos = await response.data.hits;

    renderCard(photos);

    numberPage += 1;
  } catch (error) {
    Notify.failure(error);
  }
}

async function renderCard(data) {
  const markup = await data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        galleryPictureCard({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        })
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  smothScroll();
}

function smothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
