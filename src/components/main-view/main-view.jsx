import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"


export const MainView = () => {
    const [movies, setMovies] = useState([]);


    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://sw-myflix-app-baa5e3f40824.herokuapp.com/movies")
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
      }, []);

    //https://sw-myflix-app-baa5e3f40824.herokuapp.com/movies


    if (selectedMovie) {
        return (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
      } //sets selectedMovie back to its initial state value when back button is clicked

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
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