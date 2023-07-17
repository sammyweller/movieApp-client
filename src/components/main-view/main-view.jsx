import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://sw-myflix-app-baa5e3f40824.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            title: movie.title,
            imagePath: movie.imagePath,
            description: movie.description,
            genre: {
              name: movie.genre.name
            },
            director: {
              name: movie.director.name
            }
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);


  //https://sw-myflix-app-baa5e3f40824.herokuapp.com/movies


  return (
    <Row className="justify-content-md-center">
      {!user ? (
 
          <Col md={5}>
          <h2>Log in:</h2>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <SignupView />
          </Col>

      ) : selectedMovie ? (

        <Col md={8} >
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        </Col>

      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          <Col md={12} className="d-flex justify-content-end mb-3">
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
              }}
              size="sm"
            >
              Logout
            </Button>
          </Col>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};