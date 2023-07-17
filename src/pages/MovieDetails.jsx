import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import Api from 'services/Api';
// import Cast from './Cast';
// import Reviews from './Reviews';
import Loader from 'components/Loader/Loader';
const Cast = lazy(() => import('./Cast'));
const Reviews  = lazy(() => import('./Reviews'));

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.form ?? '/');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const api = new Api();
        const responceDetails = await api.movieDetails(movieId);
        setMovieDetails(responceDetails);
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


  return (
    <div>
      <NavLink to={backLink.current}>Go back</NavLink>
      {error ? (
        <p>{error.message}</p>
      ) : (
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

           <Suspense fallback={<Loader/>}>
              <Routes>
                <Route path="cast" element={<Cast />}></Route>
                <Route path="reviews" element={<Reviews />}></Route>
              </Routes>
           </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
