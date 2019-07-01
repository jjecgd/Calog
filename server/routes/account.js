const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Account = require('../models/account');

const router = express.Router();

router.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

router.get('/getSession', (req, res) => {
  res.json({info: req.session.loginInfo});
});

router.post('/login', (req, res) => {
  Account.findOne({id: req.body.id}, (err, account) => {
    if(err) throw err;

    let session = req.session;
    session.loginInfo = {
      _id: account._id,
      id: account.id
    }
    return res.json({
      success: true
    });
  });
});

router.post('/join', (req, res) => {
  Account.findOne({id: req.body.id}, (err, exists) => {
    if(err) throw err;

    let account = new Account({
      id: req.body.id,
      password: req.body.password,
      email: req.body.email,
      created: req.body.created
    });
    account.save(err => {
      if(err) throw err;
      return res.json({success:true});
    })
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {if(err) throw err; });
  return res.json({success: true});
});

module.exports = router;