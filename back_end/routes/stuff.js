const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
//const Item = require('../models/item');


const stuffCtrl = require('../controllers/stuff');

// POST route
router.post('/',auth,  stuffCtrl.createItem);

//Get route for item ,Edit and update
  router.get('/:id',auth,  stuffCtrl.getOneItem);
  
  // GET route find
  router.get('/', auth, stuffCtrl.getAllItem);

  //Get route for delete
  router.delete('/:id', auth, stuffCtrl.deleteItem);
  
  //Put route for update
  router.put('/:id', auth, stuffCtrl.modifyItem);

module.exports = router;