const mongoose = require('mongoose');
const Post = require('./post');

const Schema = mongoose.Schema;

const Account = new Schema({
  id: String,
  email: String,
  password: String,
  nickname: String,
  created: String,
  friend: [String],
  comment: String,
  isOpen: Boolean
});

module.exports = mongoose.model('account', Account);
