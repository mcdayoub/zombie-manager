const { model, Schema } = require('mongoose');
const zombieSchema = new Schema({
  name: String,
  locationId: String,
  zombieId: String
});

module.exports = model('Zombie', zombieSchema);
