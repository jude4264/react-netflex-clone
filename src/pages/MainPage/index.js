import React from 'react'
import request from '../../api/request'
import Banner from '../../components/Banner'
import Row from '../../components/Row'

function MainPage() {
    return (
        <div>
            <Banner />
            <Row
                title="NETFLIX ORIGINALS"
                id="id"
                fetchUrl={request.fetchNetflixOriginals}
                isLargeRow
            />
            <Row
                title="Trending Now"
                id="TN"
                fetchUrl={request.fetchTrending}
            />
            <Row
                title="Top Rated"
                id="TR"
                fetchUrl={request.fetchTopRated}
            />
            <Row
                title="Action Movies"
                id="AM"
                fetchUrl={request.fetchActionMovies}
            />
            <Row
                title="Comedy Movies"
                id="CM"
                fetchUrl={request.fetchComedyMovies}
            />
        </div>
    )
}
export default MainPage