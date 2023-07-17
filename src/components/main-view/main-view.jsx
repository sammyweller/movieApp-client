import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


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


  //When no one is logged in, LoginView is displayed:
  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }


  if (selectedMovie) {
    return (
      <>
      <button onClick={() => { setUser(null);  setToken(null); localStorage.clear(); }}>Logout</button> 
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  } //sets selectedMovie back to its initial state value when back button is clicked



  if (movies.length === 0) {
    return (
      <>
      <button onClick={() => { setUser(null);  setToken(null); localStorage.clear(); }}>Logout</button> 
      <div>The list is empty!</div>
      </>
    );
  }
    

  
  return (
    <div>
      <button onClick={() => { setUser(null);  setToken(null); localStorage.clear(); }}>Logout</button> 
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};