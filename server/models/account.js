const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

Account.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

Account.methods.validateHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('account', Account);
