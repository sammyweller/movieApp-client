import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";


export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(
    user && user.favoriteMovies.includes(movieId)
  );

  const movie = movies.find((m) => m.id === movieId);


  // Remove movie from favorites
  const handleRemoveFromFavorite = () => {

    if (user && user.favoriteMovies.includes(movieId)) {
      fetch(`https://sw-myflix-app-baa5e3f40824.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
        }).then((data) => {
          setIsFavorite(false);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        })
        .catch((error) => {
          console.log("Error removing movie from favorites:", error);
        });
    }
  };


  // Add movie to favorites:
  const handleAddToFavorite = () => {
    if (user && !user.favoriteMovies.includes(movieId)) {
      fetch(`https://sw-myflix-app-baa5e3f40824.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => {
          if (response.ok) {
            return response.json()
          }
        }).then((data) => {
          setIsFavorite(true);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        })
    }
  };

  return (
    <div>
      <div>
        <img src={movie.imagePath} alt="Image of movie" />
      </div>
      <div className="movie-details" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        <div className="movieViewTitle">
          <span>{movie.title}</span>
        </div>
        <div className="movieViewDescription">
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div className="movieViewGenre">
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div className="movieViewDirector">
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </div>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>

      {isFavorite && user && (
        <button className="remove-favorite-button" onClick={handleRemoveFromFavorite}>
          Remove from Favorites
        </button>
      )}
      {!isFavorite && user && (
        <button className="add-favorite-button" onClick={handleAddToFavorite}>
          Add to Favorites
        </button>
      )}
    </div>
  );
};



