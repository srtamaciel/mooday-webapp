const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')

const User = require('../models/User.model')



/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

/* POST sign up */
router.post('/signup', (req, res)=> {
  const {username, password} = req.body

  if(username === '' || password === ''){
    res.render('signup', {errorMessage: 'Please fill all the files'})
  }
User.findOne({username})
.then((user) => {
  if(user){
    res.render('signup',  {errorMessage: 'This user already exists'})
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10)
    User.create({username, password: hashedPassword})
    .then(() => {
      res.redirect('/login')
    })
  }
})
.catch((err) => {
  res.send(err)
});
})

//GET login page
router.get('/login', (req, res) => {
  res.render('login', {errorMessage: req.flash('error')})
})

//POST login page
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCall: true
}))


//GET logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
