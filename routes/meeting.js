const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
const Meeting = require("../models/Meeting.model")
const Api = require("../apis/api")

const isNotLoggedIn = require('../middleware/isNotLoggedIn');
const isLoggedIn = require('../middleware/isLoggedIn');

router.route("/")
.get(isLoggedIn, (req, res) => {
    Meeting.find()
    .then((meetings) => {
          res.render("meetings/meeting-list", {meetings})})
    .catch(err=>console.log(err))
})
.post(isLoggedIn, (req, res, next) => {

    const language = req.body.language
   
    Meeting.find( {language: language} )
    .then((meetings => {
      res.render("meetings/meeting-list", {meetings})
    }))  
    .catch(err=>console.log(err))
});


router.route('/create')
.get(isLoggedIn, (req, res) => {
    res.render('meetings/meeting-create')
})
.post(isLoggedIn, (req, res) => {
    const {name, typeOfMeeting, language, schedule, time, city, description} = req.body;
    const host = req.session.userId;

    console.log("11111111111111111111111111111", host);

    User.findById(host)
    .then((user) => {
        const host = user._id;

        Meeting.create({name, host, typeOfMeeting, language, schedule, time, city, description})
        .then((meeting)=>{
            console.log("2222222222222222222", meeting);

            User.findByIdAndUpdate(req.session.userId, {$push: {meetings: meeting._id}})
            .then(() => {
                res.redirect('/meetings');
            })
        })
    })
    .catch(err=>console.log(err))
});


router.get('/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;

    Meeting.findById(id)
    .populate('host')
    .populate('attendees')
    .then((meeting) => {
        res.render('meetings/meeting-details', meeting)
    })
    .catch(error => console.log(error));
});


router.post("/:id/delete", (req, res, next) => {
    const id = req.params.id;
    Meeting.findByIdAndDelete(id)
        .then(res.redirect("/meetings"))
        .catch(error => console.log(error));
});


router.route("/:id/edit")
.get(isLoggedIn, (req, res) => {
    const id = req.params.id;

    Meeting.findById(id)
        .populate('host')
        .then((meeting) => {
            if(meeting.host._id != req.session.userId) res.redirect(`/meetings/${meeting._id}`);
            else res.render("meetings/meeting-edit", meeting);
        })
        .catch(error => console.log(error));
})
.post(isLoggedIn, (req, res)=>{
  const {name, typeOfMeeting, language, schedule, time, city, description} = req.body
  const id = req.params.id;

  Meeting.findByIdAndUpdate(id, {name, typeOfMeeting, language, schedule, time, city, description})
    .then((meeting)=>{
        res.redirect(`/meetings/${meeting._id}`);
    })
    .catch(error=>{res.render("meetings/meeting-edit")});
});


router.post('/:id/join', isLoggedIn, (req, res, next) => {
    const id = req.params.id;

    Meeting.findById(id)
    .then((meeting) => {
        if(meeting.attendees.includes(req.session.userId) || req.session.userId == meeting.host) {
            res.redirect(`/meetings/${meeting._id}`);

        } else {
            Meeting.findByIdAndUpdate(id, {$push: {attendees: req.session.userId}})
            .populate('host')
            .then((meeting) => {

                User.findByIdAndUpdate(req.session.userId, {$push: {meetingsAttended: id}})
                .then((user)=>{
                    console.log('ATTENDED MEETINGS: ',user.meetingsAttended);
                    res.redirect(`/meetings/${meeting._id}`);
                })
            })
            .catch(error => console.log(error));
        };
    })
    .catch(error => console.log(error));

    
});

/*
const {name, typeOfMeeting, language} = req.body;
const host = req.session.userId;

console.log("11111111111111111111111111111", host);

User.findById(host)
.then((user) => {
    const host = user._id;

    Meeting.create({name, host, typeOfMeeting, language})
    .then((meeting)=>{
        console.log("2222222222222222222", meeting);

        User.findByIdAndUpdate(req.session.userId, {$push: {meetings: meeting._id}})
        .then(() => {
            res.redirect('/meetings');
        })
    })
})*/



module.exports = router;