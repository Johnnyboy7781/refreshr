import React from "react";
import CartItem from "../components/CartItem/CartItem";

import { useQuery } from "@apollo/client";

import { QUERY_CART, QUERY_USER } from "../utils/queries";

const Checkout = () => {
    const { data } = useQuery(QUERY_USER);
    let user = {};

    if(data) {
        user = data.user;
    }
    else {
        user._id = null;
    }

    const { cart_data } = useQuery(QUERY_CART, {
        variables: {
            id: user._id
        }
    });
    let cart = {};

    if(cart_data) {
        cart = cart_data.cart;
    }
    else {
        return <p>Loading...</p>;
    }

    return (
        <section>
            {cart.map((drink) => (
                <CartItem drink={drink} key={drink.name} />
            ))}
        </section>
    );
}

export default Checkout;