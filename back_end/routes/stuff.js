const express = require('express');

const router = express.Router();
const Item = require('../models/item');


// POST route
router.post('/', (req, res, next) => {
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
  
  //Get route for item ,Edit and update
  router.get('/:id', (req, res, next) => {
    Item.findOne({
      _id: req.params.id
    }).then(
      (item) => {
        res.status(200).json(item);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });
  
  //Get route for delete
  router.delete('/:id', (req, res, next) => {
    Item.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
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
  
  //Put route for update
  router.put('/:id', (req, res, next) => {
    const item = new Item({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    Item.updateOne({_id: req.params.id}, item).then(
      () => {
        res.status(201).json({
          message: 'Item updated successfully!'
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
  router.get('/', (req, res, next) => {
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
  

  
  
  


module.exports = router;