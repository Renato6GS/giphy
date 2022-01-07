import React from 'react';

// Creamos el context con unos valores iniciales. Esto es en caso
// en donde un componente no está envuelto del provider.
const Context = React.createContext({
  name: 'esto es sin provider',
});

export default Context;
