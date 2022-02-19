const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")

const isNotLoggedIn = require('../middleware/isNotLoggedIn');
const isLoggedIn = require('../middleware/isLoggedIn');

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
  console.log("1", id);
  User.findById(id)
  .then(user => {
    res.render("user/profile-user")
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
      .post(isLoggedIn, (req, res)=>{
         const {username, description, city, languageSpeak, languageLearn, imgUrl} = req.body
         const user = req.session.userId
         User.findByIdAndUpdate(id, {username, description, city, languageSpeak, languageLearn, imgUrl})
            .then(()=>{
                res.redirect("/user/profile-user");
            })
            .catch(error=>{res.render("user/profile-edit")})
            })
 });

module.exports = router;


