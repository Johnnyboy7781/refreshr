import React from "react";
import styled from "styled-components";

import CartItem from "../components/CartItem/CartItem";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


import { useQuery } from "@apollo/client";

import { QUERY_CART, QUERY_USER } from "../utils/queries";

const Container = styled.div`
  background: url("https://img.freepik.com/free-photo/aluminum-cans-soda-background_128406-587.jpg?w=1380")
    center;
  background-size: cover;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const Main = styled.div`
display: flex;
justify-content: space-between;
`;

const Cart = styled.div`
flex: 3;
`;

const Image = styled.img`
  width: 200px;
`;

const Drinks = styled.div`
display: flex;
justify-content: space-between;
`;

const Drink = styled.div`
flex: 2;
display: flex;
`;

const DrinkDetails = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const Prices = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const SimpleText = styled.span``;

const Order = styled.div`
  flex: 1;
  border: 0.5px solid black;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const OrderTitle = styled.h1`
  font-weight: 200;
`;

const OrderDetails = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
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

const Checkout = () => {
    const { loading, data } = useQuery(QUERY_CART);
    let cart = {};
    console.log(data);

    const drink = data?.drink || {};

    if (loading) {
        return <p>Loading...</p>;
    }
    else {
        cart = data.cart;
        return (
            <Container>
                <Navbar />
                <Wrapper>
                    <Title>YOUR CART</Title>
                    <Main>
                        <Cart>
                            {cart.drink.map((drink) => (
                                <Drinks>
                                    <Drink>
                                        <Image src={require(`../assets/${drink.image}.png`)} />
                                        <DrinkDetails>
                                            <SimpleText>
                                                <b>Drink:</b> {drink.name}
                                            </SimpleText>
                                        </DrinkDetails>
                                    </Drink>
                                    <Prices>
                                        <SimpleText>
                                            $ {drink.price * drink.quantity}
                                        </SimpleText>
                                    </Prices>
                                </Drinks>
                            ))}
                        </Cart>
                        <Order>
                            <OrderTitle>ORDER SUMMARY</OrderTitle>
                            <OrderDetails>
                                <SimpleText>Subtotal</SimpleText>
                                <SimpleText>$ {cart.total}</SimpleText>
                            </OrderDetails>
                            <OrderDetails>
                                <SimpleText>Total</SimpleText>
                                <SimpleText>$ {cart.total}</SimpleText>
                            </OrderDetails>
                            <Button>CHECKOUT NOW</Button>
                        </Order>
                    </Main>
                </Wrapper>
                <Footer />
            </Container>
        );
    };
}

    


export default Checkout;