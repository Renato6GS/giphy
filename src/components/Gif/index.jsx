import React from 'react';
import { Link } from 'wouter';

import './styles.css';

function Gif({ title, id, url }) {
  return (
    <div className='Gif'>
      <Link to={`/gif/${id}`} className='Gif-link'>
        <h4>{title}</h4>
        <img src={url} alt={title} loading='lazy' />
      </Link>
    </div>
  );
}

export default React.memo(Gif);

// Este es un ejemplo super claro de React.memo, porque en vez de renderizar gif por gif, solo renderiza el padre
// Los objtoes y los arrays son referencias, por lo tanto, si creamos un nuevo objeto
// react solo revisará si son iguales al anterior, no hará una deepEqual,
// por lo tanto, al agregar una nueva propiedad desde ListOfGifs que es diferente, rompe el React.memo

// Esto es lo que hace el Memo, más o menos. Compara el valor anterior y el siguiente
// export default React.memo(Gif, (prevProps, nextProps) => {
//   return prevProps === nextProps;
// })

// Para solucionar esto, podríamos solo comparar algo en específico, como el id. Para no tener que comparar el objeto entero
// export default React.memo(Gif, (prevProps, nextProps) => {
//   return prevProps.id === nextProps.id;
// })
