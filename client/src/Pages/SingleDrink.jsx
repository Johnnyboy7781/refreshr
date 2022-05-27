import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_DRINK } from "../utils/queries";

const SingleDrink = () => {
    const { drinkId } = useParams();

    const { loading, data, error } = useQuery(QUERY_DRINK, {
        variables: {
            id: drinkId
        }
    });

    console.log(loading);
    console.log(data);
    console.log(error);

    const drink = data?.drink || {};

    console.log(drink);

    if(loading) {
        return <div>Loading...</div>;
    }
    return (
        <section className="drink-page">
            <h3>{drink.name}</h3>
            <h4>${drink.price}</h4>
            <img 
                src={require(`../assets/${drink.image}.png`)}
                alt="A drink"
            />
            <p>{drink.description}</p>
        </section>
    );
};

export default SingleDrink;