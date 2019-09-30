const { AuthenticationError, UserInputError } = require('apollo-server');

const Zombie = require('../../models/Zombie');
const Location = require('../../models/Location');

module.exports = {
  Query: {
    async getZombies() {
      try {
        const zombies = await Zombie.find();
        return zombies;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getZombie(_, { zombieId }) {
      try {
        const zombie = await Zombie.findById(zombieId);
        if (zombie) {
          return zombie;
        } else {
          throw new Error('Zombie not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createZombie(_, { name, locationId }) {
      if (name.trim() === '') {
        throw new Error('Zombie must have a name');
      }
      const location = await Location.findById(locationId);
      const newZombie = new Zombie({
        name,
        locationId
      });
      const zombie = await newZombie.save();
      location.zombies.push({
        name,
        zombieId: zombie.id
      });
      await location.save();
      return zombie;
    },
    async deleteZombie(_, { zombieId }) {
      try {
        const zombie = await Zombie.findById(zombieId);
        const locationId = zombie.locationId;
        const location = await Location.findById(locationId);
        location.zombies = location.zombies.filter(
          zombie => zombie.zombieId !== zombieId
        );
        await location.save();
        await zombie.delete();
        return 'Zombie deleted';
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
