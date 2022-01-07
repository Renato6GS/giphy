import React, { useCallback } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';

import useGifs from 'hooks/useGifs';
import Spinner from 'components/Spinner';
import ListOfGifs from 'components/ListOfGifs';
import TrendingSearches from 'components/TrendingSearches';
import './styles.css';
import SearchForm from 'components/SearchForm';

export default function Home() {
  const [, pushLocation] = useLocation(); // Path: Ruta actual, pushLocation: A donde queremos ir
  const { loading, gifs } = useGifs();

  // useCallback: Solamente se renderizará de nuevo si la pushLocation cambia, de este modo, no renderiza a cada
  // rato SearchForm cuando se renderiza Home
  // PERO, aun así se volverá a renderiza, no por las PROPS, sino porque Home (parent) se vuelve a renderizar. Para arreglarlo
  // Por cierto, no metemos esta función al SearchForm, para poder no aislar el uso del Form para navegación.
  // useMemo: Memoriza una variable/valor. Esto funcionaría, pero porque no usarlo en este caso, es porque complica y solo funcionaría aquí.
  // Por lo tanto, lo mejor sería utilizar ReactMemo en el componente Search Form, porque independientemente donde se utilice
  // SearchForm, sus elementos no se volverán a renderizar
  // Por lo tanto, debemos utilizar useCallback (para evitar que la prop submit cambie) y React.memo para guardar en memoria en caso
  // de que las props sean las mismas
  const handleSubmit = useCallback(
    ({ keyword }) => {
      pushLocation(`/search/${keyword}`);
    },
    [pushLocation]
  );

  return (
    <>
      <Helmet>
        <link rel='canonical' href='https://giphy-rho.vercel.app/' />
        <title>Home | Giphy</title>
      </Helmet>
      <SearchForm onSubmit={handleSubmit} />
      <div className='relleno'>Relleno para ver el lazyload</div>

      <h3>Última búsqueda</h3>
      {loading ? <Spinner /> : <ListOfGifs gifs={gifs} />}

      <h3>Tendencias</h3>
      <TrendingSearches />
    </>
  );
}
