import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Loading from "./Loading";

const OMDB_Url = "http://www.omdbapi.com/";
const OMDB_Api_Key = "ffd203f9";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  getFilm = async (movieTitle) => {
    const movieArr = localStorage.getItem(movieTitle);
    if (movieArr) {
      this.setState({ movies: JSON.parse(movieArr), isLoading: false });
      //console.log("Got movies from LocalStorage", movieArr);
    } else {
      const getFilmUrl = `${OMDB_Url}?s=${movieTitle}&apikey=${OMDB_Api_Key}`;
      try {
        const res = await fetch(getFilmUrl);

        if (!res.ok)
          throw new Error("ERROR: Couldn't retrieve your movies' data.");

        const data = await res.json();
        const moviesArr = data.Search.slice(0, 6);
        //console.log(moviesArr);

        this.setState({ movies: moviesArr });
        localStorage.setItem(movieTitle, JSON.stringify(moviesArr));

        console.log("state: ", this.state);
      } catch (err) {
        console.log("Error:", err);
        this.setState({ isLoading: false });
      }
    }
  };

  componentDidMount = () => {
    this.getFilm(this.props.searchMovie);
  };

  render() {
    return (
      <Container>
        <h2 className="text-white">{this.props.title}</h2>
        <Row>
          {this.state.isLoading && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          {this.state.movies.map((movie) => (
            <Col key={movie.imdbID} xs={12} sm={4} md={3} lg={2}>
              <Card className="movie-card">
                <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>Year of Release: {movie.Year}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Gallery;
