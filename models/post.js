import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Post = new Schema({
  postId: String,
  title: String,
  content: String,
  todoContent: [
    {TodoId: String, todo: String, isPerform: Boolean}
  ],
  date: {type: Date, default: Date.now},
  modifyDate: {type: Date, default: Date.now}
});

export default mongoose.model('post', Post);