const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const heroSchema = new Schema(
  {
    type: String,
    date: Date,
    desc: String,
    desc_long: String
  },
  { autoIndex: true }
);

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero;
