import { NavLink, useLocation } from 'react-router-dom';
import css from "./MovieList.module.css"

const MoviesList = ({ responceOnFetch }) => {
  const location = useLocation();
  // console.log(location)
  return (
    <ul>
      {responceOnFetch.map(({ original_title, id }) => (
        <li key={id} className={css.movie_list_item}>
          {' '}
          <NavLink
            to={`/movies/${id}`}
            state={{ from: location }}
            // activeclassname="active"
            className={css.movie_list_link}

          >
            {original_title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
