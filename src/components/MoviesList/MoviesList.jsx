import { NavLink } from "react-router-dom";

const MoviesList = ({responceOnFetch, onClick}) => {

  return (
    <ul>
      {responceOnFetch.map(({ original_title, id }) => (
        <li key={id} > <NavLink to={`/movies/${id}`} activeclassname="active" onClick={onClick} >
        {original_title}
      </NavLink></li>
      ))}
    </ul>
  );
};

export default MoviesList;
