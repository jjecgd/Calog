require('dotenv').config();
process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() == 'production'
    ? 'production'
    : 'development';
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes');

const app = express();
const db =
  process.env.NODE_ENV === 'development'
    ? mongoose.connect('mongodb://localhost/calog')
    : (() => {
        mongoose.connect(process.env.MONGO_URI);
        const http = require('http');
        setInterval(function() {
          console.log('wake up!');
          http.get('https://caloggers.herokuapp.com');
        }, 300000);
      })();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.listen(port);
