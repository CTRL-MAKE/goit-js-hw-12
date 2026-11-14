import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '58494422-62f2ea08788c8103f77a57f53';

export const getImagesByQuery = async (query, page) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
};
