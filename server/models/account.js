const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Account = new Schema({
  id: String,
  password: String,
  username: String,
  nickname: String,
  email: String,
  created: Date,
  friend: [String]
});

module.exports = mongoose.model('account', Account);