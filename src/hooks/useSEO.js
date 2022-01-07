import { useEffect, useRef } from 'react';

export default function useTitle({ title, description }) {
  const prevTitle = useRef(document.title); // title de este momento
  const prevDescription = useRef(document.querySelector('meta[name="description"]').getAttribute('content'));

  useEffect(() => {
    const previousTitle = prevTitle.current;
    if (title) {
      document.title = `${title} | Giphy`;
    }

    return () => (document.title = previousTitle); // Cuando se desmote el componente, volvera a ejecutar el document.title. Es decir,
    // Le cambia el valor del title para la siguiente vez que se ejecute.
  }, [title]);

  useEffect(() => {
    const previousDescription = prevDescription.current;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      metaDescription.setAttribute('content', description);
    }

    return () => metaDescription.setAttribute('content', previousDescription);
  }, [description]);
}
