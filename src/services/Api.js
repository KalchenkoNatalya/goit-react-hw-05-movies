import axios from "axios";




class Api {
    #API_KEY = '57ca3cbf384960d64107a3c5d70155b8';
    // #TRENDING_URL = 'https://api.themoviedb.org/3/trending/all/week';
    #TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';
    #MOVIE_DETAILS='https://api.themoviedb.org/3/movie/movie_id'

async fetchTrendingMovies()  {
    const {data} = await axios.get(`${this.#TRENDING_URL}?page=1&api_key=${this.#API_KEY}`);
    return data.results
}

async movieDetails(id) {
    const {data} = await axios.get(`${this.#MOVIE_DETAILS}&api_key=${this.#API_KEY}`);
     return data
}
}
export default Api