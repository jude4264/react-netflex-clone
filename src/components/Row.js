import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css"
import MovieModal from './MovieModal/MovieModal';

const Row = ({
    title,
    id,
    fetchUrl,
    isLargeRow
}) => {
    
    const [movies, setMovies] = useState([])
    const [modalOpen, setmodalOpen] = useState(false)
    const [movieSelected, setmovieSelected] = useState({})


    useEffect(() => {
      fetchMovieData();
    }, [])

    const fetchMovieData = async () =>{

        const req = await axios.get(fetchUrl);
        // console.log(fetchUrl);
        // console.log(req);
        setMovies(req.data.results)

    }

    const handleClick=(movie)=>{
        setmodalOpen(true)
        setmovieSelected(movie)
    }

    return (
        <section className='row'>
            <h2>{title}</h2>
            <div className='slider'>
                <div className='slider__arrow-left'>
                    <span className="arrow"
                    onClick={()=>{
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        /*document.getElementById(id).scrollLeft -= window.innerWidth-80;*/
                    }}
                    >{"<"}</span>
                </div>
                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path
                                } `}
                            alt={movie.name}
                            onClick={()=>handleClick(movie)}
                        />
                    ))}
                </div>
                <div className='slider__arrow-right'>
                    <span 
                        className="arrow"
                        onClick={() => {
                          document.getElementById(id).scrollLeft += window.innerWidth - 80;
                        }}>
                        {">"}
                    </span>
                </div>
            </div>
                        {modalOpen && (
                            <MovieModal {...movieSelected} setmodalOpen={setmodalOpen}/>
                        )}
        </section>
    )
}

export default Row