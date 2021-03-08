import './MiniBoxBio.css';

export const MiniBoxBio = (props) => {
  return (
    <div id="mini-box-bio">
      <img src="./img/avatar-kunlaboris.svg" width="40px" />
      <div id="box-name">
        <h3>
          {props.children.nombre} {props.children.apellido_1}
        </h3>
        <p>{props.children.biografia}</p>
      </div>
    </div>
  );
};
