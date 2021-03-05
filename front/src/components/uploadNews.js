import React from 'react';

// MUESTRA LAS NOTICIAS EN LA HOME

export const UploadNews = () => {
  // las funciones que manejan los eventos van siempre dentro del componente
  // y antes de que se pinte JSX

  // definición del manejador de eventos, función que recibe el evento y hace algo
  // en este caso pide al servidor la lista de todas las noticias
  // ¿CÓMO HACER QUE CARGUE SOLO LAS 10 POR ORDEN LAS MÁS RECIENTE
  // COMPROBAR LA URL EN BACK - get all news
  // COMPROBAR EL CODIGO DE RESPUESTA STATUS EN EL BACKEND, TIENEN QUE CONINCIDIR
  // GET 200, POST 201 ES LOS MÁS HABITUAL

  const [news, setNews] = useState([]);

  const [errorNews, setErrorNews] = useState('');

  const loadNews = async () => {
    const response = await fetch('http://localhost:30/api/v1/news');
    if (response.status === 200) {
      const json = await response.json();
      setNews(json);
      // para que borre el mensaje de error cuando devuelve la lista
      setErrorNews('');
    } else {
      setErrorNews('Ha sucedido un error');
    }
  };
  return (
    <div>
      {errorNews}
      <button onClick={loadNews}>Cargar noticias</button>
    </div>
  );
};
