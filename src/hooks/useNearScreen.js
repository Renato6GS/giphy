import { useEffect, useState, useRef } from 'react';

export default function useNearScreen({ distance = '100px', externalRef, once = true } = {}) {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(function () {
    let observer;

    const element = externalRef ? externalRef.current : fromRef.current;

    const onChange = (entries, observer) => {
      // Podemos tener muchas entries
      const el = entries[0];

      if (el.isIntersecting) {
        setShow(true);
        once && observer.disconnect(); // Evitamos que se vuelva a ejecutar otra vez
      } else {
        !once && setShow(false);
      }
    };

    // Con Polyfill: Solamente lo cargaremos en caso de que el navegador no lo soporte
    Promise.resolve(
      typeof IntersectionObserver !== 'undefined' ? IntersectionObserver : import('intersection-observer')
    ).then(() => {
      const observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      });

      if (element) observer.observe(element);
    });

    // Intersection observer API: Es una API de la plataforma que permite detectar cuando un elemento está en el vieport, y mucho más...
    // Esto es mucho mejo a escuchar el scroll
    // Cuando haya una distancia de 100px

    return () => observer && observer.disconnect(); // Limpiar el evento
  });

  return { isNearScreen, fromRef };
}
