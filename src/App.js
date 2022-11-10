import request from './api/request';
import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';

function App() {
  return (
    <div className="app">
      <Nav/>
      <Banner/>
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
  );
}

export default App;
