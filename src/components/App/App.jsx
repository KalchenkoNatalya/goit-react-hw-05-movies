import { Suspense, lazy } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import css from './App.module.css';
import Loader from '../Loader/Loader';
const Home = lazy(() => import('pages/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Search = lazy(() => import('pages/Search'));

// const StyledLink = styled(NavLink)`
//   color: black;
//   &.active {
//     color: orange;
//   }
// `;

const App = () => {
  return (
    <div>
      <header className={css.header}>
        <nav>
          <ul className={css.nav_list}>
            <li>
              <NavLink to="/" className={css.nav_link}>
                Home
              </NavLink>
            </li>
            <li>
              {' '}
              <NavLink to="/movies" className={css.nav_link}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movies" element={<Search />}></Route>
            <Route path="/movies/:movieId/*" element={<MovieDetails />}></Route>
  
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </Suspense>
        </section>
      </main>
      
    </div>
  );
};

export default App;
