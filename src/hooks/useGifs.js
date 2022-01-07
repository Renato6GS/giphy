import { useEffect, useState, useContext } from 'react';
import GifsContext from 'context/GifsContext';

import getGifs from 'services/getGifs';

const INITIAL_PAGE = 0;

export default function useGifs({ keyword, limit } = { keyword: null, limit: 4 }) {
  const [loading, setLoading] = useState(false);

  // Paginación
  const [page, setPage] = useState(INITIAL_PAGE);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  // const [gifs, setGifs] = useState([]); // Forma local
  const { gifs, setGifs } = useContext(GifsContext); // Forma global con context

  // Recuperamos la keyword del local storage en caso de que la keyword sea un falsy
  // En caso de que nunca ha buscado nada, devolvemos random
  const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random';

  useEffect(
    function () {
      setLoading(true);

      getGifs({ keyword: keywordToUse, limit }).then((gifs) => {
        setGifs(gifs);
        setLoading(false);
        localStorage.setItem('lastKeyword', keyword); // Guardamos la keyword
      });
    },
    [keyword, keywordToUse, setGifs]
  );

  useEffect(
    function () {
      if (page === INITIAL_PAGE) return;

      setLoadingNextPage(true);
      getGifs({ keyword: keywordToUse, page }).then((nextGifs) => {
        setGifs((prevGifs) => prevGifs.concat(nextGifs));
        setLoadingNextPage(false);
      });
    },
    [keywordToUse, page]
  );

  return { loading, loadingNextPage, gifs, setPage };
}
