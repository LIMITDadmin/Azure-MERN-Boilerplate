const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://cosmo-limitd:1ucTvssvrmgTZk4Y2XlTazV6gqLzg8XIEgEmEemaGq0xgBz0f7TjdGC5RfB5jpC24gpbA8xlDsxy7GP6Shf4Fg==@cosmo-limitd.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmo-limitd@');

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
