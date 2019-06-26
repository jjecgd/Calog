import express from 'express';
import Post from '../models/post';

const router = express.Router();

router.post('/postupload', (req, res) => {
  let post = new Post({
    postId: req.body.title,
    title: req.body.title,
    content: req.body.content,
    todoContent: req.body.todoContent,
    date: new Date(),
    modifyDate : undefined
  });

  post.save(err => {
    if(err) throw err;
    return res.json({success : true});
  });
});

export default router;