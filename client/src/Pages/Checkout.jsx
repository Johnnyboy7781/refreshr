import React from "react";
import CartItem from "../components/CartItem/CartItem";

import { useQuery } from "@apollo/client";

import { QUERY_CART, QUERY_USER } from "../utils/queries";

const Checkout = () => {
    const { loading, data } = useQuery(QUERY_CART);
    let cart = {};
    console.log(data);

    if(loading) {
        return <p>Loading...</p>;
    }
    else {
        cart = data.cart;
        return (
            <section>
                {cart.map((drink) => (
                    <CartItem drink={drink} key={drink.name} />
                ))}
            </section>
        );
    }

    
}

export default Checkout;