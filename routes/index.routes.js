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


//GET homepage
router.get('/', (req, res, next) => {
  res.render('index');
});

//GET profile private page
router.get('/profile', checkForAuth, (req, res, next) => {

  User.findById(req.user._id)
  .populate('moods')
  .then((result) => {
    console.log(result)
    res.render('profile', result);
  })
  .catch((err) => {
    res.render('error')
  })
});

module.exports = router;
