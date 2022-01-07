import React from 'react';

import Gif from 'components/Gif';
import './styles.css';

export default function ListOfGifs({ gifs }) {
  // List of Gifs solo se encarga de listar los gifs, no de obtenerlos ni buscarlos ni nada de eso
  // Solo mostrarlos
  return (
    <div className='ListOfGifs'>
      {gifs.map(({ id, title, url }) => (
        <Gif key={id} id={id} title={title} url={url} />
      ))}
    </div>
  );
}
