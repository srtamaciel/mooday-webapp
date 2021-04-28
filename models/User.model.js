const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {type: String, required: true, createIndexes: true},
    password: {type: String, required: true},
    img: {type: String,  default: 'https://i.ibb.co/VLZN97c/profile-gif-2.gif'},
    moods: [{type: Schema.Types.ObjectId, ref:'Mood'}]
  
  
}, { versionKey: false})


const User = mongoose.model('User', userSchema) 

module.exports = User