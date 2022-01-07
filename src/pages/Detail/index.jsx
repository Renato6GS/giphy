import React from 'react';
import { Redirect } from 'wouter';
import { Helmet } from 'react-helmet';
import Gif from 'components/Gif';
import Spinner from 'components/Spinner';

import useSingleGif from 'hooks/useSingleGif';
import useSEO from 'hooks/useSEO';

export default function Detail({ params }) {
  const { gif, isLoading, isError } = useSingleGif({ id: params.id });
  const titleDocument = gif ? gif.title : '';

  // useSEO({ title: titleDocument, description: `Detail of ${titleDocument}` });

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
        <Spinner />
      </>
    );
  }
  if (isError) return <Redirect to='/404' />; // Esto es un tricky, puesto que en el servidor no sale 404
  if (!gif) return null;

  const { id, title, url } = gif;

  return (
    <>
      <Helmet>
        <title>{title} | Giphy</title>
      </Helmet>
      <h3 className='App-title'>{gif.title}</h3>
      <Gif key={id} id={id} title={title} url={url} />;
    </>
  );
}
