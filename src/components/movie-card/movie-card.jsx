// Import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";


export const MovieCard = ({ movie, onMovieClick }) => {

  return (
    <Card className="h-100" style={{ border: "0px solid rgba(0, 0, 0, 0)", backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body >
        <Card.Title class="movieTitle">{movie.title}</Card.Title>
        <Card.Text class="director">Director: {movie.director.name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)}  >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

  // Define the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};