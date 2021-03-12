import './Menu.css';

export const Menu = () => {
  return (
    <nav>
      <a href="./" className="logo">
        <img src="./img/Logo-Kunlaboris-negativo-80x428px.png" alt="logo" className="logo" />
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
        <li>
          <a href="/addnews">Añade una noticia</a>
        </li>
        <li>
          <a href="#">Por Tema</a>
        </li>
        <li>
          <a href="#">Más Recientes</a>
        </li>
      </ul>
    </nav>
  );
};
