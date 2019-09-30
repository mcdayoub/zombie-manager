const { AuthenticationError, UserInputError } = require('apollo-server');

const Location = require('../../models/Location');
const Zombie = require('../../models/Zombie');

module.exports = {
  Query: {
    async getLocations() {
      try {
        const locations = await Location.find();
        return locations;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getLocation(_, { locationId }) {
      try {
        const location = await Location.findById(locationId);
        if (location) {
          return location;
        } else {
          throw new Error('Location not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createLocation(_, { name }) {
      const newLocation = new Location({
        name: name,
        zombies: []
      });

      const location = await newLocation.save();

      return location;
    },
    async deleteLocation(_, { locationId }) {
      try {
        const location = await Location.findById(locationId);
        await location.delete();
        return 'Location deleted';
      } catch (err) {
        throw new Error(err);
      }
    },
    async moveZombie(_, { zombieId, locationId }) {
      try {
        const zombie = await Zombie.findById(zombieId);
        const oldLocationId = zombie.locationId;
        if (oldLocationId === locationId) {
          throw new Error('Zombie already in this location');
        }
        const oldLocation = await Location.findById(oldLocationId);
        oldLocation.zombies = oldLocation.zombies.filter(
          zombie => zombie.zombieId !== zombieId
        );
        await oldLocation.save();
        const newLocation = await Location.findById(locationId);
        newLocation.zombies.push({
          name: zombie.name,
          zombieId: zombie.id
        });
        zombie.locationId = locationId;
        zombie.save();
        await newLocation.save();
        return newLocation;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
