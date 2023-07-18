import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import Api from 'services/Api';
import Loader from 'components/Loader/Loader';
import css from './MovieDetails.module.css';
const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

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
  const genresAll = genres ? genres.map(genre => genre.name).join(' | ') : '-';

  return (
    <div className={css.container_movieDetails}>
      {/* <NavLink to={location.state?.from ?? "/" }>Go back</NavLink> */}
      <NavLink to={backLinkLocationRef.current} className={css.button_back}>
        Go back
      </NavLink>

      {error ? (
        <p>{error.message}</p>
      ) : (
        <div>
          <div className={css.movie_details_wrap}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/original${poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
              className={css.poster_movie}
            />
            <div className={css.movie_details_info}>
              <p className={css.movie_deteils_title}>
                {title} ({year})
              </p>
              <p className={`${css.subtitle} ${css.movie_deteils_score}`}>
                User score: {userScore}%
              </p>

              <p className={css.subtitle}>{'Overview'}</p>
              <p className={css.movie_deteils_overview_text}>{overview}</p>

              <div className={css.movie_deteils_genres_wrap}>
                <p className={css.subtitle}>{'Genres:'}</p>
                <p>{genresAll}</p>
              </div>
            </div>{' '}
          </div>

          <div className={css.additional_wrap}>
            <p className={css.subtitle}>Additional information:</p>
            <ul className={css.additional_list}>
              <li>
                {' '}
                <NavLink to="cast" className={css.additional_link}>
                  Cast
                </NavLink>{' '}
              </li>
              <li>
                {' '}
                <NavLink to="reviews" className={css.additional_link}>
                  Reviews{' '}
                </NavLink>{' '}
              </li>
            </ul>
          </div>

          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="cast" element={<Cast />}></Route>
              <Route path="reviews" element={<Reviews />}></Route>
            </Routes>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
