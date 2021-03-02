import React from 'react';
import './FormEditNews.css';

export const FormEditNews = () => {
  return (
    <section id="new-post" class="new">
      <div class="container">
        <form>
          <div class="row">
            <h4>Titular:</h4>
            <div class="input-group input-group-icon">
              <input type="text" placeholder="Titular (200 caracteres)" />
              <div class="input-icon">
                <i class="fa fa-heading"></i>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-half">
              <h4>Imagen:</h4>
              <div class="input-group input-group-icon">
                <input type="file" />
                <div class="input-icon">
                  <i class="fa fa-cloud-upload-alt"></i>
                </div>
              </div>
            </div>
            <div class="col-half">
              <h4>Tema:</h4>
              <div class="input-group">
                <select>
                  <option>Educación</option>
                  <option>Ciencia</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <h4>Entradilla de la noticia:</h4>
            <div class="input-group input-group-icon">
              <textarea placeholder="Entradilla (200 caracteres)" />
            </div>
          </div>
          <div class="row">
            <h4>Texto de la noticia:</h4>
            <div class="input-group input-group-icon">
              <textarea class="new" placeholder="Cuerpo de la noticias" />
            </div>
          </div>
          <div class="row">
            <button id="new">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
};
