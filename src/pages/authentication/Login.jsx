import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Input,
  Title,
  Button,
  Form,
  Text,
  Error,
} from "./AuthenticationStyled";

const Login = () => {
  const [error, setError] = useState("");

  const { login, currentUser } = useAuth();
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  function loginUser(e) {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    if (email && password) {
      login(data.email, data.password)
        .then((data) => {
          if (data.user) {
            navigate("/main");
          }
        })
        .catch((err) => {
          if (err) {
            setError("Make sure you wrote your login and password right!!");
          }
        });
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/main");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <Card>
        <Form onSubmit={loginUser}>
          <Title>Login</Title>
          {error && <Error>{error}</Error>}
          <Input type="text" ref={email} placeholder="Email" />
          <Input type="password" ref={password} placeholder="Password" />
          <Text>
            Don't have an account yet?{" "}
            <Link style={{ color: "#717b91" }} to="/register">
              Register
            </Link>
          </Text>
          <Button>Submit</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
