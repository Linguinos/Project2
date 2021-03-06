const express = require('express');
const router = express.Router();
const fileUploader = require("../config/cloudinary");
const User = require("../models/User.model")
const Meeting = require("../models/Meeting.model")
const Api = require("../apis/api")

const isNotLoggedIn = require('../middleware/isNotLoggedIn');
const isLoggedIn = require('../middleware/isLoggedIn');
const { get } = require('.');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

//To render User Feed after Login

router.get("/feed", isLoggedIn, (req, res) => {
  const id = req.session.userId;
  User.findById(id)
  .then((user => {
        res.render("user/feed", user)}))
  .catch(err=>console.log(err))
});


router.get("/profile", isLoggedIn, (req, res, next) => {
  const id = req.session.userId;
  User.findById(id)
  .populate('meetings')
  .populate('meetingsAttended')
  .then(user => {
    res.render("user/profile-user", user)
    //res.redirect("/")
  })
  //.catch(err=>console.log(err))
});


router.route("/edit")
.get(isLoggedIn, (req, res) => {
  const id = req.session.userId; 
  
  User.findById(id)
    .then((user)=> res.render("user/profile-edit", user))
      
})

.post(isLoggedIn, fileUploader.single("imgUrl"), (req, res)=>{

  
  const {username, description, city, languageSpeak, languageLearn, schedule, meetingPreference} = req.body
  const id = req.session.userId;
  const imgUrl = req.file && req.file.path // cloudinary URL in path.


  User.findByIdAndUpdate(id, {username, description, city, languageSpeak, languageLearn, imgUrl, schedule, meetingPreference})
    .then((user)=>{
      res.redirect("/user/profile");
    })
    .catch(error => {
      res.render("user/profile-edit")
    });
});

router.route("/results")
.get(isLoggedIn, (req, res, next) => {
  User.find()
  .then(profiles => {
    res.render("user/profile-results", {profiles})
  })
  .catch(err=>console.log(err))
})

.post(isLoggedIn, (req, res, next) => {

  const languageLearn = req.body.languageLearn
  const languageSpeak = req.body.languageSpeak
  const meetingPreference = req.body.meetingPreference

  console.log(languageLearn, languageSpeak, meetingPreference);

  User.find( {languageLearn: languageLearn, languageSpeak: languageSpeak, meetingPreference: meetingPreference} )
  .then((profiles => {
    res.render("user/profile-results", {profiles})
    console.log(profiles);
  }))  
  .catch(err=>console.log(err))
})


router.get("/mymeetings", isLoggedIn, (req, res, next)=>{
  
  const id = req.session.userId;

  User.findById(id)
  .populate("meetings")
  .then((user)=> {
    res.render("meetings/my-meetings", user)
  })
  .catch(err=>console.log(err))
})


router.get("/:id", isLoggedIn, (req, res, next) => {
  const id = req.params.id
  console.log(id)

  User.findById(id)
  .populate('meetings')
  .populate('meetingsAttended')
  .then(profile => {
    res.render("user/profile-public", profile)
  })
  .catch(err=>console.log(err))
});

module.exports = router;


