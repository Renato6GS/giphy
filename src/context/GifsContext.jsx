import React, { useState } from 'react';

const Context = React.createContext({});

// Podemos crear nuestro provider, que es donde tenemos el value
export function GifsContextProvider({ children }) {
  const [gifs, setGifs] = useState([]);

  return <Context.Provider value={{ gifs, setGifs }}>{children}</Context.Provider>;
}

export default Context;
