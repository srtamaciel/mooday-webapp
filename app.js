require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const logger       = require('morgan');
const path         = require('path');


//IMPORT PACKAGES --------------

const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { Passport } = require('passport');

//USER MODEL --------------
const User = require('./models/User.model')

// MONGOOSE--------------------
require('./config/db.config')

  //EXPRESS--------------------
const app = express();

// Middleware Setup ------------
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//MIDDLEWARE SESSION--------------
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))

//SERIALIZE --------------------
passport.serializeUser((user, callback)=> {
  callback(null, user._id)
})

//DESERIALIZE--------------------
passport.deserializeUser((id, callback)=>{
  User.findById(id)
  .then((result)=>{
    callback(null, result)
  })
  .catch((err)=>{
    callback(err)
  })
})

//FLASH CONFIG--------------------
app.use(flash())

//MIDDLEWARE STRATEGY -------------------- 
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
 }, (req, username, password, next)=> {
  User.findOne({username})
  .then((user) => {
    if(!user){ 
      return next(null, false, {message: 'Incorrect username'})
    }

    if(!bcrypt.compareSync(password, user.password)){ 
      return next(null, false, {message: 'Incorrect password'})
    }

    return next(null, user)
  })
  .catch((err) => {
    next(err)
  });
}))

//MIDDLEWARE PASSPORT
app.use(passport.initialize())
app.use(passport.session())


// Express View engine setup      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


//--------------ROUTES------------
app.use('/', require('./routes/index.routes'));
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/mood.routes'));


//--------------APP LISTENER------------

app.listen(process.env.PORT, () => {
  console.log(`Conectado al puerto ${process.env.PORT}`)
})
