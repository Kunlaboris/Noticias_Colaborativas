import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRemoteCategory } from '../api/useRemoteCategory';
import { AuthContext } from '../components/AuthProvider';
import './EditSingleNews.css';

//FALTA PODER EDITAR LA FOTO

export const EditSingleNews = (props) => {
  // const { idNews: id } = props;
  const { REACT_APP_API_URL } = process.env;
  const { categories, setCategories } = useRemoteCategory([{ id: 1, nombre: 'economía' }]);

  const [token, setToken] = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState(null);

  const inputRef = useRef();
  const history = useHistory();

  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  const [foto, setFoto] = useState('');
  const [category, setCategory] = useState('');
  const [entradilla, setEntradilla] = useState('');
  const [texto, setTexto] = useState('');

  const onFileChange = (event) => {
    const f = event.target.files[0];
    setFile(f);
  };

  useEffect(() => {
    const loadNews = async () => {
      const response = await fetch(`http://localhost:3050/api/v1/news/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          //Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        setTitulo(json.data.titulo);
        setEntradilla(json.data.entradilla);
        setCategory(json.data.id_categoria);
        setFoto(json.data.miniatura);
        setTexto(json.data.texto);
        console.log(json);
      } else {
        setErrorMsg('Ha sucedido un error');
      }
    };
    loadNews();
  }, []);

  const handleEditNews = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('subject', titulo);
    data.append('category', category);
    data.append('lead', entradilla);
    data.append('text', texto);
    data.append('foto', file);
    // JSON.stringify({
    //         subject: titulo,
    //         lead: entradilla,
    //         text: texto,}),
    const resp = await fetch(`http://localhost:3050/api/v1/news/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const responseBody = await resp.json();
    if (resp.ok) {
      history.push(`/news/${id}`);
      // setMsg(responseBody.message);
    } else {
      setErrorMsg(responseBody.error);
    }
  };
  return (
    <section id="new-post" className="new">
      <div className="container">
        <h2>
          <i className="far fa-edit"></i> Editar noticias colaborativas
        </h2>
        <form onSubmit={handleEditNews}>
          {foto && <img src={`${process.env.REACT_APP_API_URL}/images/news/${foto}`} alt={titulo} />}
          <div className="row">
            <h4>Titular:</h4>
            <div className="input-group input-group-icon">
              <input
                type="text"
                placeholder="Titular (200 caracteres)"
                name="title"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
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
                <input type="file" onChange={onFileChange} />
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
                value={entradilla}
                onChange={(e) => setEntradilla(e.target.value)}
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
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
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
        {msg && <div>{msg}</div>}
      </div>
    </section>
  );
};
/* (
    <>
      <div>
        <div>Edita tu noticia</div>
        <div>
          <form >
            <div>
              <label htmlFor="titulo"></label>
              <input name="titulo" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div>FOTO</div>
            <div>
              <label htmlFor="entradilla"></label>
              <input name="entradilla" type="text" value={entradilla} onChange={(e) => setEntradilla(e.target.value)} />
            </div>
            <div>
              <label htmlFor="texto"></label>
              <input name="texto" type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
            </div>
            {errorMsg && <div>{errorMsg}</div>}
            <button type="submit">Guardar</button>
            {msg && <div>{msg}</div>}
          </form>
        </div>
      </div>
    </>
  ); */
