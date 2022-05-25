import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    {
        users {
            _id
            username
            email
        }
    }
`

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            cart {
                _id
                name
                description
                price
            }
            favorites {
                _id
                name
                description
                price
            }
        }
    }
`;

export const QUERY_CART = gql`
    query cart($id: ID!) {
        cart(id: $id) {

        }
    }
`