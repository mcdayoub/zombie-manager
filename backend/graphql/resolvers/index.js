const zombiesResolvers = require('./zombies');
const locationsResolvers = require('./locations');

module.exports = {
  Query: {
    ...zombiesResolvers.Query,
    ...locationsResolvers.Query
  },
  Mutation: {
    ...zombiesResolvers.Mutation,
    ...locationsResolvers.Mutation
  }
};
