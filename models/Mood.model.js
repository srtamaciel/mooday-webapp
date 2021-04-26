const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moodSchema = new Schema(
  {
    img: {type: String},
    diary: {type: String},
    mood: {type: String},
    date: {type: String, default: new Date().toISOString().split('T')[0]}

}, { versionKey: false})


const Mood = mongoose.model('Mood', moodSchema) 

module.exports = Mood