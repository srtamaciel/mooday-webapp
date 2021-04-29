const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moodSchema = new Schema(
  {
    img: {type: String},
    diary: {type: String},
    mood: {type: String},
    date: {type: String, default: new Date().toISOString().split('T')[0]} //DEFAULT: FORMAT THE DATE THE SAME WAY AS THE PARAMS

}, { versionKey: false})


const Mood = mongoose.model('Mood', moodSchema) 

module.exports = Mood