import React from "react";
import PropTypes from 'prop-types';
import "./movie-view.scss";
import Button from "react-bootstrap/Button";



export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.imagePath} />
        </div>
        <div className="movie-details">
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
        <div className="button-movie">
        <Button onClick={onBackClick}>Back</Button>
        </div>
      </div>
    );
  };


  MovieView.propTypes = {
    movie: PropTypes.shape({
      imagePath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      description: PropTypes.string.isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };