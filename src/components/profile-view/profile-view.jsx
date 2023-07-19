import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "./profile-view.scss"



export const ProfileView = ({ user, movies, token, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const favoriteMovies = movies.filter((m) => user.favoriteMovies.includes(m.id));


  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth);
    }
  }, [user]);


  const handleUpdateUser = (event) => {
    event.preventDefault();

    // Create an updatedUser object with new values
    const updatedUser = {
      username,
      password,
      email,
      dateOfBirth
    };

    // Make an API request to update the user's information
    fetch(`https://sw-myflix-app-baa5e3f40824.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedUser)
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage("User updated successfully");
      })
      .catch((error) => {
        console.log("Error updating user data:", error);
      });
  };


  const handleDeleteUser = () => {
    // Make an API request to delete the user's account
    fetch(`https://sw-myflix-app-baa5e3f40824.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((response) => {
      if (response.ok) {
          onLogout();
      } else {
          alert("something went wrong.")
      }
  })
}

  return (
    <div className="center-container">
      <h2>User Information</h2>
      <Form onSubmit={handleUpdateUser}>
        <Form.Group controlId="formUsername" style={{ width: "300px" }}>
          <Form.Label >Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" style={{ width: "300px" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" style={{ width: "300px" }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateOfBirth" style={{ width: "300px" }}>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
      {successMessage && <p>{successMessage}</p>}


      <Button variant="danger" onClick={handleDeleteUser}>
        Delete Account
      </Button>


      <h2>{username}'s Favorite Movies:</h2>
      
      {favoriteMovies.length > 0 ? (
        <div className="movie-list" style={{ display: "flex", gap: "20px" }}>
          {favoriteMovies.map((movie) => (
            <Col md={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </div>
      ) : (
        <p>No favorite movies available.</p>
      )}


    </div>
  );
};