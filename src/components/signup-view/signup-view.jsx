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
      <Form onSubmit={handleSubmit}>
        <h2>Sign up:</h2>
        <Form.Group controlId='formUsername'>
          <Form.Label className='mt-3'>Username:</Form.Label>
          <Form.Control
            type='text'
            autoComplete='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength='5'
          />
        </Form.Group>
  
        <Form.Group controlId='formPassword'>
          <Form.Label className='mt-3'>Password:</Form.Label>
          <Form.Control
            type='password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength='8'
          />
        </Form.Group>
  
        <Form.Group controlId='formEmail'>
          <Form.Label className='mt-3'>Email:</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group controlId='formBirthday'>
          <Form.Label className='mt-3'>Date of Birth:</Form.Label>
          <Form.Control
            type='date'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-2" type="submit">Submit</Button>
      </Form>
      );

  };