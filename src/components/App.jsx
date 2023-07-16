import Home from 'pages/Home';
import MovieDetails from 'pages/MovieDetails';
import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';


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
          path="/movies/:movieId/*"
          element={<MovieDetails/>}
        ></Route>
         <Route
          path="*"
          element={<Home/>}
        ></Route>
       
      </Routes>
    </div>
  );
};

export default App;
