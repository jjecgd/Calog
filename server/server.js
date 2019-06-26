const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const api = require('./routes');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('CONNECTED TO MONGOD SERVER'));
mongoose.connect('mongodb://localhost/posts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/api', api);

app.listen(port, () => console.log(`Listening on port ${port}`));