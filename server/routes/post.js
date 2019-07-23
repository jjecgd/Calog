const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.get('/:id/:year/:month', (req, res) => {
  Post.find({
    writerId: req.params.id,
    'date.year': req.params.year,
    'date.month': req.params.month
  })
    .sort({ _id: -1 })
    .exec((err, posts) => {
      if (err) throw err;
      return res.json(posts);
    });
});

router.post('/upload', (req, res) => {
  const post = new Post({
    writerId: req.body.writerId,
    title: req.body.title,
    content: req.body.content,
    todoContent: req.body.todoContent,
    date: req.body.date,
    modifyDate: undefined
  });

  post.save(err => {
    if (err) throw err;
    return res.json(req.body);
  });
});

router.put('/modify/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    post.title = req.body.title;
    post.content = req.body.content;
    post.todoContent = req.body.todoContent;
    post.modifyDate = req.body.modifyDate;

    post.save((err, post) => {
      if (err) throw err;
      return res.json({
        success: true,
        post
      });
    });
  });
});

router.put('/checkTodo/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    post.todoContent = req.body.todoContent;

    post.save((err, post) => {
      if (err) throw err;
      return res.json({
        success: true,
        post
      });
    });
  });
});

router.delete('/delete/:id', (req, res) => {
  Post.remove({ _id: req.params.id }, function(err) {
    if (err) throw err;
    return res.json({ success: true });
  });
});

module.exports = router;
