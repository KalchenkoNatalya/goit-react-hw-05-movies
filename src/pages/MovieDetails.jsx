import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import Api from 'services/Api';
import Cast from './Cast';
import Reviews from './Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const api = new Api();
        const responceDetails = await api.movieDetails(movieId);
        setMovieDetails(responceDetails);
        // console.log(movieDetails);
      } catch (newError) {
        setError(newError);
      }
    };
    fetchMovieDetails();
  }, [movieId]);
  const { title, overview, poster_path, release_date, vote_average, genres } =
    movieDetails || {};

  const year = release_date ? release_date.split('-')[0] : '-';
  const userScore = vote_average ? Math.round(vote_average * 10) : '-';
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  const genresAll = genres ? genres.map(genre => genre.name).join('  ') : '-';
  // console.log(genresAll);

  return (
    <div>
      {error ? <p>{error.message}</p> : <div> "деталі фільму "</div>}
      <div>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <p>
          {title} ({year})
        </p>
        <p>User score: {userScore}%</p>

        <p>{'Overview'}</p>
        <p>{overview}</p>
        <p>{'Genres'}</p>
        <p>{genresAll}</p>
        <div>
          <p>Additional information</p>
          <ul>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews </NavLink>
          </ul>

          <Routes>
            <Route path="cast" element={<Cast />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
