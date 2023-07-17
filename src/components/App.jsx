// import Home from 'pages/Home';
// import MovieDetails from 'pages/MovieDetails';
// import Search from 'pages/Search';
import { Suspense, lazy } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Loader from './Loader/Loader';

const Home = lazy(() => import('pages/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Search = lazy(() => import('pages/Search'));

const StyledLink = styled(NavLink)`
  color: black;
  &.active {
    color: orange;
  }
`;

const App = () => {
  const location = useLocation();

  return (
    <div>
      <nav>
        <StyledLink state={{ from: location }} to="/">
          Home
        </StyledLink>
        <StyledLink state={{ from: location }} to="/movies">
          Movies
        </StyledLink>
      </nav>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies" element={<Search />}></Route>
          <Route path="/movies/:movieId/*" element={<MovieDetails />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
