import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer';
import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { useState } from "react";
import Auth from "../utils/auth";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:
    url("https://img.freepik.com/free-photo/aluminum-cans-soda-background_128406-587.jpg?w=1380")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  max-width: 1000px;
  padding: 20px;
  background-color: white;
  opacity: 90%;
  border: solid 5px teal;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-weight: bold
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [formState, setFormState] = useState({ username: "", email: "", password: ""});
  const [match, setMatch] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      }
    });
    console.log(mutationResponse);
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const checkDupe = (e) => {
    const { value } = e.target;
    setMatch(value === formState.password);
  }

  return (
    <>
    <Navbar />
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleFormSubmit} >
          <Input placeholder="USERNAME" name="username" onChange={handleChange} />
          <Input placeholder="EMAIL" name="email" onChange={handleChange} />
          <Input type="password" placeholder="PASSWORD" name="password" onChange={handleChange} />
          <Input type="password" placeholder="CONFIRM PASSWORD" onChange={checkDupe} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
    <Footer />
    </>
  );
};

export default Register;