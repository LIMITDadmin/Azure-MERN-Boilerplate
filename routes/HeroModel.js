const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const heroSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: String,
    date: Date,
    desc: String,
    desc_long: String
  },
  { autoIndex: false }
);

const Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero;
