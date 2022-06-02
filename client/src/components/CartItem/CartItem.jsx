import React from "react";
import styled from "styled-components";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { REMOVE_FROM_CART } from "../../utils/mutations";
import Auth from '../../utils/auth';

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;

    > * {
        margin: 5px;
    }
`

const DeleteIcon = styled(DeleteForeverIcon)`
    filter: invert(49%) sepia(59%) saturate(5260%) hue-rotate(341deg) brightness(107%) contrast(92%);
    cursor: pointer;
`

function CartItem ({ drink }) {
    const { data: userData } = useQuery(QUERY_USER);
    const [removeFromCart] = useMutation(REMOVE_FROM_CART);

    const handleDelete = () => {
        const { data } = Auth.getProfile();
        
        removeFromCart({
            variables: { userId: data._id, drinkId: drink._id }
        });

        window.location.reload();
    }
    
    return (
        <ItemContainer>
            <DeleteIcon onClick={handleDelete} />
            <h3>{drink.name}</h3>
            <h4>${drink.price}</h4>
        </ItemContainer>
    )
}

export default CartItem;