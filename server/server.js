const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require("./utils/auth");
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY);

console.log("Key",process.env.REACT_APP_SECRET_KEY);

let server;

async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.post('/api/payment_intents', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true
      }
    })
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
