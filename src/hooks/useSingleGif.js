import { useState, useEffect } from 'react';
import useGifs from 'hooks/useGifs';
import getSingleGif from 'services/getSingleGif';

export default function useSingleGif({ id }) {
  const { gifs } = useGifs();
  const gifFromCache = gifs.find((singleGif) => singleGif.id === id);

  const [gif, setGif] = useState(gifFromCache);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    function () {
      // Solo queremos que se ejecute si gif no existe
      if (!gif) {
        setIsLoading(true);
        getSingleGif({ id })
          .then((gif) => {
            setGif(gif);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.log(error);
          });
      }
    },
    [gif, id]
  );

  return { gif, isLoading, isError };
}
