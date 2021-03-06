import React from 'react';
import './SingleNews.css';

const NewsDate = () => {
    return (
        {newDate().toLocaleTimeString()}
    )
}

export const SingleNews = () => {
  return (
    <section className="singleNews">
      <div className="titleNews">
        <h1>Título de la noticia</h1>
      </div>

      <div className="newsData">
        <div className="newsImage">
          <img src=""></img>
        </div>

        <div className="newsDetails">
          <div className="newsCategory">Categoría</div>
          <div className="newsAuthor">
            <div className="avatar">
              {' '}
              <img src="" />
            </div>
            <div className="name">Nombre, Apellido 1, Apellido 2</div>
            <div className="biography">Soy escritor, poeta y periodista, me encanta escribir noticias online</div>
          </div>
          <div className="newsDate">Fecha</div>
          <div className="newsVotes">
            <div className="positiveVotes">
              <div className="positiveImg">
                <img src="" />
              </div>
              <div className="countPositive">10 Votos</div>
            </div>
            <div className="negativeVotes">
              <div className="negativeImg">
                <img src="" />
              </div>
              <div className="countNegative">8 Votos</div>
            </div>
          </div>
          <div className="newsLead">Esta es la entradilla de la noticia</div>
          <div className="newsBody"> Esto es el cuerpo de la noticia</div>
        </div>
      </div>
    </section>
  );
};
