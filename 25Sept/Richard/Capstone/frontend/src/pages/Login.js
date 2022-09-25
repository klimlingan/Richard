import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { auth, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (email && password) {
      login({ email, password });
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
        <h1 className="text-center">Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <Form.Text className="text-muted">
            Not registered yet? Please register <a href="/register">here</a>
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

export default Login;
