const { AuthenticationError } = require('apollo-server-express');
const { User, Drink } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('cart').populate("favorites");
    },
    user: async (parent, args, context) => {
      if(context.user) {
        const user = await User.findById(context.user._id).populate("cart").populate("favorites");
        user.cart.sort((a, b) => a.name.localeCompare(b.name));
        return user;
      }
      
      throw new AuthenticationError("Not logged in!");
    },
    drinks: async () => {
      return Drink.find();
    },
    drink: async (parent, { id }) => {
      return Drink.findOne({ _id: id });
    },
    cart: async (parent, args, context) => {
      console.log(context.user);
      if(context.user) {
        const user = await User.findById(context.user._id).populate("cart");
        user.cart.sort((a, b) => a.name.localeCompare(b.name));
        return user.cart;
      }
      
      throw new AuthenticationError("Not logged in!");
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
    addToCart: async (parent, { userId, drinkId }) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { cart: drinkId }},
        { new: true }
      );
      return user;
    },
    addToCartBulk: async (parent, { userId, drinkId, amount }) => {
      let drinks = [];

      for (let i = 0; i < amount; i++) {
        drinks.push(drinkId);  
      }
      
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { cart: { $each: drinks } } },
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
    },
    toggleFavorite: async (parent, { userId, drinkId }) => {
      let user = await User.findOne({ _id: userId });
      const isInArr = user.favorites.some(function (fav) {
        return fav.equals(drinkId);
      });

      if (isInArr) {
        user = await User.findByIdAndUpdate(
          { _id: userId },
          { $pull: { favorites: drinkId } },
          { new: true }
        )
      } else if (!isInArr) {
        user = await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { favorites: drinkId } },
          { new: true }
        )
      }

      return user
    }
  }
};

module.exports = resolvers;
