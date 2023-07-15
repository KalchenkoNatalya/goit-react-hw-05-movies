import TrendingMoviesList from 'components/TrandingMoviesList/TrandingMoviesList';
import React, { useEffect } from 'react'
import { useState } from 'react'
import Api from 'services/Api';


const Home = () => {
  const [error, setError] = useState();
 
  const [trendingArray, setTrendingArray] = useState([])
    useEffect(() => {
      const fetchTrending = async() => {
        try {
          const api = new Api();
          const responceTrending = await api.fetchTrendingMovies();
          setTrendingArray(responceTrending)
          // console.log(trendingMovies)
          console.log(responceTrending)
          
      
        } catch (newError) {
          setError(newError)
          
        }
      }
      fetchTrending()
    }, [])
  const onClick  = () => {
    console.log("вибрали фільм")
  }
  return (
     
    <div>
       {error ? (<p>{error.message}</p>) : (<p>"є відповідь"</p> )}
       <TrendingMoviesList responceTrending={trendingArray} onClick={onClick}/>
    </div>
  )
}

export default Home
