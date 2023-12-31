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
      console.log("User date of birth:", user.dateOfBirth);

      setUsername(user.username);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth);

      console.log("Date of birth state:", dateOfBirth);

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
    <div className="center-container"  >
      <h2 className="userinfo-title">@{username}'s user info:</h2>
      <Form onSubmit={handleUpdateUser} >
        <Form.Group controlId="formUsername" style={{ width: "300px", padding: "0 20px"}} >
          <Form.Label >Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px",  marginBottom: "10px"}}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" style={{ width: "300px", padding: "0 20px" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px",  marginBottom: "10px" }}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" style={{ width: "300px", padding: "0 20px" }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px",  marginBottom: "10px" }}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDateOfBirth" style={{ width: "300px", padding: "0 20px" }}>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px" }}
            required
          />
        </Form.Group>
        <Button type="submit"  className="update-button" style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", marginLeft: "20px" }}>Update</Button>
      </Form>
      {successMessage && <p>{successMessage}</p>}


      <Button variant="danger" className="delete-button" onClick={handleDeleteUser}>
        Delete Account
      </Button>


      <h2 className="favorite-movies-title">@{username}'s favorite movies:</h2>
      
      {favoriteMovies.length > 0 ? (
        <div className="movie-list" style={{ display: "flex", gap: "20px" }}>
          {favoriteMovies.map((movie) => (
            <Col md={3} key={movie.id}>
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