const express = require('express');
const router  = express.Router();

const Mood = require('../models/Mood.model');
const User = require('../models/User.model');

//MIDDLEWARE
const checkForAuth = (req, res, next) =>{
  if(req.isAuthenticated()){
    return next()
  } else {
    res.redirect('/login')
  }
 }


//GET HOMEPAGE
router.get('/', (req, res, next) => {
  res.render('index');
});

//GET PROFILE AFTER AUTENTIFICATION
router.get('/profile', checkForAuth, (req, res, next) => {

  User.findById(req.user._id)
  .populate('moods')
  .then((result) => {
    console.log(result)
    res.render('profile', {user: result, moods: JSON.stringify(result.moods)});
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
});

module.exports = router;
