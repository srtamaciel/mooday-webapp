const express = require('express');
const router  = express.Router();

const Mood = require('../models/Mood.model');
const User = require('../models/User.model');

//Middleware
const checkForAuth = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next()
  } else {
    res.redirect('/login')
  }
 }

//GET Homepage
router.get('/mood/new', checkForAuth, (req, res) => {
  User.findById(req.user._id)
  .populate('moods')
  .then((result)=>{
    res.render('moods/newMood', {moods: result.moods});
  })
  .catch((error)=>{
    res.send(error)
  })
});

//POST Create mood
router.post('/mood/new', (req, res)=>{
  Mood.create(req.body)
  .then((result) => {
    User.findByIdAndUpdate(req.user._id, {$push: {moods: result._id}})
    .then((result) => {
      res.redirect('/mood/new')
    })
  })
  .catch((err) => {
    res.render('error')
  });
})

//GET mood
 router.get('/new/:_id', (req, res) => {
  Mood.findById(req.params)
  console.log(req.params)
  .then((result)=>{
  console.log(result)
  res.render('moods/newMood', result)
  })
  .catch((error)=>{
    res.send(error)
  })
  
})

//POST delete mood
router.post('/new/:_id/delete', (req, res) => {
  Mood.findByIdAndDelete(req.params._id)
  .then((result)=>{
    console.log(result)
    res.redirect('/mood/new')
  })
  .catch((error)=>{
    res.send(error)
  })
})
 
module.exports = router;
