const { AuthenticationError } = require('apollo-server-express');
const { User, Drink } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('cart').populate("favorites");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('cart').populate("favorites");
    },
    drinks: async () => {
      return Drink.find();
    },
    drink: async (parent, { name }) => {
      return Drink.findOne({ name });
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addDrink: async (parent, { name, price, description, image }) => {
      const drink = await Drink.create({ name, price, description, image });
      return drink;
    },
    removeDrink: async (parent, { drinkId }) => {
      const drink = await Drink.findOneAndDelete({ _id: drinkId });
      return drink;
    },
    addFavorite: async (parent, { userId, drinkId }) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { favorites: drinkId }},
        { new: true }
      );
      return user;
    },
    removeFavorite: async (parent, { userId, drinkId }) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { favorites: drinkId}},
        { new: true }
      );
      return user;
    },
    addToCart: async (parent, { userId, drinkId }) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { cart: drinkId }},
        { new: true }
      );
      return user;
    },
    removeFromCart: async (parent, { userId, drinkId }) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { cart: drinkId }},
        { new: true }
      );
      return user;
    }
  }
};

module.exports = resolvers;
