import { NavLink } from "react-router-dom";

const TrendingMoviesList = ({responceTrending, onClick}) => {

  return (
    <ul>
      {responceTrending.map(({ original_title, id }) => (
        <li key={id} > <NavLink to={`/movies/${id}`} activeclassname="active" onClick={onClick} >
        {original_title}
      </NavLink></li>
      ))}
    </ul>
  );
};

export default TrendingMoviesList;
