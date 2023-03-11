// const axios = require('axios');
import axios from 'axios';

const API_KEY = '34271519-257a556d5fe8c31a240fa9516';
const URL = 'https://pixabay.com/api/';

export default async function fetchPhoto(value, numberPage = 1) {
  const config = {
    params: {
      key: API_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: numberPage,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get(URL, config);

    return response;
  } catch (error) {
    console.error(error);
  }
}
