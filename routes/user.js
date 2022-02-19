const express = require('express');
const router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
