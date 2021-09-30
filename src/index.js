const path = require('path');
const express = require('express');
const validator = require('validator');
const { user } = require('../mongoose/models');
require('../mongoose/connect');

const app = express();

const PORT = process.env.PORT || 8000;
publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));
app.use(express.json()); // for parsing application/json

// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/users', async (req, res) => {
  await user
    .find({})
    .then((docs) => {
      res.status(200).send(JSON.stringify(docs));
    })
    .catch((err) => {
      console.log('Error while fetching user', err);
      res.status(500).send('Error occured');
    });
});

app.post('/user', async (req, res) => {
  const doc = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  };

  await user
    .create(doc)
    .then((doc) => {
      console.log('Item created successfully');
      res.status(201).send({
        success: 'Item created successfully',
      });
    })
    .catch((err) => {
      console.log('Error occured', err);
      res.status(500).send({
        error: err,
      });
    });
});

app.put('/user', async (req, res) => {
  console.log(req.body);
  const id = req.body._id;
  const doc = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  };
  await user
    .findByIdAndUpdate(id, doc)
    .then((doc) => {
      console.log('Item updated successfully', doc);
      res.status(200).send({
        success: 'Item updated successfully',
      });
    })
    .catch((err) => {
      console.log('Error occured', err);
      res.status(500).send({
        error: err,
      });
    });
});

app.delete('/user', async (req, res) => {
  const id = req.body._id;
  await user
    .findByIdAndDelete(id)
    .then((doc) => {
      console.log('Item deleted successfully');
      res.status(200).send({
        success: 'Item deleted successfully',
      });
    })
    .catch((err) => {
      console.log('Error occured', err);
      res.status(500).send({
        error: err,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
