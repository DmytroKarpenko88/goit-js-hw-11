import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import { listItemTemplate } from './templates/listItemTemplate';
import { countryCardTemplate } from './templates/countryCardTemplate';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  const inputValue = event.target.value.trim();

  removeChildren(refs.countryList);
  removeChildren(refs.countryInfo);

  if (inputValue === '') {
    return;
  }
  const data = fetchCountries(inputValue);

  data
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countries.length === 1) {
        renderCard(countries[0]);
        return;
      }

      renderList(countries);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderList(countries) {
  refs.countryList.innerHTML = countries
    .map(({ name, flags }) => listItemTemplate({ name, flags }))
    .join('');
}

function renderCard(country) {
  refs.countryInfo.innerHTML = countryCardTemplate(country);
}

function removeChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
