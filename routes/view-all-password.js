var express = require('express')
var router = express.Router()
var userModule = require('../modules/user')
var passCatModel = require('../modules/password_category')
var passModel = require('../modules/add_password')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
var getPassCat = passCatModel.find({})
var getAllPass = passModel.find({})
/* GET home page. */

function checkLoginUser (req, res, next) {
  var userToken = localStorage.getItem('userToken')
  try {
      var decoded = jwt.verify(userToken, 'loginToken')
  } catch (err) {
      res.redirect('/')
  }
  next()
}

if (typeof localStorage === 'undefined' || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage('./scratch')
}

function checkEmail (req, res, next) {
  var email = req.body.email
  var checkexitemail = userModule.findOne({ email: email })
  checkexitemail.exec((err, data) => {
    if (err) throw err
    if (data) {
      return res.render('signup', { title: 'Password Management System', msg: 'Email Already Exist' })
    }
    next()
  })
}


router.get('/', checkLoginUser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser')
  var perPage = 5;
  var page = req.params.page || 1;
  getAllPass.skip((perPage * page) - perPage)
  .limit(perPage).exec(function(err,data){
    if (err) throw err
    passModel.countDocuments({}).exec((err,count)=>{
    res.render('view-all-password', { title: 'Password Management System', 
      loginUser: loginUser, 
      records: data,
    current: page,
    pages: Math.ceil(count / perPage)
  })
})
})
// for pagination
router.get('/:page', checkLoginUser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser')
  var perPage = 5;
  var page = req.params.page || 1;
  getAllPass.skip((perPage * page) - perPage)
  .limit(perPage).exec(function(err,data){
    if (err) throw err
    passModel.countDocuments({}).exec((err,count)=>{
    res.render('view-all-password', { title: 'Password Management System', 
      loginUser: loginUser, 
      records: data,
    current: page,
    pages: Math.ceil(count / perPage)
  })
})
})



module.exports = router

