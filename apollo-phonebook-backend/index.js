const {ApolloServer, UserInputError, gql} = require('apollo-server')
const {v1: uuid} = require('uuid')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }

      const byPhone = (person) => args.phone === 'YES' ? person.phone : !person.phone

      return persons.filter(byPhone)
    },
    findPerson: (root, args) => persons.find(p => p.name === args.name)
  },
  Mutation: {
    addPerson: (root, args) => {
      const person = {...args, id: uuid()}

      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name
        })
      }

      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find(person => args.name === person.name)
      const updatePerson = {...person, phone: args.phone}

      if (!person) {
        return null
      }

      persons = persons.map(p => p.name === args.name ? updatePerson : p)

      return updatePerson
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Server ${url}`)
})
