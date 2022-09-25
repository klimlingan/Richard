import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const { auth, register } = useAuth();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContactNumber] = useState("");

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (first_name && last_name && password && email && contact_number) {
      register({
        first_name,
        last_name,
        password,
        email,
        contact_number,
      });
    } else {
      alert("Please fill out all fields");
    }
  }
  return (
    <>
      <Container
        style={{ width: "25rem" }}
        className="text-center mx-auto mt-5"
      >
        <h1 className="text-center">Register</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your First Name"
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Last Name"
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicContactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Contact Number"
              onChange={(event) => setContactNumber(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Text className="text-muted">
            Already registered? Please login <a href="/login">here</a>
          </Form.Text>

          <br></br>
          <br></br>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
