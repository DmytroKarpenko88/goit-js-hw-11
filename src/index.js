import { reject } from 'lodash';
import { galleryPictureCard } from './templates/galleryPictureCard';
import axios from 'axios';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

const API_KEY = '34271519-257a556d5fe8c31a240fa9516';
const URL = 'https://pixabay.com/api/';
const config = {
  params: {
    key: API_KEY,
    q: 'cat',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  },
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  try {
    main().then(response => {
      const photos = response.data.hits;

      console.log('photos:', photos);

      renderCard(photos);
      console.log('renderCard:', renderCard);
    });
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    const response = await axios.get(URL, config);

    return response;
  } catch (error) {
    console.error(error);
  }
}

function renderCard(data) {
  refs.gallery.innerHTML = data
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
}

/*
  webformatURL - посилання на маленьке зображення для списку карток.
largeImageURL - посилання на велике зображення.
tags - рядок з описом зображення. Підійде для атрибуту alt.
likes - кількість лайків.
views - кількість переглядів.
comments - кількість коментарів.
downloads - кількість завантажень.
  */
// axios(URL, config)
//   .then(({ data }) =>
//     data.hits.map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) =>
//         console.log(
//           webformatURL,
//           largeImageURL,
//           tags,
//           likes,
//           views,
//           comments,
//           downloads
//         )
//     )
//   )
//   .catch(error => console.error(error));
