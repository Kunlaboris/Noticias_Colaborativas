import './ArticleNew.css';
import { FaceKunla } from './FaceKunla';

export const ArticleNews = (params) => {
  return (
    <article>
      <div id="header-article">
        <img className="movil" src="./img/Foto-Prueba-Kunlaboris.jpg" alt="foto-noticia" />
        <img className="tablet" src="./img/Foto-Prueba-Kunlaboris-peq.jpg" alt="foto-noticia" />
        <div id="voting">
          <FaceKunla format="square" state="happy" vote="6" />
          <FaceKunla format="square" state="sad" vote="12" />
        </div>
      </div>
      <div id="body-article">
        <div className="avatar">
          <img src="./img/avatar-kunlaboris.svg" alt="Avatar" />
          <div className="data-name">
            <h4 className="data">02/05/2021</h4>
            <h2 className="name">Nombre Apellido1 Apellido2</h2>
          </div>
        </div>
        <h1 className="title">
          <a href="">Lorem ipsum dolor sit amet consectetur, adipiscing elit mi cum odio, vestibulum aliquet in dis</a>
        </h1>
        <p className="excerpt">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el
          texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. de persona que se dedica
          a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera.
        </p>
      </div>
    </article>
  );
};
