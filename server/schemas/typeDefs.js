const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cart: [Drink]!
    favorites: [Drink]!
  }

  type Drink {
    _id: ID
    name: String
    description: String
    price: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    drinks: [Drink]
    drink(name: String!): Drink
    cart(id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDrink(
      name: String!, 
      price: Int!,
      description: String,
      image: String
    ): Drink
    removeDrink(drinkId: ID!): Drink
    addFavorite(userId: ID!, drinkId: ID!): User
    removeFavorite(userId: ID!, drinkId: ID!): User
    addToCart(userId: ID!, drinkId: ID!): User
    removeFromCart(userId: ID!, drinkId: ID!): User
  }
`;

module.exports = typeDefs;
