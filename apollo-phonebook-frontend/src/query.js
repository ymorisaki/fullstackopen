import { gql } from "@apollo/client"

export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

export const FIND_PERSON = gql`
  query FindPerson($nameToSearch: String!) {
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

export const ADD_PERSON = gql`
  mutation AddPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
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

export const EDIT_NUMBER = gql`
  mutation EditNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
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