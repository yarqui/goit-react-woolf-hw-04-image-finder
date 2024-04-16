import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '32117995-da98556d394b8c9b5a96c2a58';

const per_page = 12;

axios.defaults.baseURL = BASE_URL;

const fetchPhotos = async (query, page) => {
  const searchParams = new URLSearchParams({
    q: query,
    page,
    per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    key: API_KEY,
  });

  return await axios.get(`/?${searchParams}`);
};

export { fetchPhotos, per_page };
