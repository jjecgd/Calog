const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const todoContent = new Schema({
  todoId: Number,
  todo: String,
  isPerform: Boolean
});
const dateFormat = new Schema({
  year: String,
  month: String,
  date: String,
  time: String
});
const Post = new Schema({
  writerId: String,
  title: String,
  content: String,
  todoContent: [todoContent],
  date: dateFormat,
  modifyDate: dateFormat
});

module.exports = mongoose.model('post', Post);
