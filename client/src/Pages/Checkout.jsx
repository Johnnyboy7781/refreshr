import React, { useState } from "react";
import CartItem from "../components/CartItem/CartItem";
import { useQuery } from "@apollo/client";
import { CardElement } from "@stripe/react-stripe-js";

import { QUERY_CART, QUERY_USER } from "../utils/queries";
import styled from "styled-components";
import { useElements, useStripe } from "@stripe/react-stripe-js";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-itmes: center;
  margin: 20px 0;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const FormContainer = styled.form`
    margin: 20px 10px;
`;

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
  border-top: 1px solid #292c33;

  &:first-of-type {
    border-top: none;
  }
`;

const Label = styled.label`
  width: 20%;
  min-width: 70px;
  padding: 11px 0;
  color: #000000;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-right: 1px solid #819efc;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 11px 15px 11px 8px;
  color: #000000;
  background-color: transparent;
  animation: 1ms void-animation-out;

  &::placeholder {
    color: #909090;
  }
`;

const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${(props) => (props.disabled ? "#7795f8" : "#377e7f")};
  box-shadow: ${(props) =>
    props.disabled
      ? "none"
      : "0 6px 9px rgba(0, 0, 0, 0.7), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #377e7f;"};
  border-radius: 4px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
      opacity: 0.9;
  }
`;

const Checkout = () => {
  const { loading, data } = useQuery(QUERY_CART);
  const [isProcessing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  let cart = {};

  const handleFormSubmit = async event => {
    event.preventDefault();

    const billingDetails = {
        name: event.target.name.value,
        email: event.target.email.value,
        address: {
            city: event.target.city.value,
            line1: event.target.address.value,
            state: event.target.state.value,
        }
    }

    isProcessing(true);

    const cardEl = elements.getElement("card");

    try {
        const { data: clientSecret } = await fetch('/api/payment_intents', {
            method: 'POST'
        });

        console.log(clientSecret);
    } catch (err) {

    }
  }

  // Card input styles here
  const iframeStyles = {
    base: {
      color: "black",
    },
  };

  const cardElementOpts = {
    style: iframeStyles,
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    cart = data.cart;
    return (
      <section>
        {cart.map((drink) => (
          <CartItem drink={drink} key={drink.name} />
        ))}
        <FormContainer onSubmit={handleFormSubmit}>
          <FormFieldContainer>
            <Label htmlFor="name">Name</Label>
            <Input name="name" type="text" placeholder="Jane Doe" required />
          </FormFieldContainer>
          <FormFieldContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="text"
              placeholder="jane.doe@example.com"
              required
            />
          </FormFieldContainer>
          <FormFieldContainer>
            <Label htmlFor="address">Address</Label>
            <Input
              name="address"
              type="text"
              placeholder="185 Berry St. Suite 550"
              required
            />
          </FormFieldContainer>
          <FormFieldContainer>
            <Label htmlFor="city">City</Label>
            <Input
              name="city"
              type="text"
              placeholder="San Francisco"
              required
            />
          </FormFieldContainer>
          <FormFieldContainer>
            <Label htmlFor="state">State</Label>
            <Input name="state" type="text" placeholder="California" required />
          </FormFieldContainer>
          <CardElementContainer>
            <CardElement options={cardElementOpts} />
          </CardElementContainer>
          <SubmitButton disabled={false}>
              Pay $
          </SubmitButton>
        </FormContainer>
      </section>
    );
  }
};

export default Checkout;
