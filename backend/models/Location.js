const { model, Schema } = require('mongoose');

const locationSchema = new Schema({
  name: String,
  zombies: [
    {
      name: String,
      zombieId: String
    }
  ]
});

module.exports = model('Location', locationSchema);
