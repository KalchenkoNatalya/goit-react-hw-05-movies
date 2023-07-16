
const Cast = ({cast}) => {
//   const [cast, setCast] = useState();
//   const [error, setError] = useState();
//   const { movieId } = useParams();
//   console.log(movieId);
//   useEffect(() => {
//     if (!movieId) return;

//     const fetchCastInformation = async () => {
//       try {
//         const api = new Api();
//         const castInformation = await api.fetchCast(movieId);
//         setCast(castInformation)
//         console.log(castInformation);
//       } catch (newError) {
//         setError(newError);
//       }
//     };

//     fetchCastInformation();
//   }, [movieId]);
const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700'

  return (
   <div>
    {cast.map(({id, name, character, profile_path}) => (<li key={id}><p>{name}</p><p>{character}</p><img src={
 profile_path ? `https://image.tmdb.org/t/p/w500/$%7BmovieData.${profile_path}%7D`
 : defaultImg
}
width={250}
alt="poster"
/></li>))}
   </div>
  );
};

export default Cast;
