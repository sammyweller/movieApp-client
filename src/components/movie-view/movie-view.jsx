import React from "react";
//import PropTypes from 'prop-types';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";



export const MovieView = ({ movies }) => {
  const { movieId } = useParams();



  const movie = movies.find((m) => m.id === movieId);



    return (
      <div>
        <div>
          <img src={movie.imagePath} />
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
\
      </Link>
      </div>
    );
  };



/*
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
    //onBackClick: PropTypes.func.isRequired
  };

*/