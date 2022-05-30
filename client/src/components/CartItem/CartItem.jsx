import React from "react";

function CartItem ({ drink }) {
    return (
        <>
            <img src={require(`../../assets/${drink.image}.png`)} alt={drink.name} />
            <h3>{drink.name}</h3>
            <h4>${drink.price}</h4>
        </>
    )
}

export default CartItem;