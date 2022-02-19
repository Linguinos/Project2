const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
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
  .then(user => {
    res.render("user/profile-user", user)
    //res.redirect("/")
    console.log(user)
  })
  //.catch(err=>console.log(err))
});

router.route("/edit")
.get(isLoggedIn, (req, res) => {
  const id = req.session.userId; 
  
  User.findById(id)
    .then((user)=> res.render("user/profile-edit", user))
      
})
.post(isLoggedIn, (req, res)=>{
  const {username, description, city, languageSpeak, languageLearn, imgUrl} = req.body
  const id = req.session.userId;

  User.findByIdAndUpdate(id, {username, description, city, languageSpeak, languageLearn, imgUrl})
            .then(()=>{
                res.redirect("/user/profile");
            })
            .catch(error=>{res.render("user/profile-edit")})
});

router.get("/results", isLoggedIn, (req, res, next) => {
  User.find()
  .then(profiles => {
    res.render("user/profile-results", {profiles})
  })
  .catch(err=>console.log(err))
});

router.get("/:id", isLoggedIn, (req, res, next) => {
  const id = req.params.id
  console.log(id)
  User.findById(id)
  .then(profile => {
    res.render("user/profile-public", profile)
  })
  .catch(err=>console.log(err))
});




module.exports = router;


