const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let country = new Schema({
  name: String,
  location: Schema({
    type: String,
    coordinates: [[[Number]]],
  }),
  visited: Boolean,
  toBeVisited: Boolean,
});

module.exports = mongoose.model("country", country);
