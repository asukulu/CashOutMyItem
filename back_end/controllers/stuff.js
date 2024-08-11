const Item = require('../models/item');

exports.createItem = (req, res, next) => {
  //const url = req.protocol + '://' + req.get('host');

  let imageUrl;

  // Check if an image file was uploaded
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imageUrl = url + '/images/' + req.file.filename;
  } else {
    // Use the provided image URL in the request body
    imageUrl = req.body.imageUrl;
  }

// Create the new item
const item = new Item({
  title: req.body.title,
  description: req.body.description,
  imageUrl: imageUrl,  // This now handles both cases
  imageUrl: url + '/images/' + req.file.filename,
  price: req.body.price,
  userId: req.body.userId,
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
  // Handling the update, ensuring that req.body has the correct structure
  const item = {
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  };

  Item.updateOne({ _id: req.params.id }, item).then(
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
  Item.findOne({ _id: req.params.id }).then(  // Corrected `item.findOne` to `Item.findOne`
    (item) => {
      if (!item) {
        return res.status(404).json({
          error: new Error('Objet non trouvé !')
        });
      }
      if (item.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('Requête non autorisée !')
        });
      }
      Item.deleteOne({ _id: req.params.id }).then(
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
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
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
