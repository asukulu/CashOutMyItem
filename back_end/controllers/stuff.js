const Item = require('../models/item');
const fs = require('fs');

exports.createItem = (req, res, next) => {
  let imageUrl;

  // Check if an image file was uploaded
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imageUrl = url + '/images/' + req.file.filename;
  } else if (req.body.imageUrl) {
    // Use the provided image URL in the request body
    imageUrl = req.body.imageUrl;
  } else {
    return res.status(400).json({ error: 'No image provided' });
  }

  // If req.body.item is a JSON string, parse it
  if (typeof req.body.item === 'string') {
    try {
      req.body.item = JSON.parse(req.body.item);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
  }

  // Create the new item
  const item = new Item({
    title: req.body.item.title,
    description: req.body.item.description,
    imageUrl: imageUrl,  // Use the determined imageUrl
    price: req.body.item.price,
    userId: req.body.item.userId,
  });

  // Save the item to the database
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
};


exports.getOneItem = (req, res, next) => {
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
};

exports.modifyItem = (req, res, next) => {
  let item = new Item({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.item = JSON.parse(req.body.getAllItem);
    item = {
      _id: req.params.id,
      title: req.body.item.title,
      description: req.body.item.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.item.price,
      userId: req.body.item.userId
    };
  } else {
    item = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    };
  }
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
};

exports.deleteItem = (req, res, next) => {
  Item.findOne({_id: req.params.id}).then(
    (item) => {
      const filename = item.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
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
    }
  );
};

exports.getAllItem = (req, res, next) => {
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
};
