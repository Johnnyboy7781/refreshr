import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DRINK = gql`
  mutation addDrink($name: String!, $price: String!, $description: String!, $image: String!) {
    addDrink(name: $name, price: $price, description: $description, image: $image) {
      drink {
        name
        price
        description
        image
      }
    }
  }
`;

export const REMOVE_DRINK = gql`
  mutation removeDrink($drinkId: ID!) {
    removeDrink(_id: $drinkId) {
      drink {
        name
        price
        description
        image
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($userId: ID!, $drinkId: ID!) {
    addToCart(userId: $userId, drinkId: $drinkId) {
      _id
      username
      cart {
        _id
        name
      }
    }
  }
`;

export const ADD_TO_CART_BULK = gql`
  mutation addToCartBulk($userId: ID!, $drinkId: ID!, $amount: Int!) {
    addToCartBulk(userId: $userId, drinkId: $drinkId, amount: $amount) {
      _id
      username
      cart {
        _id
        name
      }
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($userId: ID!, $drinkId: ID!) {
    removeFromCart(userId: $userId, drinkId: $drinkId) {
      _id
      username
      cart {
        _id
        name
      }
    }
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($userId: ID!, $drinkId: ID!) {
    toggleFavorite(userId: $userId, drinkId: $drinkId) {
      _id
      username
      favorites {
        _id
      }
    }
  }
`