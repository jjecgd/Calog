const express = require('express');
const account = require('./account');
const post = require('./post');

const router = express.Router();
router.use('/post', post);
router.use('/account', account);

module.exports = router;