import Home from 'pages/Home';
import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MovieDetails from './MovieDetails/MovieDetails';

const StyledLink = styled(NavLink)`
  color: black;
  &.active {
    color: orange;
  }
`;

const App = () => {
  return (
    <div>
      <nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
       
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
     
        <Route
          path="/movies"
          element={<div>Page of search movies</div>}
        ></Route>
        <Route
          path="/movies/:id"
          element={<MovieDetails/>}
        ></Route>
         
       
      </Routes>
    </div>
  );
};

export default App;
