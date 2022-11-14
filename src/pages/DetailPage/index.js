import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function DetailPage() {

  const { movieId } = useParams();
  const [movie, setMovie] = useState({})
  console.log("movieId", movieId);

  
  useEffect(() => {
    async function fetchData(){
      const req = await axios.get(
        `/movie/${movieId}`
      )
      console.log("req", req);
      setMovie(req.data)
    }
    fetchData();
  }, [movieId]);
  
  if(!movie) return <div>...loading</div>;

  return (
    <section>
      <img 
      className='modal__poster-img'
        src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}

export default DetailPage