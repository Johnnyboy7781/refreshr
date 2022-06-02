import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;

    > * {
        margin: 5px;
    }
`

function CartItem ({ drink }) {
    return (
        <ItemContainer>
            <h3>{drink.name}</h3>
            <h4>${drink.price}</h4>
        </ItemContainer>
    )
}

export default CartItem;