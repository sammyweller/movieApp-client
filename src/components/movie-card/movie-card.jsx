// Import the PropTypes library
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";


export const MovieCard = ({ movie }) => {

  return (
    <Card className="h-100" style={{ border: "0px solid rgba(0, 0, 0, 0)", backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body className="card-body">
        <Card.Title className="movie-title">{movie.title}</Card.Title>
        <Card.Text className="director">Director: {movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
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
  //onMovieClick: PropTypes.func.isRequired
};