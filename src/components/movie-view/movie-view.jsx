import React, { useState } from "react";
import { useParams } from "react-router";
import Button from "react-bootstrap/Button";
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
    <div className="movie-deets">
      <div>
        <img src={movie.imagePath} alt="Image of movie" style={{ borderRadius: "20px" }} />
      </div>
      <div className="movie-details" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
        <div className="movieViewTitle" style={{ fontSize: "30px", marginBottom: "10px" }}>
          <span>{movie.title}</span>
        </div>
        <div className="movieViewDescription" style={{ marginBottom: "10px" }}>
          <strong>Description: </strong>
          <span>{movie.description}</span>
        </div>
        <div className="movieViewGenre">
          <strong>Genre: </strong>
          <span>{movie.genre.name}</span>
        </div>
        <div className="movieViewDirector">
          <strong>Director: </strong>
          <span>{movie.director.name}</span>
        </div>
      </div>
      <div className="movie-view-buttons">

      {isFavorite && user && (
        <div className="button-container">

          <Button className="remove-favorite-button"
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              marginTop: "20px"
            }}
            onClick={handleRemoveFromFavorite}>
            Remove from favorites
          </Button>
        </div>
      )}
      {!isFavorite && user && (
        <div className="button-container">

          <Button className="add-favorite-button"
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              marginTop: "20px"
            }}
            onClick={handleAddToFavorite}>
            Add to favorites
          </Button>
        </div>
      )}
      <Link to={`/`}>
        
        <div className="button-container">

          <Button className="back-button"
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              margin: "10px 0 60px 0"
            }}>Back</Button>
        </div>
      </Link>





      </div>
    </div>
  );
};



