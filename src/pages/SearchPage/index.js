/* eslint-disable array-callback-return */
import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce';

const SearchPage = () => {

    // console.log("useLocation()", useLocation());

    const navigate = useNavigate();

    const [searchResults, setsearchResults] = useState([])
    
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery()
    const searchTerm = query.get("p")

    const debounceValueSearchTerm = useDebounce(searchTerm, 500);


    useEffect(() => {

        if(debounceValueSearchTerm){
            fetchDearchMovie(debounceValueSearchTerm);
        }
 
    }, [debounceValueSearchTerm])

    const fetchDearchMovie = async (searchTerm) => {

        console.log("searchTerm" , searchTerm);

        try {
            const req = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            )

            console.log(req);
            setsearchResults(req.data.results)
        } catch (error) {
            console.log("error" , error);
        }

    }

    const renderSearchResults = () =>{
        return searchResults.length > 0 ? (
            <section className='search-container'>
            {searchResults.map((movie)=>{
                if(movie.backdrop_path !== null && movie.media_type !== "person"){
                    const movieImageUrl = 
                    "http://image.tmdb.org/t/p/w500"+ movie.backdrop_path
                    return(
                        <div className='movie' key={movie.id}>
                            <div 
                            className='movie__column-poster'
                            onClick={()=>navigate(`/${movie.id}`)}>
                            <img
                                src = {movieImageUrl}
                                alt="movie"
                                className='movie__poster'
                            />

                            </div>
                        </div>
                    )
                }
            })}

            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                <p>
                    찾고자하는 검색어 "{debounceValueSearchTerm}"에 맞는 영화가 없습니다. 
                </p>

                </div>
            </section>
        )
    }

  return renderSearchResults()
}

export default SearchPage