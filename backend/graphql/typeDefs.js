const { gql } = require('apollo-server');

module.exports = gql`
  type Zombie {
    id: ID!
    name: String!
    locationId: String!
    zombieId: String
  }
  type Location {
    id: ID!
    name: String!
    zombies: [Zombie]!
  }
  type Query {
    getZombies: [Zombie]
    getZombie(zombieId: ID!): Zombie!
    getLocations: [Location]
    getLocation(locationId: ID!): Location!
  }
  type Mutation {
    createZombie(name: String!, locationId: ID!): Zombie!
    deleteZombie(zombieId: ID!): String!
    createLocation(name: String!): Location!
    deleteLocation(locationId: ID!): String!
    moveZombie(zombieId: ID!, locationId: String!): Location!
  }
`;
