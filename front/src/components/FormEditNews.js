import React from 'react';
import './FormEditNews.css';

export const FormEditNews = () => {
  return (
    <section id="new-post" className="new">
      <div className="container">
        <form>
          <div className="row">
            <h4>Titular:</h4>
            <div className="input-group input-group-icon">
              <input type="text" placeholder="Titular (200 caracteres)" />
              <div className="input-icon">
                <i className="fa fa-heading"></i>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-half">
              <h4>Imagen:</h4>
              <div className="input-group input-group-icon">
                <input type="file" />
                <div className="input-icon">
                  <i className="fa fa-cloud-upload-alt"></i>
                </div>
              </div>
            </div>
            <div className="col-half">
              <h4>Tema:</h4>
              <div className="input-group">
                <select>
                  <option>Educación</option>
                  <option>Ciencia</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <h4>Entradilla de la noticia:</h4>
            <div className="input-group input-group-icon">
              <textarea placeholder="Entradilla (200 caracteres)" />
            </div>
          </div>
          <div className="row">
            <h4>Texto de la noticia:</h4>
            <div className="input-group input-group-icon">
              <textarea className="new" placeholder="Cuerpo de la noticias" />
            </div>
          </div>
          <div className="row">
            <button id="new">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
};
