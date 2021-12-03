import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Footer({ caption, username }) {
  return (
    <div className="p-4 pt-2 pb-0">
      <Link to={`/p/${username}`}>
        <span className="mr-1 font-bold">{username}</span>
      </Link>
      <span>{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
