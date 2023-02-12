import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateData, createAccount } from "../../server/authentication";
import { useAuth } from "../../context/AuthContext";

import {
  Card,
  Input,
  Title,
  Button,
  Form,
  Text,
  Error,
  Select,
} from "./AuthenticationStyled";

const Register = () => {
  const navigate = useNavigate();

  // States
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");

  // References
  const firstName = useRef(null);
  const lastName = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const confirmEmail = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const birthday = useRef(null);
  const gender = useRef(null);

  async function createUser(e) {
    e.preventDefault();
    const data = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      username: username.current.value,
      email: email.current.value,
      confirmEmail: confirmEmail.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value,
      birthday: birthday.current.value,
      gender: gender.current.value,
    };
    const dataRecived = validateData(data, "register");
    if (!dataRecived.error) {
      setError("");
      await signup(dataRecived.data.email, dataRecived.data.password).then(
        (data) => {
          createAccount(dataRecived, data.uid);
        }
      );

      navigate("/login");
    } else {
      setError("Make sure that your data is given");
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/main");
    }
  }, [currentUser, navigate, error]);

  return (
    <div>
      {/* {error && <p>{error}</p>}
      <form onSubmit={createUser}>
        <input type="text" ref={firstName} placeholder="Firstname" />
        <input type="text" ref={lastName} placeholder="Lastname" />
        <input type="text" ref={username} placeholder="Username" />
        <input type="email" ref={email} placeholder="Email" />
        <input type="email" ref={confirmEmail} placeholder="Confirm Email" />
        <input type="password" ref={password} placeholder="Password" />
        <input
          type="password"
          ref={confirmPassword}
          placeholder="Confirm Password"
        />
        <input type="date" ref={birthday} placeholder="Birthday" />
        <select ref={gender}>
          <option value="m">Male</option>
          <option value="f">Female</option>
        </select>
        <button>Submit</button>
      </form>
      <p>
        You have an account yet? <Link to="/login">Login</Link>
      </p> */}
      <Card>
        <Form onSubmit={createUser}>
          <Title>Register</Title>
          {error && <Error>{error}</Error>}
          <Input type="text" ref={firstName} placeholder="Firstname" />
          <Input type="text" ref={lastName} placeholder="Lastname" />
          <Input type="text" ref={username} placeholder="Username" />
          <Input type="email" ref={email} placeholder="Email" />
          <Input type="email" ref={confirmEmail} placeholder="Confirm Email" />
          <Input type="password" ref={password} placeholder="Password" />
          <Input
            type="password"
            ref={confirmPassword}
            placeholder="Confirm Password"
          />
          <Input type="date" ref={birthday} placeholder="Birthday" />
          <Select ref={gender}>
            <option style={{ color: "black" }} value="m">
              Male
            </option>
            <option style={{ color: "black" }} value="f">
              Female
            </option>
          </Select>
          <Text>
            Don't have an account yet?{" "}
            <Link style={{ color: "#717b91" }} to="/login">
              Login
            </Link>
          </Text>
          <Button>Submit</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
