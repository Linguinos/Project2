const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 5;

const User = require("../models/User.model");
const Api = require("../apis/api");

const isNotLoggedIn = require('../middleware/isNotLoggedIn');
const isLoggedIn = require('../middleware/isLoggedIn');

router.route('/signup')
.get(isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
})
.post(isNotLoggedIn, (req, res) => {
    const { username, email, password } = req.body;

    if (!email) {
        return res
            .status(400)
            .render('auth/signup', { errorMessage: 'Please provide an email address.'});
    };

    if (!username) {
        return res
            .status(400)
            .render('auth/signup', { errorMessage: 'Please provide a username.'});
    };

    User.findOne({ email }).then((user) => {
        if (user) {
            return res
                .status(400)
                .render('auth/signup', { errorMessage: 'Email already in use.' });
        }

        return bcrypt
            .genSalt(saltRounds)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                return User.create({
                    username,
                    email,
                    password: hashedPassword
                });
            })
            .then((user) => {
                req.session.user = user;
                req.session.userId = user._id;
                res.redirect('/user/feed');
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    return res
                        .status(400)
                        .render('auth/signup', { errorMessage: error.message });
                };
                if (error.code === 11000) {
                    return res.status(400).render('auth/signup', {
                        errorMessage: 'Username needs to be unique. The username you chose is already in use.'
                    });
                };
                return res
                    .status(500)
                    .render('auth/signup', { errorMessage: error.message });
            });
    });
});


router.route('/login')
.get(isNotLoggedIn, (req, res) => {
    res.render('auth/login');
})
.post(isNotLoggedIn, (req, res, next) => {
    const {email, password} = req.body;

    if (!email) {
        return res
            .status(400)
            .render('auth/login', {errorMessage: 'Please provide an email.'});
    };

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res
                    .status(400)
                    .render('auth/login', { errorMessage: 'Wrong credentials.'});
            };

            bcrypt.compare(password, user.password).then((isSamePassword) => {
                if (!isSamePassword) {
                    return res
                        .status(400)
                        .render('auth/login', { errorMessage: 'Wrong credentials.' });
                };

                req.session.user = user;
                req.session.userId = user._id;

                return res.redirect('/user/feed');
            });
        })
        .catch((error) => {
            next(error)
        });
});


router.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy((error) => {
        /*
        if (error) {
            return res
                .status(500)
                .render()
        }
        */

        res.redirect('/');
    });
});

module.exports = router;