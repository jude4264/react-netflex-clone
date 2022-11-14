import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css"
import MovieModal from './MovieModal/MovieModal';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
            {/* <div className='slider'>
                <div className='slider__arrow-left'>
                    <span className="arrow"
                    onClick={()=>{
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                    }}
                    >{"<"}</span>
                </div> */}
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                // spaceBetween={50}
                // slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                breakpoints={{
                    1378:{
                        slidesPerView: 6,
                        slidesPerGroup: 6
                    },
                    998:{
                        slidesPerView: 5,
                        slidesPerGroup: 5
                    },
                    625:{
                        slidesPerView: 4,
                        slidesPerGroup: 4
                    },
                    0:{
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    },
                }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
            >
                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <SwiperSlide>
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path
                                    } `}
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
                {/* <div className='slider__arrow-right'>
                    <span 
                        className="arrow"
                        onClick={() => {
                          document.getElementById(id).scrollLeft += window.innerWidth - 80;
                        }}>
                        {">"}
                    </span>
                </div>
            </div> */}
                        {modalOpen && (
                            <MovieModal {...movieSelected} setmodalOpen={setmodalOpen}/>
                        )}
        </section>
    )
}

export default Row