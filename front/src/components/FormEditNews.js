import React, { useContext, useRef, useState } from 'react';
import './FormEditNews.css';

import { useRemoteCategory } from '../api/useRemoteCategory';
import { useUploadNews } from '../api/useUploadNews';
import { AuthContext } from './AuthProvider';
import { useHistory } from 'react-router';

export const FormEditNews = () => {
  const [token] = useContext(AuthContext);

  const { categories, setCategories } = useRemoteCategory([{ id: 1, nombre: 'economía' }]);
  const { news, setNews, errorNews } = useUploadNews();
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const inputRef = useRef();

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [textNews, setTextNews] = useState('');

  const onFileChange = (event) => {
    const f = event.target.files[0];
    setFile(f);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append('subject', title);
    data.append('category', category);
    data.append('lead', excerpt);
    data.append('text', textNews);
    data.append('foto', file);

    const response = await fetch('http://localhost:3050/api/v1/news/', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        type: 'formData',
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    console.log('file');
    if (response.ok) {
      const resNew = await response.json();
      const newPost = [...news, resNew];
      setNews(newPost);
      history.push('/');
    } else {
      setErrorMsg('Se ha producido un error');
    }
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
              <input
                type="text"
                placeholder="Titular (200 caracteres)"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="input-icon">
                <i className="fa fa-heading"></i>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-half">
              <h4>Imagen:</h4>
              <div className="input-group input-group-icon">
                <input type="file" ref={inputRef} onChange={onFileChange} />
                <div className="input-icon">
                  <i className="fa fa-cloud-upload-alt"></i>
                </div>
              </div>
            </div>
            <div className="col-half">
              <h4>Tema:</h4>
              <div className="input-group">
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
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
              <textarea
                placeholder="Entradilla (200 caracteres)"
                name="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <h4>Texto de la noticia:</h4>
            <div className="input-group input-group-icon">
              <textarea
                className="new"
                placeholder="Cuerpo de la noticias"
                name="textnews"
                value={textNews}
                onChange={(e) => setTextNews(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <button id="new" type="submit">
              Enviar
            </button>

            {errorMsg && <div>{errorMsg}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};
