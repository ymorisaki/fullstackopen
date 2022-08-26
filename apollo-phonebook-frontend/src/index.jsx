import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, HttpLink, InMemoryCache, gql} from '@apollo/client'

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    url: 'http://localhost:4000'
  })
})

const query = gql`
  query {
    allPersons {
      name,
      phone,
      address {
        street,
        city
      }
    }
  }
`

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
