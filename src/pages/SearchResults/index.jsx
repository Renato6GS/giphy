import React, { useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import ListOfGifs from 'components/ListOfGifs';
import Spinner from 'components/Spinner';
import useGifs from 'hooks/useGifs';
import useNearScreen from 'hooks/useNearScreen';
import debounce from 'just-debounce-it';
// import useSEO from 'hooks/useSEO';

export default function SearchResults({ params }) {
  const { keyword } = params;
  const { loading, gifs, setPage } = useGifs({ keyword, limit: 5 }); // Custom Hook
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({ externalRef: loading ? null : externalRef, once: false });

  const title = gifs ? `${gifs.length} resultados de ${keyword}` : loading ? 'Cargando...' : '';
  // useSEO({ title, update: Boolean(params.keyword) }); // El hook tiene que ejecutarse sí o sí, no podemos ponerle una condición aquí

  const debounceHandleNextPage = useCallback(
    debounce(() => setPage((prevPage) => prevPage + 1), 200), // Con debounce, aunque se ejecute 20 veces en 200 ms, solo devuelva una
    [setPage]
  );

  useEffect(
    function () {
      console.log(isNearScreen);
      if (isNearScreen) debounceHandleNextPage();
    },
    [debounceHandleNextPage, isNearScreen]
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Helmet>
            <title>{title}</title>
            <meta name='description' content={title} />
          </Helmet>
          <h3 className='App-title'>{decodeURI(keyword)}</h3>
          <ListOfGifs gifs={gifs} />
          <div id='visor' ref={externalRef}></div>
        </>
      )}
      {/* <button onClick={handleNextPage}>Next page</button> */}
      {/* VAmos a utilizar useNearScreen para crear un inifite scroll */}
    </>
  );
}

// EXPLICACIÓN

// Usamos una función porque no sabemos la currentPage. PARA TENER PAGINACIÓN CON UN BOTÓN
// const handleNextPage = () => setPage((prevPage) => prevPage + 1);

// useCallback = Guarda/recibe una función. Es como una mezcla entre useRef y useEffect. Con debounce estamos retornando una función
// just-debounce-it: Librería de "just", el cual permite que de 80 trues que nos regresen, solo ejecutemos 1
// Con el useCallback evitamos que la función se vuelva a renderizar cada vez que se renderiza el componente. Esto no es muy malo, pero
// puede que la función puede ser muy costosa o porque queremos que la función sea la misma

// const handeExample = useCallback(
//   () => {
//     console.log('hola');
//   },
//   [],
// ); // Solo se renderiza una sola vez
// const handeExample2 = useCallback(
//   () => {
//     console.log(gifs.lenght);
//   },
//   [gifs],
// ); // La función únicamente se volverá a renderizar, si "gifs" cambia.
