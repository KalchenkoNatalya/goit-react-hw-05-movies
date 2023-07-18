import Loader from 'components/Loader/Loader';
import MoviesList from 'components/MoviesList/MoviesList';
import SearchForm from 'components/SearchForm/SearchForm';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Api from 'services/Api';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerms = searchParams.get('query');
  // console.log('searchTerme:', searchTerms);

  const [movieDataBySearch, setMovieDataBySearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!searchTerms) return;
    const fetchQuery = async () => {
      try {
        setIsLoading(true);
        const api = new Api();
        const responceFetchQuery = await api.fetchOnSearchParams(searchTerms);
        // console.log(responceFetchQuery);
        if (responceFetchQuery.length === 0) {
          alert('There are no movies on youe query');
        }
        setMovieDataBySearch(responceFetchQuery);
      } catch (newError) {
        setError(newError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuery();
  }, [searchTerms]);

  const handleSubmit = e => {
    e.preventDefault();

    const enteredQuery = e.target.children.search.value.trim();
    // console.log(enteredQuery);
    setSearchParams({ query: enteredQuery });
  };

  return (
    <div>
      <SearchForm handleSubmit={handleSubmit} searchQuery={searchTerms} />
      {error && <p>{error.message}</p>}
      {isLoading && <Loader />}
      {movieDataBySearch?.length !== 0 && (
        <MoviesList responceOnFetch={movieDataBySearch} />
      )}
    </div>
  );
};

export default Search;

//варіант без useSearchParams, витягаєм значення інпуту через onChangeInput

// const Search = () => {
//   const [searchQuery, setSearchQuery] = useState();
//   const [movieDataBySearch, setMovieDataBySearch] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const navigate = useNavigate();

//   const onChandgeInput = e => {
//     const enteredQuery = e.target.value.trim();
//     setSearchQuery(enteredQuery);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     // console.log('натиснули пошук');
//     setIsLoading(true);
//     const fetchQuery = async () => {
//       try {
//         const api = new Api();
//         const responceFetchQuery = await api.fetchOnSearchParams(searchQuery);
//         console.log(responceFetchQuery)
//         if (responceFetchQuery.length === []) {alert("There are no movies on youe query")};
//         setMovieDataBySearch(responceFetchQuery);
//         navigate(`/movies?query=${searchQuery}`);
//       } catch (newError) {
//         setError(newError);
//       }
//     };

//     searchQuery ? fetchQuery() : alert('Enter your query');
//   };

//   return (
//     <div>
//       <SearchForm onChandgeInput={onChandgeInput} handleSubmit={handleSubmit} />
//       {error && <p>{error.message}</p>}
//       {movieDataBySearch?.length !== 0 && (
//         <MoviesList responceOnFetch={movieDataBySearch} />
//       ) }
//     </div>
//   );
// };

// export default Search;
