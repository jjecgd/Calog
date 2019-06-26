const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const todoContent = new Schema({
  todoId: Number,
  todo: String,
  isPerform: Boolean
});
const Post = new Schema({
  title: String,
  content: String,
  todoContent: [todoContent],
  date: String,
  modifyDate: String
});

module.exports = mongoose.model('post', Post);