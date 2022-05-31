import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom"

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
  width: 25%;
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
  flex-direction: column;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-weight: bold
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: #ffffff;
    cursor: not-allowed;
  }
`;

const Text = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #303030a6;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <>
    <Navbar />
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="USERNAME"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled>
            LOGIN
          </Button>
          <Text>FORGOT YOUR PASSWORD? (SOUNDS LIKE YOU NEED MORE ENERGY)</Text>
          <Link to="/register"><Text>CREATE A NEW ACCOUNT (AND GET WITH THE PROGRAM)</Text></Link>
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default Login;
