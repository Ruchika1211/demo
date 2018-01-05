var express = require('express');
var router = express.Router();
var Users= require('../modules/user')

/* GET users listing. */
router.post('/googleSignup', function(req, res, next) {
 
  Users.googleSignup(req,res);
});

router.post('/Signup', function(req, res, next) {

  Users.Signup(req,res);
});

router.post('/Signin', function(req, res, next) {
  
    Users.Signin(req,res);
  });

module.exports = router;
