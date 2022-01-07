import React, { useState } from 'react';

function SearchForm({ onSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Evitamos que recargue la pantalla, debido al form post
    // pushLocation(`/search/${keyword}`);
    onSubmit({ keyword });
  };

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  return (
    <form action='' onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type='text'
        name='search'
        id='search'
        value={keyword}
        placeholder='Search a gif...'
      />
      {/* Cuando el último elemento del form es un botón, detecta automáticamente el submit sin tener que asignarle un onClick */}
      <button>Buscar</button>
    </form>
  );
}

// React.memo: Componente de orden superior: Se pasa como parámetro un componente y se retorna un componente
export default React.memo(SearchForm);
