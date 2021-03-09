import React from 'react';

export const DeleteNews = (props) => {
  const { news, setNews, idKey } = props;
  let newNews = [...news];
  async function deleteNewsa(event) {
    const indexNews = news.findIndex((news) => news.id === event);
    const deleteOfList = newNews.splice(indexNews, 1);
    console.log(deleteOfList[0].id);

    /// COMPROBAR LA URL

    await fetch(`http://localhost:3050/news/${deleteOfList[0].id}`, {
      method: 'DELETE',
    });
    return setNews(newNews);
  }
  return <button onClick={() => deleteNews(idKey)}>Eliminar noticia</button>;
};
