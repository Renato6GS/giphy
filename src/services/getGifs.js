import { API_KEY, API_URL } from './settings';

const fromApiREsponseToGifs = (apiResponse) => {
  const { data } = apiResponse;
  const gifs = data.map((image) => {
    const { images, title, id } = image;
    const { url } = images.downsized_medium;
    return { title, id, url };
  });
  return gifs;
};

export default function getGifs({ keyword = 'panda', limit = 10, page = 0 } = {}) {
  const apiURL = `${API_URL}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=${limit}&offset=${
    page * limit
  }&rating=g&lang=en`;

  return fetch(apiURL)
    .then((res) => res.json())
    .then(fromApiREsponseToGifs);
}
