import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
query {
  allPersons {
    name
    address {
      city
    }
    phone
  }
}
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone 
      address {
        street
        city
      }
    }
  }
`

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!) {
    addPerson(name: $name, phone: $phone street: $street, city: $city) {
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

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
    }
  }
`
