const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
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

const typeDefs = `
  type Query {
    allPersons(phone: YesNo): [Person!]!
    personCount: Int!
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

  enum YesNo {
    YES
    NO
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Address {
    street: String!
    city: String!
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (_root, args) => {
      if (!args.phone) {
        return persons
      }

      return args.phone === 'YES' ? persons.filter(p => p.phone) : persons.filter(p => !p.phone)
    },
    findPerson: (_root, args) => persons.find(p => p.name === args.name)
  },
  Mutation: {
    addPerson: (_root, args) => {
      const newPerson = {
        ...args,
        id: uuid()
      }

      if (persons.find(p => p.name === newPerson.name)) {
        throw new GraphQLError('名前が重複しています。', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalid: args.name
          }
        })
      }

      persons.push(newPerson)

      return newPerson
    },
    editNumber: (_root, args) => {
      const target = persons.find(p => p.name === args.name)

      if (!target) {
        return null
      }

      const updatePerson = {
        ...target,
        phone: args.phone
      }

      persons = persons.map(p => p.name === args.name ? updatePerson : p)

      return updatePerson
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(apolloServer, {
  listen: {
    port: 4000
  }
}).then(({url}) => {
  console.log(url)
})
