import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
  query Query {
    allPersons {
      name
      phone
      id
    }
  }
`

export const CREATE_PERSON = gql`
  mutation CreatePerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
`
