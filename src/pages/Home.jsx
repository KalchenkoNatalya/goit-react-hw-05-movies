import MoviesList from 'components/MoviesList/MoviesList';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Api from 'services/Api';

const Home = () => {
  const [error, setError] = useState();

  const [trendingArray, setTrendingArray] = useState([]);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const api = new Api();
        const responceTrending = await api.fetchTrendingMovies();
        setTrendingArray(responceTrending);
        // console.log(trendingMovies)
        console.log(responceTrending);
      } catch (newError) {
        setError(newError);
      }
    };
    fetchTrending();
  }, []);
  const onClick = movieId => {
    const fetchOneMovie = async () => {
      try {
        const api = new Api();
        const responceDetails = await api.movieDetails(movieId);
        console.log(responceDetails);
      } catch (error) {}
    };
    fetchOneMovie();
    
  };
  return (
    <div>
      {error ? (
        <p>{error.message}</p>
      ) : (
        <MoviesList responceOnFetch={trendingArray} onClick={onClick} />
      )}
    </div>
  );
};

export default Home;
