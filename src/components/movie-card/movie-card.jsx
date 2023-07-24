import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, setUser }) => {
  // Set a default value for the 'user' prop to an empty object
  const currentUser = user || {};

  const isFavorite = currentUser.favoriteMovies && currentUser.favoriteMovies.includes(movie.id);

  // Remove movie from favorites
  const handleRemoveFromFavorite = () => {
    if (currentUser && currentUser.favoriteMovies.includes(movie.id)) {
      fetch(`https://sw-myflix-app-baa5e3f40824.herokuapp.com/users/${currentUser.username}/movies/${movie.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log("Error removing movie from favorites:", error);
        });
    }
  };

  // Add movie to favorites:
  const handleAddToFavorite = () => {
    if (currentUser && !currentUser.favoriteMovies.includes(movie.id)) {
      fetch(`https://sw-myflix-app-baa5e3f40824.herokuapp.com/users/${currentUser.username}/movies/${movie.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log("Error adding movie to favorites:", error);
        });
    }
  };

  return (
    <Card className="h-100 movie-card" style={{ border: "0px solid rgba(0, 0, 0, 0)", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
      <div className="card-img-container">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img className="card-img" variant="top" src={movie.imagePath} />
        </Link>
        {user && (
          <div className="heart-icon" onClick={isFavorite ? handleRemoveFromFavorite : handleAddToFavorite}>
            {isFavorite ? <span>&#9829;</span> : <span>&#9825;</span>}
          </div>
        )}
      </div>
      <Card.Body className="card-body">
        <Card.Title className="movie-title" style={{ color: "white" }}>
          {movie.title}
        </Card.Title>
        <Card.Text className="director">Director: {movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button
            className="card-button"
            style={{
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
            }}
          >
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// Define the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};