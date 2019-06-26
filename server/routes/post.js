const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');

const router = express.Router();

router.get('/', (req, res) => {
  Post.find().exec((err, posts) => {
    if(err) throw err;
    res.json(posts);
  });
});

router.post('/upload', (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.todoContent = req.body.todoContent;
  post.date = req.body.date;
  post.modifyDate = undefined;

  post.save(err => {
    if(err) throw err;
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
      if(err) throw err;
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
      if(err) throw err;
      return res.json({
        success: true,
        post
      });
    });
  });
});

router.delete('/delete/:id', (req, res) => {
  Post.remove({_id: req.params.id}, function(err){
    if(err) throw err;
    return res.json({success:true});
  });
});

module.exports = router;