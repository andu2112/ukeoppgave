require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const User = require('./models/User.js');

const app = express();

const PORT = process.env.PORT || 3500;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("det går bra");
    })
    .catch((err) => {
        console.log(err);
    });

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;

    next();
});

app.use('/', require('./routes/routes.js'));

app.listen(PORT, () => {
    console.log('yeyeye');
});