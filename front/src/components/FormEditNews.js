import React from 'react';
import './FormEditNews.css';

import { useRemoteCategory } from '../api/useRemoteCategory';

export const FormEditNews = () => {
  const { categories, setCategories } = useRemoteCategory([{ id: 1, nombre: 'economía' }]);

  async function handleSubmit(e) {
    const contentBody = {
      subject: 'contenido',
      category: 'categoria',
      lead: 'contenido',
      text: 'contenido texto',
    };

    const response = await fetch('http://localhost:3000/api/v1/voting', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(contentBody),
    });
    const resNew = await response.json();
    const newPost = [...messages, resNew];
    setMessages(nuevaListaDeMensajesLocal);
  }

  return (
    <section id="new-post" className="new">
      <div className="container">
        <form onSubmit={handleSubmit}>
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
                  {categories.map((cat) => (
                    <option key={cat.id}>{cat.nombre}</option>
                  ))}
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
