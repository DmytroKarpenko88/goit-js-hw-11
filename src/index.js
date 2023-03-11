import { reject } from 'lodash';
import { galleryPictureCard } from './templates/galleryPictureCard';
import fetchPhoto from './js/api';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchValue = e.target.searchQuery.value;

  try {
    const response = fetchPhoto(searchValue);

    response.then(response => {
      const photos = response.data.hits;

      console.log('photos:', photos);

      renderCard(photos);
    });
  } catch (error) {
    console.log(error);
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
