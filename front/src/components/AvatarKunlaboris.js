import { Link } from 'react-router-dom';
import './AvatarKunlaboris.css';

export const AvatarKunlaboris = ({ className = '', date, name, photo, id }) => {
  const { REACT_APP_API_URL } = process.env;

  const avatarImage = photo ? `${REACT_APP_API_URL}/images/profiles/${photo}` : './img/avatar-kunlaboris.svg';
  return (
    <div id="avatar-user" className={className}>
      <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
      <Link to={`/users/${id}`}>
        <img src={avatarImage} alt="Avatar" className="color-avatar" />
        <div id="nameAvatar">{name}</div>
      </Link>
    </div>
  );
};
