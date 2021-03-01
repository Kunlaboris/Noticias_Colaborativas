import './Menu.css';

export const Menu = () => {
  return (
    <nav>
      <a href="./" class="logo">
        <img src="./img/Logo-Kunlaboris-negativo-80x428px.png" alt="logo" class="logo" />
      </a>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="menu">
        <li>
          <a href="#">Más populares</a>
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
