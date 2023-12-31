import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");


    const handleSubmit = (event) => {
    
    event.preventDefault();

    const data = {
        username: username,
        password: password,
        email: email,
        dateOfBirth: dateOfBirth
      };
  
      fetch("https://sw-myflix-app-baa5e3f40824.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert("Signup failed");
        }
      });
    };

    return (
      <Form style={{ color: "white", fontFamily: "'Quicksand', sans-serif"}} onSubmit={handleSubmit}>
        <h2>Sign up:</h2>
        <Form.Group controlId='formUsername'>
          <Form.Label style={{ color: "white"}} className='mt-3'>Username:</Form.Label>
          <Form.Control
            type='text'
            autoComplete='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength='5'
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px" }}
          />
        </Form.Group>
  
        <Form.Group controlId='formPassword'>
          <Form.Label style={{ color: "white"}} className='mt-3'>Password:</Form.Label>
          <Form.Control
            type='password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength='8'
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px" }}
          />
        </Form.Group>
  
        <Form.Group controlId='formEmail'>
          <Form.Label style={{ color: "white"}} className='mt-3'>Email:</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px" }}
          />
        </Form.Group>
  
        <Form.Group controlId='formBirthday'>
          <Form.Label style={{ color: "white"}} className='mt-3'>Date of Birth:</Form.Label>
          <Form.Control
            type='date'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px", marginBottom: "20px" }}
          />
        </Form.Group>
        <Button style={{color: "white",  backgroundColor: "rgba(0, 0, 0, 0)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "20px",  marginBottom: "40px" }}  className="mt-2" type="submit">Submit</Button>
      </Form>
      );

  };