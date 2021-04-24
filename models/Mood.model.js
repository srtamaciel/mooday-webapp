const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moodSchema = new Schema(
  {
    img: {type: String, enum: ['https://i.ibb.co/TMKFpHz/happy-doodle.png', 'https://i.ibb.co/MP7XLvs/sad-doodle.png', 'https://i.ibb.co/khsJP53/angry-doodle.png']},
    mood: {type: String},
    date: {type: String, default: Date.now()}

}, { versionKey: false})


const Mood = mongoose.model('Mood', moodSchema) 

module.exports = Mood