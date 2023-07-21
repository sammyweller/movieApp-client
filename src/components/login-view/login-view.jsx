import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-view.scss"


export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();


    const data = {
        username: username,
        password: password
      };
  
      fetch("https://sw-myflix-app-baa5e3f40824.herokuapp.com/login?", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Login response: ", data);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("No such user");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });

  };

  return (
    <Form onSubmit={handleSubmit} style={{ color: "white", fontFamily: "'Quicksand', sans-serif"}}>
      <h2 style={{ marginBottom: "20px" }}>Log in:</h2>
      <Form.Group controlId="formUsername">
        <Form.Label style={{ color: "white"}} >Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
          style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px"}}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label style={{ color: "white"}} >Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", marginBottom: "20px" }}
        />
      </Form.Group>
      <Button style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px" }} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};