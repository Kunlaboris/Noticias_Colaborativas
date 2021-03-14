import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';

//FALTA PODER EDITAR LA FOTO

export const EditSingleNews = (props) => {
  // const { idNews: id } = props;
  const { REACT_APP_API_URL } = process.env;

  const [token, setToken] = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [msg, setMsg] = useState('');

  const history = useHistory();

  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  //const [foto, setFoto] = useState('');
  const [entradilla, setEntradilla] = useState('');
  const [texto, setTexto] = useState('');

  useEffect(() => {
    const loadNews = async () => {
      const response = await fetch(`http://localhost:3050/api/v1/news/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          //Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const json = await response.json();
        setTitulo(json.data.titulo);
        setEntradilla(json.data.entradilla);
        // setFoto(json.data.foto);
        setTexto(json.data.texto);
      } else {
        setErrorMsg('Ha sucedido un error');
      }
    };
    loadNews();
  }, []);

  const handleEditNews = async (e) => {
    e.preventDefault();
    const resp = await fetch(`http://localhost:3050/api/v1/news/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject: titulo,
        lead: entradilla,
        text: texto,
      }),
    });
    if (resp.ok) {
      const responseBody = await resp.json();
      setMsg(responseBody.message);
    } else {
      setErrorMsg('Se ha producido un error');
    }
  };
  return (
    <>
      <div>
        <div>Edita tu noticia</div>
        <div>
          <form onSubmit={handleEditNews}>
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
  );
};
