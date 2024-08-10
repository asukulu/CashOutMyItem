const express = require('express');

const router = express.Router();
//const Item = require('../models/item');


const stuffCtrl = require('../controllers/stuff');

// POST route
router.post('/', stuffCtrl.createItem);

//Get route for item ,Edit and update
  router.get('/:id', stuffCtrl.getOneItem);
  
  // GET route find
  router.get('/', stuffCtrl.getAllItem);

  //Get route for delete
  router.delete('/:id', stuffCtrl.deleteItem);
  
  //Put route for update
  router.put('/:id', stuffCtrl.modifyItem);

module.exports = router;