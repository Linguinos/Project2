const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
const Meeting = require("../models/Meeting.model")
const Api = require("../apis/api")

const isNotLoggedIn = require('../middleware/isNotLoggedIn');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get("/", isLoggedIn, (req, res) => {
    Meeting.find()
    .then((meetings) => {
          res.render("meetings/meeting-list", {meetings})})
    .catch(err=>console.log(err))
});

router.route('/create')
.get(isLoggedIn, (req, res) => {
    res.render('meetings/meeting-create')
})
.post(isLoggedIn, (req, res) => {
    const {name, typeOfMeeting, language} = req.body;
    const host = req.session.userId;

    console.log("11111111111111111111111111111", host);

    User.findById(host)
    .then((user) => {
        const hostId = user.id
        Meeting.create({name, hostId, typeOfMeeting, language})
        .then((meeting)=>{
            console.log("2222222222222222222", meeting);
            User.findByIdAndUpdate(req.session.userId, {$push: {meetings: meeting._id}})
            .then(() => {
                res.redirect('/meetings');
            })
        })
    })
    .catch(err=>console.log(err))

})

router.get('/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;

    Meeting.findById(id)
    .then((meeting) => {
        res.render('meetings/meeting-details', meeting)
    })
})

router.post("/:id/delete", (req, res, next) => {
    const id = req.params.id;
    Meeting.findByIdAndDelete(id)
        .then(res.redirect("/meetings"))
})

router.route("/:id/edit")
.get(isLoggedIn, (req, res) => {
  const id = req.params.id; 
  console.log(id)
  Meeting.findById(id)
    .then((meeting) => res.render("meetings/meeting-edit", meeting))
      
})
.post(isLoggedIn, (req, res)=>{
  const {name, typeOfMeeting, language} = req.body
  const id = req.params.id;

  Meeting.findByIdAndUpdate(id, {name, typeOfMeeting, language})
            .then((meeting)=>{
                res.render("meetings/meeting-details", meeting);
            })
            .catch(error=>{res.render("meetings/meeting-edit")})
});



module.exports = router;