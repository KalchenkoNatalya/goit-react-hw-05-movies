import axios from 'axios';

class Api {
  #API_KEY = '57ca3cbf384960d64107a3c5d70155b8';
  // #TRENDING_URL = 'https://api.themoviedb.org/3/trending/all/week';
  #TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  // #MOVIE_DETAILS='https://api.themoviedb.org/3/movie/movie_id'
  #MOVIE_DETAILS = 'https://api.themoviedb.org/3/movie/';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2NhM2NiZjM4NDk2MGQ2NDEwN2EzYzVkNzAxNTViOCIsInN1YiI6IjY0N2E3OTYyY2FlZjJkMDBkZjg4MGNhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FyD_Xuprwhf78eJyu1Ew5c52DJhC0pkIeyoylTof04',
    },
  };

  async fetchTrendingMovies() {
    const { data } = await axios.get(
      `${this.#TRENDING_URL}?page=1&api_key=${this.#API_KEY}`
    );
    return data.results;
  }

  async movieDetails(movieId) {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      this.options
    );
    return data;
  }

  async fetchCast(movieId) {
    const responceCast = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      this.options
    );
    return responceCast.data.cast;
  }

  async fetchReviews(movieId) {
    const responceReviews = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, this.options);

    return responceReviews.data.results;
   
  }

  async fetchOnSearchParams(searchQuery) {
    const responsSearchQuery = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`, this.options);
      // console.log(responsSearchQuery.data.results)
    return responsSearchQuery.data.results;
  }
}
export default Api;
