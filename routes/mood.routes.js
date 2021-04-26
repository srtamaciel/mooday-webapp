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

//GET New mood
router.get('/mood/new/:date', checkForAuth, (req, res) => {
  Mood.find({date: req.params.date})
  .then((result)=>{
    console.log(result)
    User.findById(req.user._id)
    .populate('moods')
    .then((result)=>{
      const todayMoods = result.moods.filter(mood=>{
        return mood.date === req.params.date
      })
      res.render('moods/newMood', {moods: todayMoods, date: req.params.date});
    }) 
  })
  .catch((error)=>{
    res.render('error')
  })
});

//POST Create mood
router.post('/mood/new/:date', (req, res)=>{
  Mood.create({
    mood: req.body.mood,
    date: req.params.date,
    img: req.body.img 
  })
  .then((result) => {
    console.log(result)
    const date = result.date
    User.findByIdAndUpdate(req.user._id, {$push: {moods: result._id}})
    .then((result) => {
      res.redirect('/mood/new/' + date)
    })
  })
  .catch((error) => {
    res.render('error')
  });
})

//GET mood
 router.get('/new/:_id', (req, res) => {
  Mood.findById(req.params)
  .then((result)=>{
    console.log(result)
  res.render('moods/newMood', result)
  })
  .catch((error)=>{
    res.render('error')
  })
  
})

//POST delete mood
/*  router.post('/new/delete/:_id', (req, res) => {
  Mood.findByIdAndDelete(req.params._id)
  .then((result)=>{
    console.log(result)
    const date = result.date
    res.redirect('/mood/new/' + date)
  })
  .catch((error)=>{
    res.render('error')
  })
}) */

//POST delete mood from array User and moods collection
router.post('/new/delete/:_id', (req, res) => {
  User.findByIdAndUpdate(req.user._id, {$pull: {moods: req.params._id}})
  .then((result)=>{
    Mood.findByIdAndDelete(req.params._id)
    .then((result) => {
      console.log(result)
      const date = result.date
      res.redirect('/mood/new/' + date)
    })
  })
  .catch((error)=>{
    res.render('error')
  })
})


//GET MODIFY MOOD
router.get('/edit-mood/:_id', (req, res) => {
  Mood.findById(req.params._id)
  .then((result)=>{
    console.log(result)
    res.render('moods/editMood', {result: result})
  })
  .catch((error)=>{
    res.render('error')
  })
  
})

//POST MODIFY MOOD
router.post('/edit-mood/:_id', (req, res) => {

  Mood.findByIdAndUpdate(req.params._id, req.body)
    .then((result) => {
      console.log(req.body)
      const date = result.date
      res.redirect(`/mood/new/` + date)
    })
    .catch(err => {
      console.log(err)
    })
  })



module.exports = router;
