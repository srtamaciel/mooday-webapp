const express = require('express');
const router  = express.Router();

const Mood = require('../models/Mood.model');
const User = require('../models/User.model');
let thisDate;

//MIDDLEWARE
const checkForAuth = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next()
  } else {
    res.redirect('/login')
  }
 }

//GET MOOD FOR A PICKED DAY
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

//POST CREATE MOOD
router.post('/mood/new/:date', (req, res)=>{
  thisDate = req.params.date
  User.findById(req.user._id)
  .populate('moods')
  .then((result)=>{
    let counter = 0
    result.moods.forEach((mood)=> {
      if(mood.date === req.params.date){ counter++}
    })
        if(counter === 0){
          Mood.create({
            mood: req.body.mood,
            date: req.params.date,
            img: req.body.img,
            diary: req.body.diary
          })
          .then((result) => {
            console.log(result)
            const date = result.date
            User.findByIdAndUpdate(req.user._id, {$push: {moods: result._id}})
            .then((result) => {
                console.log(result)
              res.redirect('/mood/new/' + date)
            })
          })
      } else {
        const todayMoods = result.moods.filter(mood=>{
          return mood.date === req.params.date
        })
        res.render('moods/newMood', {moods: todayMoods, date: req.params.date, errorMessage: `Sorry! You can't create two moods on the same day`})
      }
  })
  .catch((error)=>{
    res.render('error')
  })
})

//GET SEE CREATED MOOD
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


//POST DELETE
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


//GET EDIT MOOD
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

//POST EDIT MOOD
router.post('/edit-mood/:_id', (req, res) => {
  Mood.findByIdAndUpdate(req.params._id, req.body)
    .then((result) => {
      console.log(req.body)
      const date = result.date
      res.redirect(`/mood/new/` + date)
    })
    .catch(err => {
      res.render('error')
    })
  })


//GET EDIT DIARY
  router.get('/edit-diary/:_id', (req, res) => {
    Mood.findById(req.params._id)
    .then((result)=>{
      console.log(result)
      res.render('moods/editDiary', {result: result})
    })
    .catch((error)=>{
      res.render('error')
    })
    
  })
  
  //POST EDIT DIARY
  router.post('/edit-diary/:_id', (req, res) => {
    Mood.findByIdAndUpdate(req.params._id, req.body)
      .then((result) => {
        console.log(req.body)
        const date = result.date
        res.redirect(`/mood/new/` + date)
      })
      .catch(err => {
        res.render('error')
      })
    })
  
module.exports = router;