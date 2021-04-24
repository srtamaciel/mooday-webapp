const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moodSchema = new Schema(
  {
    mood: {type: String, required: true},
}, { versionKey: false})


const Mood = mongoose.model('Mood', moodSchema) 

module.exports = Mood