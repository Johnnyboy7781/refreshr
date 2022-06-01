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
    query user {
        user {
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

export const QUERY_DRINKS = gql`
    query drinks {
        drinks {
            _id
            name
            description
            price
            image
        }
    }
`;

export const QUERY_DRINK = gql`
    query drink($id: ID!) {
        drink(id: $id) {
            _id
            name
            description
            price
            image
        }
    }
`;

export const QUERY_CART = gql`
    query cart {
        cart {
            _id
            name
            description
            price
            image
        }
    }
`