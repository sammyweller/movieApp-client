import React from "react";
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



