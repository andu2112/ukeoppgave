const express = require('express');
const passport = require('passport');

const User = require('../models/User.js');

const router = new express.Router();

router.get('/', (req, res) => {
    console.log(req.isAuthenticated());
    res.render('home');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/login', (req, res) => {
    passport.authenticate("local")(req, res, () => {
        res.redirect("/");
    });
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({
        username: username,
    });

    User.register(user, password, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            console.log('fungerer');
        }
    });

    res.redirect('/login');
});

module.exports = router;