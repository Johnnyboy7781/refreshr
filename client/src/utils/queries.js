import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id: ID
            username: String
            email: String
            password: String
            cart: [Drink]!
            favorites: [Drink]!
        }
    }
`;

export const QUERY_CART = gql`
    query cart($id: ID!) {
        cart(id: $id) {
            
        }
    }
`