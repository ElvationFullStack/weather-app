const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CitySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    condtionPic: String
})

const City = mongoose.model("city", CitySchema)
module.exports = City;