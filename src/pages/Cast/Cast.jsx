import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from 'services/Api';
import css from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState();
  const [error, setError] = useState();
  const { movieId } = useParams();
  // console.log(movieId);
  useEffect(() => {
    if (!movieId) return;

    const fetchCastInformation = async () => {
      try {
        const api = new Api();
        const castInformation = await api.fetchCast(movieId);
        setCast(castInformation);
        // console.log(cast);
      } catch (newError) {
        setError(newError);
      }
    };

    fetchCastInformation();
  }, [movieId]);
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  // console.log(cast);
  return (
    <div>
      {error ? (
        <p>{error.message}</p>
      ) : (
        <ul className={css.cast_list}>
          {cast &&
            cast.map(({ id, name, character, profile_path }) => (
              <li key={id} className={css.cast_item}>
                <img
                  src={
                    profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultImg
                  }
                  width={250}
                  alt="poster"
                />
                  <p >{name}</p>
                  <p className={css.cast_name}>Character: {character}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Cast;
