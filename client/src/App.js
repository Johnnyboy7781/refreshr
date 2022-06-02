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
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import SingleDrink from './Pages/SingleDrink';
import Favorites from './Pages/Favorites';
import Auth from './utils/auth';

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
                // Page inaccesible if not logged in
                element={Auth.loggedIn() ? <Checkout /> : <Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path='/favorites'
                // Page inaccesible if not logged in
                element={Auth.loggedIn() ? <Favorites /> : <Home />}
              />
            </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
