const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff');

const router = express.Router();

// POST route to create a new item
router.post('/', auth, multer, stuffCtrl.createItem);
// In your routes file


// GET route to retrieve a single item by ID
router.get('/:id', auth, stuffCtrl.getOneItem);

// GET route to retrieve all items
router.get('/', auth, stuffCtrl.getAllItem);

// DELETE route to delete an item by ID
router.delete('/:id', auth, stuffCtrl.deleteItem);

// PUT route to update an item by ID
router.put('/:id', auth, stuffCtrl.modifyItem);

module.exports = router;  // Corrected the typo here
