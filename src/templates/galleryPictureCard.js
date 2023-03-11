/*
  webformatURL - посилання на маленьке зображення для списку карток.
largeImageURL - посилання на велике зображення.
tags - рядок з описом зображення. Підійде для атрибуту alt.
likes - кількість лайків.
views - кількість переглядів.
comments - кількість коментарів.
downloads - кількість завантажень.
  */
export const galleryPictureCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>
    `;
};
