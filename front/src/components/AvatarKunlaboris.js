import { Link } from 'react-router-dom';
import './AvatarKunlaboris.css';

export const AvatarKunlaboris = ({ className = '', date, name, photo, id }) => {
  const { REACT_APP_API_URL } = process.env;

  const avatarImage = photo ? `${REACT_APP_API_URL}/images/profiles/${photo}` : '../../img/avatar-kunlaboris.svg';
  return (
    <div id="avatar" className={className}>
      <img src={avatarImage} alt="Avatar" />
      <div id="dataAvatar">
        <h5>{date && <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>}</h5>
        <p>{className === 'avatar-user' ? <Link to={`/users/${id}`}> {name}</Link> : name}</p>
      </div>
    </div>
  );
};
