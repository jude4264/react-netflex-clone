import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './SearchPage.css'

const SearchPage = () => {

    // console.log("useLocation()", useLocation());

    const [searchResults, setsearchResults] = useState([])
    
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery()
    const searchTerm = query.get("p")


    useEffect(() => {

        if(searchTerm){
            fetchDearchMovie(searchTerm);
        }
 
    }, [searchTerm])

    const fetchDearchMovie = async (searchTerm) => {

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
                        <div className='movie'>
                            <div className='movie__column-poster'>
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
                    찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다. 
                </p>

                </div>
            </section>
        )
    }

  return renderSearchResults()
}

export default SearchPage