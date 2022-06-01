import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Home from "./Pages/Home";
import Register from './Pages/Register';
import SingleDrink from "./Pages/SingleDrink";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('refreshr_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/register" 
                element={<Register />} 
              /> 
              <Route
                path="/drink/:drinkId"
                element={<SingleDrink />}
              />
              <Route 
                path="/cart"
                element={<Checkout />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
            </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
