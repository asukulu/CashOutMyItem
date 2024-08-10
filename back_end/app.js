const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Item = require('./models/item');

const app = express();

mongoose.connect('mongodb+srv://eugenendela24:Mulongwe24@cashoutmystuff.tjq6h.mongodb.net/?retryWrites=true&w=majority&appName=CashOutMyStuff')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// POST route
app.post('/api/stuff', (req, res, next) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  item.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

// GET route
app.get('/api/stuff', (req, res, next) => {
  Item.find().then(
    (items) => {
      res.status(200).json(items);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

module.exports = app;


