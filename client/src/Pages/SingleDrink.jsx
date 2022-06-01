import { React, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Navbar from "../components/Navbar/Navbar";

import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_DRINK } from "../utils/queries";
import { ADD_FAVORITE, ADD_TO_CART } from "../utils/mutations";
import Auth from "../utils/auth";

const Container = styled.div`
  background: url("https://img.freepik.com/free-photo/aluminum-cans-soda-background_128406-587.jpg?w=1380")
    center;
  background-size: cover;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
  border: solid 5px teal;
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  width: 25%;
  height: auto;
  background-color: white;
  border: solid 5px teal;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 0 10px;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const SingleDrink = () => {
  const { drinkId } = useParams();
  const [addToCart] = useMutation(ADD_TO_CART);
  const [addToFav] = useMutation(ADD_FAVORITE);

  const { loading, data } = useQuery(QUERY_DRINK, {
    variables: {
      id: drinkId,
    },
  });

  const drink = data?.drink || {};

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleFormSubmit = type => {
    if (!Auth.loggedIn()) {
      alert(`You must be logged in to add to ${type}!`);
    }

    const { data } = Auth.getProfile();

    try {
      if (type === "cart") {
        addToCart({
          variables: { userId: data._id, drinkId: drink._id }
        })
      } else {
        addToFav({
          variables: { userId: data._id, drinkId: drink._id }
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={require(`../assets/${drink.image}.png`)} alt="A drink" />
        </ImgContainer>
        <InfoContainer>
          <Title>{drink.name}</Title>
          <Desc>{drink.description}</Desc>
          <Price>$ {drink.price}</Price>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={() => handleFormSubmit("cart")}>ADD TO CART</Button>
            <Button onClick={() => handleFormSubmit("favorite")}>ADD TO FAVORITES</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default SingleDrink;
