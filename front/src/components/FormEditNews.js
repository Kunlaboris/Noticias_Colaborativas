import React, { useContext } from 'react';
import './FormEditNews.css';

import { useRemoteCategory } from '../api/useRemoteCategory';
import { useUploadNews } from '../api/useUploadNews';
import { AuthContext } from './AuthProvider';

export const FormEditNews = () => {
  const [token] = useContext(AuthContext);

  const { categories, setCategories } = useRemoteCategory([{ id: 1, nombre: 'economía' }]);
  const { news, setNews, errorNews } = useUploadNews();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.title.value);
    const contentBody = {
      subject: e.target.title.value,
      category: e.target.category.value,
      // foto: e.target.files[0],
      lead: e.target.excerpt.value,
      text: e.target.textnews.value,
    };

    const response = await fetch('http://localhost:3050/api/v1/news/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contentBody),
    });
    const resNew = await response.json();
    const newPost = [...news, resNew];
    setNews(newPost);
  }

  return (
    <section id="new-post" className="new">
      <div className="container">
        <h2>
          <i className="fas fa-edit"></i>Añadir noticias colaborativas
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h4>Titular:</h4>
            <div className="input-group input-group-icon">
              <input type="text" placeholder="Titular (200 caracteres)" name="title" />
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
                <select name="category">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <h4>Entradilla de la noticia:</h4>
            <div className="input-group input-group-icon">
              <textarea placeholder="Entradilla (200 caracteres)" name="excerpt" />
            </div>
          </div>
          <div className="row">
            <h4>Texto de la noticia:</h4>
            <div className="input-group input-group-icon">
              <textarea className="new" placeholder="Cuerpo de la noticias" name="textnews" />
            </div>
          </div>
          <div className="row">
            <button id="new" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
